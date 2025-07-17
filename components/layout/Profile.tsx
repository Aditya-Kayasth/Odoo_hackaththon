import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  CircleUser,
  LogOut,
  Pencil,
  Settings,
  User,
  User2Icon,
  UserCircle,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FaRegBookmark } from "react-icons/fa";

const Profile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Avatar>
          <AvatarImage src=""/>
          <AvatarFallback className=" align-center border-gray-300 dark:border-gray-700">
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <UserCircle size={20} />
            Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Pencil size={18} />
            Create Post
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Settings size={20} />
            Settings
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <FaRegBookmark size={18} />
            Book Marks
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <LogOut size={20} />
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
