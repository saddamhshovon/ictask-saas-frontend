"use client";
import { post } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleRegistration(event) {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const passwordConfirmation =
      event.target.password_confirmation.value.trim();

    try {
      const loginResponse = await post("register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
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
      <div class="h-screen font-Montserrat relative">
        <div class="bg-[#7DA814] h-1/2"></div>
        <div class="bg-[#your-second-color] h-1/2 absolute top-1/2 w-full transform -translate-y-1/2">
          <div class="flex items-center justify-center h-full">
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
                  <h1 className="text-[45px] font-[500] leading-tight mt-3">
                    Sign up
                  </h1>
                </div>
              </div>
              <form className="mt-3" onSubmit={handleRegistration}>
                <div className="flex flex-col mb-[12px]">
                  <label htmlFor="name" className="text-[16px] mb-1">
                    Enter your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    className="border border-[#ADADAD] px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col mb-[12px]">
                  <label htmlFor="email" className="text-[16px] mb-1">
                    Enter your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="you@email.com"
                    className="border border-[#ADADAD] px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col mb-[12px]">
                  <label htmlFor="password" className="text-[16px] mb-1">
                    Enter password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="border border-[#ADADAD] px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password_confirmation"
                    className="text-[16px] mb-1"
                  >
                    Enter confirm password
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="password confirmation"
                    className="border border-[#ADADAD] px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
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
                  className="w-full cursor-pointer text-white font-semibold text-xl mt-[20px] py-2 bg-[#7DA814] transition-transform active:scale-95"
                >
                  Register
                </button>
              </form>
              <div className="flex justify-between mt-3">
                <p className="">Have an account? </p>
                <div className="font-bold text-blue-700">
                  <Link href={"/login"}>Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
