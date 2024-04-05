"use client";
import { post } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    try {
      const loginResponse = await post("login", { email, password });
      // console.log(loginResponse.data.data.token);
      window.localStorage.setItem("token", loginResponse.data.data.token);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }

  return (
    <>
      <div className="h-screen font-Montserrat relative">
        <div className="bg-[#7DA814] h-1/2"></div>
        <div className="bg-[#your-second-color] h-1/2 absolute top-1/2 w-full transform -translate-y-1/2">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white shadow-md w-full p-[44px] rounded-[40px] max-w-[450px]">
              <div className="flex gap-6 justify-between w-full">
                <div className="flex flex-col leading-3">
                  <h4 className="text-[21px] font-[500] text-[#171C20]">
                    Welcome to
                    <span className="text-[#1a2c6b] font-[700]">
                      {" "}
                      SAAS Company{" "}
                    </span>
                  </h4>
                  <h1 className="text-[55px] font-[500] leading-tight mt-3">
                    Sign in
                  </h1>
                </div>
              </div>
              <form className="mt-5" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-[20px]">
                  <label htmlFor="email" className="text-[16px] mb-4">
                    Enter your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@email.com"
                    className="border border-[#ADADAD] px-[20px] py-[19px] rounded-[9px] focus:border-[#4285F4] outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-[16px] mb-4">
                    Enter your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="border border-[#ADADAD] px-[20px] py-[19px] rounded-[9px] focus:border-[#4285F4] outline-none"
                    required
                  />
                </div>
                <div>
                  {error && (
                    <>
                      <p className="text-red-600 mb-1 mt-1">* {error}</p>
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer text-white font-semibold text-2xl mt-[20px] py-4 bg-[#7DA814] transition-transform active:scale-95"
                >
                  Login
                </button>
              </form>
              <div className="flex justify-between mt-3">
                <p className="">Don&apos;t have an account? </p>
                <div className="font-bold text-blue-700">
                  <Link href={"/register"}>Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
