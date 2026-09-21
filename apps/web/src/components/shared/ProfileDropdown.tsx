import { Link } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/getInitials";

export const ProfileDropdown = () => {
  const { user } = useAuth();
  const { isLoading, logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Avatar>
            <AvatarFallback className={"bg-primary text-background"}>
              {getInitials(user?.fullName!)}
            </AvatarFallback>
          </Avatar>
        }
      />
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="text-xs">
                {getInitials(user?.fullName!)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-popover-foreground">{user?.fullName}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/profile" className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/notification" className="w-full">
              Notification
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={handleLogout}
            className={"cursor-pointer"}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
