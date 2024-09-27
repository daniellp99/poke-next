import { signOut } from "@/auth";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserDropdown({ session }: { session: Session | null }) {
  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-md"
        >
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>
          <span className="font-normal">Trainer </span>
          <span className="capitalize">{session.user?.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            className="h-10"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit" variant="ghost" size="icon" className="w-fit">
              <LogOutIcon className="size-4 mr-2" />
              <span>Log out</span>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
