import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchInput = ({ mobile }: { mobile?: boolean }) => {
  return (
    <div
      className={
        mobile
          ? "relative w-9/12 max-w-[140px] mx-auto"
          : "relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-sm mx-auto"
      }
    >
      <Input
        placeholder="Search..."
        className={mobile ? "pr-8 h-8 text-xs" : "pr-10"}
      />
      <div className="absolute top-0 right-0 flex items-center h-full pr-2 pointer-events-none">
        <Search
          className={mobile ? "w-4 h-4 text-gray-500" : "w-4 h-4 text-gray-500"}
        />
      </div>
    </div>
  );
};

export default SearchInput;
