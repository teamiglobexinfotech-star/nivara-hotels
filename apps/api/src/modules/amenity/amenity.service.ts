import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { CreateAmenityDto } from './dtos/create-amenity.dto';
import {
  AmenityListItemResponse,
  CreateAmenityResponse,
} from './amenity.types';
import { AMENITY_ERROR_MSG } from './amenity.constants';

@Injectable()
export class AmenityService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateAmenityDto): Promise<CreateAmenityResponse> {
    const existingAmenity = await this.prismaService.amenity.findUnique({
      where: { name: dto.name },
      select: { id: true },
    });

    if (existingAmenity) {
      throw new ConflictException(AMENITY_ERROR_MSG.CONFLICT);
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

  async getAmenities(): Promise<AmenityListItemResponse[]> {
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
}
