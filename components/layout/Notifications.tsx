import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { BellIcon } from "lucide-react";

function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative cursor-pointer">
        <div className="absolute bg-rose-500 h-5 w-5 rounded-full text-sm flex items-center justify-center bottom-2 left-2.5">
          <span className="font-bold">5</span>
        </div>
        <BellIcon size={21} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[100%] max-w-[400px]">
        <div className="flex gap-4 justify-between mx-2">
          <h3 className="font-bold text-lg">Notifications</h3>
          <button className="">Read all</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Notifications;
