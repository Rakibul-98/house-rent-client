"use client";

import ReCAPTCHA from "react-google-recaptcha";
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
import Link from "next/link";
import { loginValidationSchema } from "./loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { IdCard, KeyRound, MapPinHouse } from "lucide-react";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const router = useRouter();
  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const {
    formState: { isSubmitting },
  } = form;

  const {setIsLoading} = useUser();

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        setReCaptchaStatus(false);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/user-profile");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className=" rounded-xl flex-grow max-w-xs w-[95%] p-5 shadow-2xl">
      <div className="flex items-center gap-2 mb-5">
        <MapPinHouse />
        <div>
          <h1 className="text-xl ">Welcome back! <span className="italic text-blue-600 font-semibold">Login</span> Here</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel><IdCard/> User ID</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel><KeyRound/> Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-3">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
              onChange={handleReCaptcha}
            />
          </div>

          <Button
            disabled={reCaptchaStatus ? false : true}
            type="submit"
            className="mt-5 w-full cursor-pointer"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account? 
        <Link href="/register" className=" ms-1 underline text-blue-600 font-semibold italic hover:no-underline">
          Register Now
        </Link>
      </p>
    </div>
  );
}
