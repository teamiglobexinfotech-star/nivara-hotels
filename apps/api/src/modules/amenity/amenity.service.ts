import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { CreateAmenityDto } from './dtos/create-amenity.dto';
import {
  AmenityListItemResponse,
  CreateAmenityResponse,
  UpdateAmenityResponse,
} from './amenity.types';
import { AMENITY_ERROR_MSG } from './amenity.constants';
import { UpdateAmenityDto } from './dtos/update-amenity.dto';

@Injectable()
export class AmenityService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateAmenityDto): Promise<CreateAmenityResponse> {
    const existingAmenity = await this.prismaService.amenity.findUnique({
      where: { name: dto.name },
      select: { id: true },
    });

    if (existingAmenity) {
      throw new ConflictException(AMENITY_ERROR_MSG.CONFLICT_NAME);
    }

    return this.prismaService.amenity.create({
      data: {
        name: dto.name,
        description: dto.description,
        icon: dto.icon,
        status: dto.status,
      },
      select: {
        id: true,
        name: true,
        icon: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async getAll(): Promise<AmenityListItemResponse[]> {
    return this.prismaService.amenity.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(
    id: string,
    dto: UpdateAmenityDto,
  ): Promise<UpdateAmenityResponse> {
    const amenity = await this.prismaService.amenity.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });

    if (!amenity) {
      throw new NotFoundException(AMENITY_ERROR_MSG.NOT_FOUND);
    }

    if (dto.name && dto.name !== amenity.name) {
      const existingAmenity = await this.prismaService.amenity.findUnique({
        where: { name: dto.name },
        select: { id: true },
      });

      if (existingAmenity) {
        throw new ConflictException(AMENITY_ERROR_MSG.CONFLICT_NAME);
      }
    }

    return this.prismaService.amenity.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        status: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const amenity = await this.prismaService.amenity.findUnique({
      where: { id },
      select: {
        id: true,
        _count: {
          select: {
            roomTypeAmenities: true,
          },
        },
      },
    });

    if (!amenity) {
      throw new NotFoundException(AMENITY_ERROR_MSG.NOT_FOUND);
    }

    if (amenity._count.roomTypeAmenities > 0) {
      throw new ConflictException(AMENITY_ERROR_MSG.IN_USE);
    }

    await this.prismaService.amenity.delete({
      where: { id },
    });
  }
}
