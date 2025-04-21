import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal, Search } from "lucide-react";

interface AllListingsHeaderProps {
  onSearch: (query: string) => void;
  onRentRangeChange: (min: number, max: number) => void;
  onBedroomsRangeChange: (min: number, max: number) => void;
  onSortChange: (sort: string) => void;
  minRent: number;
  maxRent:number;
  minBedrooms:number;
  maxBedrooms:number;
}

const AllListingsHeader: React.FC<AllListingsHeaderProps> = ({
  onSearch,
  onRentRangeChange,
  onBedroomsRangeChange,
  onSortChange,
  minRent,
  maxRent,
  minBedrooms,
  maxBedrooms
}) => {
  const [rentRange, setRentRange] = useState<[number, number]>([minRent, maxRent]);
  const [bedroomsRange, setBedroomsRange] = useState<[number, number]>([minBedrooms, maxBedrooms]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-2 mb-5 bg-white justify-between items-center ">
      <div className="w-full flex justify-center lg:justify-normal items-center gap-2">
        <Input
          placeholder="Search by location..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full sm:w-96"
        />
          <Search className="h-5 w-5 text-gray-500" />
      </div>

      <div className="w-full flex flex-col justify-center lg:justify-end md:flex-row gap-5 ">
        <div className="">
          <label className="text-sm font-medium">
            Rent Range (${rentRange[0]} - ${rentRange[1]})
          </label>
          <Slider
            defaultValue={rentRange}
            min={minRent}
            max={maxRent}
            step={500}
            onValueChange={(value) => {
              setRentRange(value as [number, number]);
              onRentRangeChange(value[0], value[1]);
            }}
            className="w-full mt-1"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Bedrooms Range ({bedroomsRange[0]} - {bedroomsRange[1]})
          </label>
          <Slider
            defaultValue={bedroomsRange}
            min={minBedrooms}
            max={maxBedrooms}
            step={1}
            onValueChange={(value) => {
              setBedroomsRange(value as [number, number]);
              onBedroomsRangeChange(value[0], value[1]);
            }}
            className="w-full mt-1"
          />
        </div>

        <div className="flex items-center gap-4 justify-end md:justify-normal">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onSortChange("price_asc")}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange("price_desc")}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange("bedrooms_asc")}>
                Bedrooms: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange("bedrooms_desc")}>
                Bedrooms: High to Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AllListingsHeader;