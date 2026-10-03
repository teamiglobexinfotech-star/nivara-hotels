import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../../db/prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { PrismaService } from '../../db/prisma/prisma.service';

import { GetStaffDto } from './dtos/get-staff.dto';
import { StaffService } from './staff.service';

describe('StaffService', () => {
  let service: StaffService;
  const prismaService = {
    user: { findMany: jest.fn(), findUnique: jest.fn(), count: jest.fn() },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<StaffService>(StaffService);
  });

  it('returns staff items with ISO dates and an empty last-login value when absent', async () => {
    const createdAt = new Date('2026-09-30T12:00:00.000Z');
    prismaService.$transaction.mockResolvedValue([
      [
        {
          id: 'staff-001',
          fullName: 'Rajesh Kumar',
          email: 'rajesh@example.com',
          phone: '1234567890',
          isActive: true,
          createdAt,
          lastLoginAt: null,
          staff: { category: 'RECEPTIONIST' },
        },
      ],
      1,
    ]);

    await expect(service.getAll({ page: 1, limit: 10 })).resolves.toEqual({
      data: [
        {
          id: 'staff-001',
          fullName: 'Rajesh Kumar',
          email: 'rajesh@example.com',
          phone: '1234567890',
          category: 'RECEPTIONIST',
          isActive: true,
          createdAt: createdAt.toISOString(),
          lastLogin: '',
        },
      ],
      meta: { page: 1, limit: 10, total: 1, totalPages: 1 },
    });
  });

  it('returns a flattened staff detail with serialized dates', async () => {
    const createdAt = new Date('2026-09-30T12:00:00.000Z');
    const lastLoginAt = new Date('2026-10-01T08:30:00.000Z');
    prismaService.user.findUnique.mockResolvedValue({
      id: 'staff-001',
      fullName: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '1234567890',
      isActive: true,
      createdAt,
      lastLoginAt,
      staff: {
        category: 'RECEPTIONIST',
        address: '12 Main Street',
        fatherName: 'Mohan Kumar',
        motherName: 'Sita Kumar',
        idProofNumber: 'ID-12345',
        qualification: 'Hotel Management',
        experience: '5 years',
        emergencyContact: '9876543210',
      },
    });

    await expect(service.getById('staff-001')).resolves.toEqual({
      id: 'staff-001',
      fullName: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '1234567890',
      category: 'RECEPTIONIST',
      isActive: true,
      createdAt: createdAt.toISOString(),
      lastLogin: lastLoginAt.toISOString(),
      address: '12 Main Street',
      fatherName: 'Mohan Kumar',
      motherName: 'Sita Kumar',
      idProofNumber: 'ID-12345',
      qualification: 'Hotel Management',
      experience: '5 years',
      emergencyContact: '9876543210',
    });
  });

  it('throws when the staff member does not exist', async () => {
    prismaService.user.findUnique.mockResolvedValue(null);

    await expect(service.getById('missing-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
