import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="search"
        placeholder="Search properties..."
        className="pl-10 w-full bg-white"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};