
import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterBarProps {
  onFilterChange: (filters: {
    search?: string;
    bedrooms?: string;
    bathrooms?: string;
    featured?: boolean;
    sortBy?: string;
  }) => void;
}

export const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  return (
    <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search properties..."
          className="pl-9"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-2 md:flex gap-2">
        <Select onValueChange={(value) => onFilterChange({ bedrooms: value })}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onFilterChange({ bathrooms: value })}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Bathrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onFilterChange({ sortBy: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
