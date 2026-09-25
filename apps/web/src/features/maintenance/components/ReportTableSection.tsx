import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

import { DataTable } from "@/components/shared/DataTable";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";
import type { Column } from "@/types/shared.types";

import { useDeleteReport } from "../hooks/useDeleteReport";
import { useReportList } from "../hooks/useReportList";
import type { ReportList } from "../maintenance.types";

import { AssignTaskModal } from "./AssignTaskModal";
import { UpdateReportModal } from "./UpdateReportModal";
import { ViewReportSheet } from "./ViewReportSheet";

const reportColumns: Column<ReportList>[] = [
  {
    header: "Report",
    key: "reportReference",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p className="font-medium">#{r.reportReference}</p>
        <span className="text-sm text-muted-foreground">
          Room {r.room.roomNumber}
        </span>
      </div>
    ),
  },
  {
    header: "Category",
    key: "category",
    render: (r) => (
      <span className="capitalize">
        {r.category.toLowerCase().replace(/_/g, " ")}
      </span>
    ),
  },
  {
    header: "Priority",
    key: "priority",
    render: (r) => (
      <Badge
        variant={
          r.priority === "URGENT"
            ? "destructive"
            : r.priority === "HIGH"
              ? "destructive"
              : r.priority === "MEDIUM"
                ? "secondary"
                : "outline"
        }
      >
        {r.priority}
      </Badge>
    ),
  },
  {
    header: "Reported By",
    key: "reporter",
    render: (r) => (
      <div>
        <p className="font-medium">{r.reporter.fullName}</p>
      </div>
    ),
  },
  {
    header: "Status",
    key: "status",
    render: (r) => (
      <Badge
        variant={
          r.status === "RESOLVED" || r.status === "COMPLETED"
            ? "secondary"
            : r.status === "IN_PROGRESS"
              ? "default"
              : r.status === "ASSIGNED"
                ? "outline"
                : "secondary"
        }
      >
        {r.status.replace(/_/g, " ")}
      </Badge>
    ),
  },
  {
    header: "Reported",
    key: "reportedAt",
    render: (r) => (
      <span>
        {r.reportedAt
          ? new Date(r.reportedAt).toLocaleDateString("en-IN")
          : "-"}
      </span>
    ),
  },
  {
    header: "Action",
    key: "action",
    render: (r) => <ReportActionDropdownMenu report={r} />,
  },
];

export function ReportTableSection() {
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const query = useDebounce(search, 400);
  const { items, pagination } = useReportList({ search: query, page });

  return (
    <DataTable
      response={{ items, pagination }}
      columns={reportColumns}
      searchKey="name"
      searchPlaceholder="Search..."
      enablePagination={true}
      onPageChange={(page) => setPage(page)}
      onSearchChange={(query) => setSearch(query)}
    />
  );
}

function ReportActionDropdownMenu({ report }: { report: ReportList }) {
  const [isViewModal, setIsViewModal] = useState(false);
  const [isStatusModal, setIsStatusModal] = useState(false);
  const [isAssignTaskModal, setIsAssignTaskModal] = useState(false);

  const { user } = useAuth();
  const { handleDelete, isDeleting } = useDeleteReport();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton size={"sm"} variant={"ghost"}>
            <EllipsisVertical />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setIsViewModal(true)}
            disabled={isDeleting}
          >
            View
          </DropdownMenuItem>

          {user?.role ==
            (ROLES.ADMIN || ROLES.MANAGER || ROLES.HOUSEKEEPER) && (
            <DropdownMenuItem
              onClick={() => setIsStatusModal(true)}
              disabled={isDeleting}
            >
              Change Status
            </DropdownMenuItem>
          )}

          {user?.role == (ROLES.ADMIN || ROLES.MANAGER) && (
            <DropdownMenuItem
              onClick={() => setIsAssignTaskModal(true)}
              disabled={isDeleting}
            >
              Assign Task
            </DropdownMenuItem>
          )}

          {user?.role == ROLES.ADMIN && (
            <DropdownMenuItem
              className={"text-destructive"}
              onClick={() => handleDelete(report.id)}
              disabled={isDeleting}
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isStatusModal && (
        <UpdateReportModal
          open={isStatusModal}
          onOpenChange={setIsStatusModal}
          report={report}
        />
      )}

      {isAssignTaskModal && (
        <AssignTaskModal
          open={isAssignTaskModal}
          onOpenChange={setIsAssignTaskModal}
          report={report}
        />
      )}

      {isViewModal && (
        <ViewReportSheet
          isOpen={isViewModal}
          onOpenChange={setIsViewModal}
          id={report.id}
        />
      )}
    </>
  );
}
