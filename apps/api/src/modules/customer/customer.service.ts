import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { hashPassword } from '../../common/helpers';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import {
  CreateCustomerResponse,
  CustomerDetailsResponse,
  CustomerListItem,
} from './customer.types';
import { ListResponse, UserRole, UserStatus } from '../../types';
import { GetCustomersDto } from './dtos/get-customers.dto';
import { CUSTOMER_ERROR_MSG } from './customer.constants';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCustomerDto): Promise<CreateCustomerResponse> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException(CUSTOMER_ERROR_MSG.CONFLICT_EMAIL);
    }

    const passwordHash = await hashPassword('secure1234');

    const user = await this.prismaService.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        profileImage: '',
        role: UserRole.CUSTOMER,
        status: UserStatus.ACTIVE,
        customerProfile: {
          create: {
            idProofImage: '',
            idProofNumber: dto.idProofNumber,
            address: dto.address,
            signature: '',
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        customerProfile: {
          select: {
            id: true,
            idProofNumber: true,
            address: true,
          },
        },
      },
    });

    return user;
  }

  async getCustomers(
    query: GetCustomersDto,
  ): Promise<ListResponse<CustomerListItem>> {
    const { search, status, page, limit } = query;
    const skip = (page - 1) * limit;

    const where = {
      role: UserRole.CUSTOMER,
      ...(status && { status }),
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
          status: true,
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
      items: customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCustomerById(id: string): Promise<CustomerDetailsResponse> {
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
        role: true,
        status: true,
        customerProfile: {
          select: {
            id: true,
            idProofImage: true,
            idProofNumber: true,
            address: true,
            signature: true,
          },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }

    return customer;
  }
}
