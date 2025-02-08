
import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface FilterBarProps {
  onFilterChange: (filters: {
    search?: string;
    bedrooms?: string;
    bathrooms?: string;
    featured?: boolean;
    sortBy?: string;
    propertyType?: string;
    propertyStatus?: string;
    priceRange?: number[];
  }) => void;
}

export const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [priceRange, setPriceRange] = React.useState([500, 5000]);

  return (
    <div className="w-full">
      <div className="relative w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select onValueChange={(value) => onFilterChange({ propertyType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Type of Property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Location"
            className="w-full"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />

          <Select onValueChange={(value) => onFilterChange({ propertyStatus: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Property Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="active">Available Now</SelectItem>
              <SelectItem value="pending">Coming Soon</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <span className="text-sm text-gray-500 block mb-2">Price Range</span>
              <div className="px-2">
                <Slider
                  defaultValue={[500, 5000]}
                  max={10000}
                  min={0}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value);
                    onFilterChange({ priceRange: value });
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">${priceRange[0]}</span>
                <span className="text-xs text-gray-500">${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
            onClick={() => onFilterChange({})} // Reset filters
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
