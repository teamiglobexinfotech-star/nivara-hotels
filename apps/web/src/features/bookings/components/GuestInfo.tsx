import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { TextareaField } from "@/components/shared/TextareaField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SearchCustomer } from "@/features/customers/customer.types";

import type { Guest } from "../booking.types";
import { type GuestInput, guestSchema } from "../schema/guest.schema";

interface GuestInfoProps {
  value?: Partial<Guest>;
  customer?: SearchCustomer;
  onChange?: (value: Guest) => void;
}

export function GuestInfo({ onChange, value, customer }: GuestInfoProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      primaryGuest: {
        fullName: value?.primaryGuest?.fullName ?? customer?.fullName ?? "",
        age: value?.primaryGuest?.age ?? 0,
        gender: value?.primaryGuest?.gender ?? "male",
      },
      totalGuests: value?.totalGuests ?? 1,
      specialRequest: value?.specialRequest ?? "",
    },
  });

  const handleSubmitForm = (data: GuestInput) => {
    onChange?.(data);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Guest Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              type="text"
              label="Primary guest"
              placeholder="e.g. Anil Kumar"
              {...register("primaryGuest.fullName")}
              error={errors.primaryGuest?.fullName?.message}
            />
            <InputField
              type="number"
              label="Age"
              placeholder="e.g. 25"
              {...register("primaryGuest.age")}
              error={errors.primaryGuest?.age?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              name="primaryGuest.gender"
              control={control}
              label="Gender"
              options={[
                { name: "Male", id: "male" },
                { name: "Female", id: "female" },
                { name: "Other", id: "other" },
              ]}
              error={errors.primaryGuest?.gender?.message}
            />
            <InputField
              type="number"
              label="Number of guests"
              placeholder="e.g. 2"
              min={1}
              max={20}
              {...register("totalGuests")}
              error={errors.totalGuests?.message}
            />
          </div>
          <TextareaField
            label="Special request"
            placeholder="e.g. Dietary needs, arrival time, room setup, or accessibility preferences"
            {...register("specialRequest")}
            error={errors.specialRequest?.message}
          />
          <div className="mt-4 flex w-full justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
