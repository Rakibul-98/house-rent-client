import CreateListingForm from "@/components/modules/listing/create-listing/CreateListingForm";
import listingImg from '../../../../../assets/svg/listing.svg';
import Image from "next/image";

export default function CreateListingPage() {
  return (
    <div className="min-h-screen py-10 flex justify-center gap-10 items-start">
        <CreateListingForm/>
        <Image className="hidden lg:block" src={listingImg} alt="House Rent Logo" width={500} height={600} />
    </div>
  )
}
