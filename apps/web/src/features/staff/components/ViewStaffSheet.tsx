import { CalendarDays, Mail, Phone, Shield, User } from "lucide-react";

import { ErrorModal } from "@/components/shared/ErrorModal";
import { FullScreenLoader } from "@/components/shared/FullScreenLoader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getInitials } from "@/lib/getInitials";

import { useStaff } from "../hooks/useStaff";

type ViewStaffSheetProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
};

export function ViewStaffSheet({
  isOpen,
  onOpenChange,
  id,
}: ViewStaffSheetProps) {
  const { staffDetails, isLoading, isError, refetch } = useStaff(id);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return (
      <ErrorModal
        open={!isError}
        onOpenChange={onOpenChange}
        onRefetch={refetch}
      />
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold">
            {staffDetails?.fullName}
          </SheetTitle>
          <SheetDescription>
            View staff profile, employment information, and account details.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-lg font-semibold">
                {staffDetails?.fullName && getInitials(staffDetails.fullName)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-lg font-semibold">
                {staffDetails?.fullName}
              </h2>
              <div className="mt-1 flex gap-2">
                <Badge variant="outline">{staffDetails?.role}</Badge>
                <Badge
                  variant={staffDetails?.isActive ? "default" : "secondary"}
                >
                  {staffDetails?.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Basic Information */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Basic Information
            </h3>

            <DetailItem
              icon={<Mail className="h-4 w-4" />}
              label="Email Address"
              value={staffDetails?.email}
            />
            <DetailItem
              icon={<Phone className="h-4 w-4" />}
              label="Phone Number"
              value={staffDetails?.phone}
            />
            <DetailItem
              icon={<Shield className="h-4 w-4" />}
              label="Role"
              value={staffDetails?.role}
            />
          </section>

          {staffDetails && (
            <>
              <Separator />

              {/* Personal Information */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  Personal Information
                </h3>

                <DetailItem
                  icon={<User className="h-4 w-4" />}
                  label="Father's Name"
                  value={staffDetails?.staff?.fatherName}
                />
                <DetailItem
                  icon={<User className="h-4 w-4" />}
                  label="Mother's Name"
                  value={staffDetails?.staff?.motherName}
                />
                <DetailItem
                  label="ID Proof Number"
                  value={staffDetails?.staff?.idProofNumber}
                />
                <DetailItem
                  label="Emergency Contact"
                  value={staffDetails?.staff?.emergencyContact}
                />
                <DetailItem
                  label="Address"
                  value={staffDetails?.staff?.address}
                />
              </section>

              <Separator />

              {/* Employment */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  Employment Details
                </h3>

                <DetailItem
                  label="Staff Category"
                  value={staffDetails?.staff?.category}
                />
                <DetailItem
                  label="Qualification"
                  value={staffDetails?.staff?.qualification}
                />
                <DetailItem
                  label="Experience"
                  value={staffDetails?.staff?.experience}
                />
              </section>

              <Separator />

              {/* Documents */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  Documents
                </h3>

                <DetailItem
                  label="ID Proof Image"
                  value={
                    staffDetails?.staff?.idProofImage
                      ? "Available"
                      : "Not uploaded"
                  }
                />
                <DetailItem
                  label="Signature"
                  value={
                    staffDetails?.staff?.signatureImage
                      ? "Available"
                      : "Not uploaded"
                  }
                />
              </section>
            </>
          )}

          <Separator />

          {/* Account */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Account Information
            </h3>

            <DetailItem
              icon={<CalendarDays className="h-4 w-4" />}
              label="Last Login"
              value={
                staffDetails?.lastLoginAt
                  ? new Date(staffDetails.lastLoginAt).toLocaleString()
                  : "Never"
              }
            />
            <DetailItem
              label="Joined On"
              value={
                staffDetails?.createdAt
                  ? new Date(staffDetails.createdAt).toLocaleDateString()
                  : "-"
              }
            />
            <DetailItem
              label="Last Updated"
              value={
                staffDetails?.updatedAt
                  ? new Date(staffDetails?.updatedAt).toLocaleDateString()
                  : "-"
              }
            />
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon && <div className="mt-1 text-muted-foreground">{icon}</div>}

      <dl className="flex-1">
        <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </dt>
        <dd className="mt-1 text-sm text-foreground">{value || "-"}</dd>
      </dl>
    </div>
  );
}
