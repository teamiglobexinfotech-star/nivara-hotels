import { Button } from "@base-ui/react";
import { CheckIcon, LoaderCircleIcon, MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { bookingSteps } from "@/features/bookings/booking.constants";
import type { CustomerItem } from "@/features/bookings/booking.types";
import { GuestInfo } from "@/features/bookings/components/GuestInfo";
import { PaymentInfo } from "@/features/bookings/components/PaymentInfo";
import { ReviewAndConfirm } from "@/features/bookings/components/ReviewAndConfirm";
import { SearchCustomer } from "@/features/bookings/components/SearchCustomer";
import { StayAndRoom } from "@/features/bookings/components/StayAndRoom";

const StepsComponents: { [key: string]: React.ReactNode } = {
  Customer: <SearchCustomer />,
  "Stay & Room": <StayAndRoom />,
  Guest: <GuestInfo />,
  Payment: <PaymentInfo />,
  Review: <ReviewAndConfirm />,
};

export function NewBookingPage() {
  return (
    <>
      <SectionHeader
        title="Create Booking"
        description="Create a new reservation and complete the booking details."
      />
      <Stepper
        defaultValue={1}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
          loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
        }}
        className="w-full space-y-8"
      >
        <StepperNav>
          {bookingSteps.map((step, index) => {
            return (
              <StepperItem
                key={index}
                step={index + 1}
                className="relative mx-auto w-fit flex-1 items-start"
              >
                <StepperTrigger className="flex flex-col">
                  <StepperIndicator>{index + 1}</StepperIndicator>
                  <StepperTitle>{step.title}</StepperTitle>
                </StepperTrigger>

                {bookingSteps.length > index + 1 && (
                  <StepperSeparator className="absolute inset-x-0 top-2.5 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary" />
                )}
              </StepperItem>
            );
          })}
        </StepperNav>

        <StepperPanel>
          {bookingSteps.map((step, index) => (
            <StepperContent key={index} value={index + 1}>
              {StepsComponents[step.title]}
            </StepperContent>
          ))}
          <div className="flex w-full items-center justify-between pt-4">
            <Button>
              <MoveLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <Button>
              <span>Next</span>
              <MoveRight className="h-4 w-4" />
            </Button>
          </div>
        </StepperPanel>
      </Stepper>
    </>
  );
}
