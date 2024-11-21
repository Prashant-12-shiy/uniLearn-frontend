"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React from "react";
import { useAdminLogin } from "@/services/api/authApi";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const { mutate: LoginMutation } = useAdminLogin();

  const { register, handleSubmit } = useForm();

  const router = useRouter();
  const handleLogin = (data) => {
    LoginMutation(data, {
      onSuccess: () => {
        router.push("/admin");
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <h1 className="text-3xl text-center my-7 dark:text-white text-black">
          Admin Login
        </h1>

        <div className="max-w-[80%] m-auto md:max-w-[50vw] space-y-5 dark:text-white text-black">
          <div>
            <label>Email</label>
            <Input
              placeholder="Enter your Email"
              type="email"
              {...register("email")}
            />
          </div>

          <div>
            <label>Password</label>
            <Input
              placeholder="Enter your Password"
              type="password"
              {...register("password")}
            />
          </div>

          <Button type="submit" className="text-center mt-5 w-24">
            Login
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Page;
