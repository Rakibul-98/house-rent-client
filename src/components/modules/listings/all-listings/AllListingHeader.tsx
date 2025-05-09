import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface AllListingsHeaderProps {
  onSearch: (query: string) => void;
  onRentRangeChange: (min: number, max: number) => void;
  onBedroomsRangeChange: (min: number, max: number) => void;
  onSortChange: (sort: string) => void;
  minRent: number;
  maxRent: number;
  minBedrooms: number;
  maxBedrooms: number;
}

const AllListingsHeader: React.FC<AllListingsHeaderProps> = ({
  onSearch,
  onRentRangeChange,
  onBedroomsRangeChange,
  onSortChange,
  minRent,
  maxRent,
  minBedrooms,
  maxBedrooms,
}) => {
  const [rentRange, setRentRange] = useState<[number, number]>([
    minRent,
    maxRent,
  ]);
  const [bedroomsRange, setBedroomsRange] = useState<[number, number]>([
    minBedrooms,
    maxBedrooms,
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState<string>("");

  const handleSortChange = (value: string) => {
    setActiveSort(value);
    onSortChange(value);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="font-medium block mb-1">Search by location</label>
        <Input
          placeholder="e.g. Dhaka"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      <div>
        <label className="font-medium block mb-1">
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
        />
      </div>

      <div>
        <label className="font-medium block mb-1">
          Bedrooms ({bedroomsRange[0]} - {bedroomsRange[1]})
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
        />
      </div>

      <div className="space-y-3">
        <div>
          <p className="font-medium mb-1">Price</p>
          <div className="flex gap-2">
            <Button
              variant={activeSort === "price_desc" ? "default" : "outline"}
              className={clsx("flex-1", {
                "border-primary bg-primary text-white hover:bg-primary/90":
                  activeSort === "price_desc",
              })}
              onClick={() => handleSortChange("price_desc")}
            >
              High to Low
            </Button>
            <Button
              variant={activeSort === "price_asc" ? "default" : "outline"}
              className={clsx("flex-1", {
                "border-primary bg-primary text-white hover:bg-primary/90":
                  activeSort === "price_asc",
              })}
              onClick={() => handleSortChange("price_asc")}
            >
              Low to High
            </Button>
          </div>
        </div>

        <div>
          <p className="font-medium mb-1">Bedrooms</p>
          <div className="flex gap-2">
            <Button
              variant={activeSort === "bedrooms_desc" ? "default" : "outline"}
              className={clsx("flex-1", {
                "border-primary bg-primary text-white hover:bg-primary/90":
                  activeSort === "bedrooms_desc",
              })}
              onClick={() => handleSortChange("bedrooms_desc")}
            >
              High to Low
            </Button>
            <Button
              variant={activeSort === "bedrooms_asc" ? "default" : "outline"}
              className={clsx("flex-1", {
                "border-primary bg-primary text-white hover:bg-primary/90":
                  activeSort === "bedrooms_asc",
              })}
              onClick={() => handleSortChange("bedrooms_asc")}
            >
              Low to High
            </Button>
          </div>
        </div>

        <div>
          <p className="font-medium mb-1">Date</p>
          <div className="flex gap-2">
            <Button
              variant={activeSort === "newest" ? "default" : "outline"}
              className={clsx("flex-1", {
                "border-primary bg-primary text-white hover:bg-primary/90":
                  activeSort === "newest",
              })}
              onClick={() => handleSortChange("newest")}
            >
              Newest First
            </Button>
            <Button
              variant={activeSort === "oldest" ? "default" : "outline"}
              className={clsx("flex-1", {
                "border-primary bg-primary text-white hover:bg-primary/90":
                  activeSort === "oldest",
              })}
              onClick={() => handleSortChange("oldest")}
            >
              Oldest First
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllListingsHeader;
