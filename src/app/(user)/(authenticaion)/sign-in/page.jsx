"use client"

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import UserAuthContext from "@/app/contextProvider";
import { notify } from "@/utils/notify";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { userSignIn } from "@/actions/userSignIn";
import { SignWithGoogleButton } from "@/Components/SignWithGoogleButton";
// import * as firebase from 'firebase'

const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const context = useContext(UserAuthContext)
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setPending] = useState(false);
  // const [isCredentailInvalid, setIsCredentailInvalid] = useState(false)
  // const [user, setUser] = useState(null)


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    try {
      await userSignIn({ email, password })
      router.refresh("/");
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-10">
        <label className="block uppercase text-white" htmlFor="email">
          E-Mail Address
        </label>
        <input
          disabled={isPending}
          required
          type="email"
          id="email"
          className="w-full md:w-[85%] bg-transparent outline-none text-white border-b-2 py-3"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-10">
        <label className="block uppercase text-white" htmlFor="password">
          Password
        </label>
        <input
          disabled={isPending}
          required
          type="password"
          id="password"
          className="w-full md:w-[85%] bg-transparent outline-none text-white border-b-2 py-3"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>

      <div className="flex mb-8 items-end gap-5 text-custom-light-gray justify-center md:justify-start">
        <PrimaryButton disabled={isPending} label="Sign in" className="px-5 text-xl font-medium disabled:bg-primary-light" />
        or
        <Link href="/sign-up" passHref>
          <p className="text-custom-light-gray underline underline-offset-4 ">Create an account</p>
        </Link>
      </div>
      <SignWithGoogleButton />
    </form>
  );
};

export default SignInForm;
