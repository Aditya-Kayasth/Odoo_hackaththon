"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { UserCircle, Pencil, Settings, LogOut, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FaRegBookmark } from "react-icons/fa";
import { signOut } from "next-auth/react";

const menuButtonClass =
  "flex items-center gap-2 text-sm sm:text-base py-1 w-full text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-200 dark:focus:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-700 rounded-md px-2";

const Profile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src="" />
          <AvatarFallback className="align-center border-gray-300 dark:border-gray-700">
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[150px] w-[70vw] max-w-[220px] sm:max-w-[250px] p-2">
        <DropdownMenuItem asChild>
          <button className={menuButtonClass}>
            <UserCircle size={20} />
            Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className={menuButtonClass}>
            <Pencil size={18} />
            Create Post
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className={menuButtonClass}>
            <Settings size={20} />
            Settings
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className={menuButtonClass}>
            <FaRegBookmark size={18} />
            Book Marks
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button onClick={() => signOut()} className={menuButtonClass}>
            <LogOut size={20} />
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
