import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const BrowseRoomsSchema = z
  .object({
    search: z.string('Search must be a string').trim().max(100).optional(),
    checkIn: z.coerce.date('Invalid check-in date').optional(),
    checkOut: z.coerce.date('Invalid check-out date').optional(),
    guests: z.coerce
      .number('Guests must be a number')
      .int('Guests must be a whole number')
      .min(1, 'Guests must be at least 1')
      .optional(),
    roomType: z.string('Room type must be a string').trim().optional(),
    minPrice: z.coerce
      .number('Minimum price must be a number')
      .int('Minimum price must be a whole number')
      .min(0, 'Minimum price cannot be negative')
      .optional(),
    maxPrice: z.coerce
      .number('Maximum price must be a number')
      .int('Maximum price must be a whole number')
      .min(0, 'Maximum price cannot be negative')
      .optional(),
    amenities: z
      .string('Amenities must be comma-separated names')
      .transform((value) =>
        value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      )
      .optional(),
  })
  .strict()
  .refine((query) => {
    if (query.checkOut !== undefined && query.checkIn !== undefined) {
      return {
        message: 'Check-out must be after check-in',
        path: ['checkOut'],
      };
    }
    return true;
  })
  .refine(
    (query) =>
      query.minPrice === undefined ||
      query.maxPrice === undefined ||
      query.maxPrice >= query.minPrice,
    {
      message: 'Maximum price must be greater than or equal to minimum price',
      path: ['maxPrice'],
    },
  );

export class BrowseRoomsDto extends createZodDto(BrowseRoomsSchema) {}
