import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import type { Payment } from "@/features/payments/payment.types";
import type { Column } from "@/types/shared.types";

import { recentPayments } from "../mock/recentPayment.mock";

const paymentColumns: Column<Payment>[] = [
  {
    header: "Payment Code",
    key: "paymentCode",
  },
  {
    header: "Guest Name",
    key: "guestName",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p>{r.guestName}</p>
      </div>
    ),
  },
  {
    header: "Amount",
    key: "amount",
    render: (r) => <span>₹{r.amount.toLocaleString("en-IN")}</span>,
  },
  {
    header: "Payment Method",
    key: "paymentMethod",
  },
  {
    header: "Paid At",
    key: "paidAt",
    render: (r) => <span>{r.paidAt.toLocaleDateString("en-IN")}</span>,
  },
  {
    header: "Status",
    key: "status",
    render: (r) => (
      <Badge
        variant={
          r.status === "SUCCESS"
            ? "secondary"
            : r.status === "PENDING"
              ? "outline"
              : "destructive"
        }
      >
        {r.status[0] + r.status.slice(1).toLowerCase()}
      </Badge>
    ),
  },
];

export function RecentPaymentsSection() {
  return (
    <DataTable
      response={{ items: recentPayments }}
      columns={paymentColumns}
      enablePagination={false}
    />
  );
}
