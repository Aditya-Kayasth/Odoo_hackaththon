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
        <div className="absolute bg-rose-500 h-4.5 w-4.5 rounded-full text-xs flex items-center justify-center bottom-2 left-2.5 text-center">
          <span className="font-bold">5</span>
        </div>
        <BellIcon size={21} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[90vw] max-w-[350px] sm:max-w-[400px]">
        <div className="flex gap-4 justify-between mx-2">
          <h3 className="font-bold text-base sm:text-lg">Notifications</h3>
          <button className="text-xs sm:text-sm">Read all</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Notifications;
