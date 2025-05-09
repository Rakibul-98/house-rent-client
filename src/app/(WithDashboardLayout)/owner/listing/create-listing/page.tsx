import CreateListingForm from "@/components/modules/listing/create-listing/CreateListingForm";
import listingImg from "../../../../../assets/svg/listing.svg";
import Image from "next/image";

export default function CreateListingPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen gap-5">
      <div className="flex items-center justify-center">
        <CreateListingForm />
      </div>

      <div className="relative hidden xl:block -mt-20">
        <Image
          src={listingImg}
          alt="listing img"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
