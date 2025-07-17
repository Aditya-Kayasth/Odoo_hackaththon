import { Input } from "../ui/input";

import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="relative w-full max-w-1/4 cursor-pointer">
      <Input placeholder="Search..." />
      <div className="absolute top-0 right-0 flex items-center h-full pr-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchInput;
