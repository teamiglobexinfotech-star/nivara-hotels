import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ID } from 'node-appwrite';

import { hashPassword } from '../../common/helpers';
import { uploadFile } from '../../config';
import { PrismaService } from '../../db/prisma/prisma.service';
import { KpiStat, ListResponse, UserRole } from '../../types';

import { CreateCustomerDto } from './dtos/create-customer.dto';
import { GetCustomersDto } from './dtos/get-customers.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { CUSTOMER_ERROR_MSG } from './customer.constants';
import { CustomerDetails, CustomerList } from './customer.types';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(files, dto: CreateCustomerDto): Promise<{ id: string }> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException(CUSTOMER_ERROR_MSG.CONFLICT_EMAIL);
    }

    const passwordHash = await hashPassword('secure1234');

    // const idProof = files.idProof?.[0];
    // const signature = files.signature?.[0];

    // const uploadedIdProof = await uploadFile(
    //   idProof,
    //   `id-proof-${ID.unique()}`,
    // );

    // const uploadedSignature = await uploadFile(
    //   signature,
    //   `signature-${ID.unique()}`,
    // );

    const user = await this.prismaService.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        role: UserRole.CUSTOMER,
        customerProfile: {
          create: {
            idProofNumber: dto.idProofNumber,
            address: dto.address,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return user;
  }

  async getAll(query: GetCustomersDto): Promise<ListResponse<CustomerList[]>> {
    const { search, isActive, page, limit } = query;
    const skip = (page - 1) * limit;

    const where = {
      role: UserRole.CUSTOMER,
      softDeletedAt: null,
      ...(isActive && { isActive }),
      ...(search && {
        OR: [
          {
            fullName: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            phone: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    const [customers, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          lastLoginAt: true,
          customerProfile: {
            select: {
              id: true,
              idProofNumber: true,
              address: true,
            },
          },
        },
      }),
      this.prismaService.user.count({ where }),
    ]);

    return {
      data: customers,
      meta: {
        limit,
        page,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<CustomerDetails> {
    const customer = await this.prismaService.user.findFirst({
      where: {
        id,
        role: UserRole.CUSTOMER,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        customerProfile: {
          select: {
            id: true,
            idProofNumber: true,
            address: true,
          },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }

    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<{ id: string }> {
    const customer = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        customerProfile: {
          select: { id: true },
        },
      },
    });

    if (!customer || customer.role !== UserRole.CUSTOMER) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }

    if (!customer.customerProfile) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.PROFILE_NOT_FOUND);
    }

    if (dto.email) {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          email: dto.email,
          id: { not: id },
        },
        select: { id: true },
      });

      if (existingUser) {
        throw new ConflictException(CUSTOMER_ERROR_MSG.CONFLICT_EMAIL);
      }
    }

    return this.prismaService.$transaction(async (tx) => {
      return await tx.user.update({
        where: { id },
        data: {
          ...(dto.fullName !== undefined && { fullName: dto.fullName }),
          ...(dto.email !== undefined && { email: dto.email }),
          ...(dto.phone !== undefined && { phone: dto.phone }),
          customerProfile: {
            update: {
              ...(dto.idProofNumber !== undefined && {
                idProofNumber: dto.idProofNumber,
              }),
              ...(dto.address !== undefined && {
                address: dto.address,
              }),
            },
          },
        },
        select: {
          id: true,
        },
      });
    });
  }

  async delete(id: string): Promise<{ id: string }> {
    const customer = await this.prismaService.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        isActive: false,
        softDeletedAt: new Date(),
      },
      select: { id: true },
    });
  }

  async getStats(): Promise<KpiStat[]> {
    const [totalCustomer, activeCustomer, inactiveCustomer, newCustomer] =
      await Promise.all([
        this.prismaService.user.count({
          where: {
            role: UserRole.CUSTOMER,
            softDeletedAt: null,
          },
        }),

        this.prismaService.user.count({
          where: {
            role: UserRole.CUSTOMER,
            softDeletedAt: null,
            isActive: true,
          },
        }),

        this.prismaService.user.count({
          where: {
            role: UserRole.CUSTOMER,
            softDeletedAt: null,
            isActive: false,
          },
        }),
        this.prismaService.user.count({
          where: {
            role: UserRole.CUSTOMER,
            softDeletedAt: null,
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
          },
        }),
      ]);

    return [
      {
        id: 'total-customer',
        iconKey: 'Users',
        title: 'Total Customers',
        value: totalCustomer,
        details: 'All registered customers',
      },
      {
        id: 'active-customer',
        iconKey: 'UserCheck',
        title: 'Active Customers',
        value: activeCustomer,
        details: 'Currently active',
      },
      {
        id: 'inactive-customer',
        iconKey: 'UserX',
        title: 'Inactive Customers',
        value: inactiveCustomer,
        details: 'Currently inactive',
      },
      {
        id: 'new-customer',
        iconKey: 'UserPlus',
        title: 'New Customers',
        value: newCustomer,
        details: 'New customers',
      },
    ];
  }
}
