"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Edit, Edit3, Lock, Save, X } from "lucide-react";
import Image from "next/image";
import { updatePassword, updateProfile } from "@/services/Profile";
import { toast } from "sonner";
import { userType } from "@/types/types";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import profileBannerImg from "../../assets/svg/profileBannerImg.svg";
import { useUser } from "@/context/UserContext";

export default function UserProfile({ user }: { user: userType }) {
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [isEditing, setIsEditing] = useState({
    user_name: false,
    profile_image: false,
    phone_num: false,
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.profile_image || "https://i.ibb.co.com/jkpLFGBq/dummy-user.png"
  );

  const form = useForm({
    defaultValues: {
      user_name: user?.user_name || "",
      profile_image: user?.profile_image || "",
      phone_num: user?.phone_num || "",
    },
  });

  const passwordForm = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const updatedData = {
      ...data,
      profile_image: profileImage
    };

    const res = await updateProfile(updatedData);
    if (res?.success) {
      toast.success(res?.message);
      setIsEditing({
        user_name: false,
        profile_image: false,
        phone_num: false,
      });
      form.reset();
      passwordForm.reset();
    } else {
      toast.error(res?.message);
    }
    setIsEditing({ user_name: false, profile_image: false, phone_num: false });
  };

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmitPassword: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await updatePassword(data);
      if (res?.success) {
        toast.success(res?.message);
        setIsChangingPassword(false);
        passwordForm.reset();
        router.push("/login");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsChangingPassword(false);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "houseRent");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/drplng4db/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadToCloudinary(file);
        setProfileImage(imageUrl);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Image upload failed. Please try again.");
      }
    }
    setIsEditing((prev) => ({ ...prev, profile_image: true }));
  };

  return (
    <div className="my-10 min-h-[80vh] flex items-center justify-center gap-10">
      <Image
        className="hidden lg:block"
        src={profileBannerImg}
        alt="House Rent Logo"
        width={500}
        height={500}
      />
      <div className="max-w-sm w-full p-5 shadow-2xl rounded-lg">
        <div className="relative mx-auto w-30 h-30">
          <Image
            src={profileImage}
            height={100}
            width={100}
            alt="User Avatar"
            className="w-full h-full rounded-full border-4 border-teal-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-image-upload"
          />

          {/* <Input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          /> */}
          <label
            htmlFor="profile-image-upload"
            className="absolute bottom-1 right-1 bg-teal-600 text-white p-1 rounded-full cursor-pointer"
          >
            <Edit size={16} />
          </label>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="font-bold">Name:</FormLabel>
                  <div className="flex items-center justify-between gap-2 w-full">
                    {isEditing.user_name ? (
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter user name"
                        />
                      </FormControl>
                    ) : (
                      <span className="w-full">{user.user_name}</span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditing((prev) => ({
                          ...prev,
                          user_name: !prev.user_name,
                        }))
                      }
                    >
                      {isEditing.user_name ? <X /> : <Edit3 />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_num"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="font-bold">Phone:</FormLabel>
                  <div className="flex items-center justify-between gap-2 w-full">
                    {isEditing.phone_num ? (
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter phone number"
                        />
                      </FormControl>
                    ) : (
                      <span className="w-full">{user.phone_num}</span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditing((prev) => ({
                          ...prev,
                          phone_num: !prev.phone_num,
                        }))
                      }
                    >
                      {isEditing.phone_num ? <X /> : <Edit3 />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-left space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p className="capitalize">
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong className="me-2">Status:</strong>{" "}
                {user?.isBlocked ? (
                  <Badge className="outline-red-500 text-white outline bg-red-500">
                    Blocked
                  </Badge>
                ) : (
                  <Badge className="outline-green-500 text-white outline bg-green-500">
                    Active
                  </Badge>
                )}
              </p>
            </div>

            {(isEditing.user_name ||
              isEditing.profile_image ||
              isEditing.phone_num) && (
              <Button type="submit" className="w-full mt-4">
                <Save className="mr-2" />
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            )}
          </form>
        </Form>

        <div className="mt-6">
          <Button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="w-full"
          >
            {isChangingPassword ? <X /> : <Lock />}
            {isChangingPassword ? "Close Change" : "Change Password"}
          </Button>

          {isChangingPassword && (
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                className="mt-4 space-y-4"
              >
                <FormField
                  control={passwordForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Old Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="New Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  <Save className="mr-2" />
                  {isSubmitting ? "Updating..." : "Submit"}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
