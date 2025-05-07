"use client";

import { Button } from "@/components/ui/button";
import ListingCard from "@/components/ui/core/HRCard";
import { Skeleton } from "@/components/ui/skeleton";
import { listingType } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Title from "../Shared/Title";

const TrendingRentsSection = ({ data }: { data: listingType[] }) => {
  const router = useRouter();

  const handleViewDetails = (listingId: string) => {
    router.push(`/listing-details/${listingId}`);
  };

  return (
    <section className="my-10">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-between items-center mb-5">
          <Title title="Trending Rentals" />
          <Link href="/listings" className=" h-fit">
            <Button className="cursor-pointer border hover:bg-transparent hover:text-black">
              View All Listing <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
          {data?.length > 0 ? (
            data
              .slice(0, 4)
              .map((item, i) => (
                <ListingCard
                  key={i}
                  listing={item}
                  onViewDetails={() => handleViewDetails(item._id)}
                />
              ))
          ) : (
            <>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col space-y-4">
                    <Skeleton className="h-36 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-1/4 rounded" />
                      <Skeleton className="h-4 w-1/4 rounded" />
                    </div>
                    <Skeleton className="h-6 w-1/3 rounded" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingRentsSection;
