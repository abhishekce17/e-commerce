"use client"

import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import styles from "@/Styles/Authentication.module.css";
import { useRouter } from "next/navigation";
import UserAuthContext from "@/app/contextProvider";

const SignInForm = () => {
  const context = useContext(UserAuthContext)
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCredentailInvalid, setIsCredentailInvalid] = useState(false)

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
    const authFetch = await fetch("/api/Authentication/userAuth/SignIn", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })
    const fetchResult = await authFetch.json()
    if (fetchResult.status === 200) {
      context.setIsUserLoggedIn(true)
      context.fetchUserData()
      router.replace("/")
    } else if (fetchResult.status === 401) {
      setIsCredentailInvalid(true)
    } else if (fetchResult.status === 500) {
      alert("Server Error");
    }
  };

  return (
    <div className={styles.formCenter}>
      <form className={styles.formFields} onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label className={styles.formFieldLabel} htmlFor="email">
            E-Mail Address
          </label>
          <input
            required
            type="email"
            id="email"
            className={styles.formFieldInput}
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.formFieldLabel} htmlFor="password">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            className={styles.formFieldInput}
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formField}>
          <button className={styles.formFieldButton}>Sign In</button>{" "}
          <Link href="/authentication/sign-up" passHref>
            <p className={styles.formFieldLink}>Create an account</p>
          </Link>
        </div>

        {isCredentailInvalid && <div className={styles.formField} >
          <label className={styles.formFieldLabel} style={{ color: "red" }} htmlFor="email">
            E-Mail or Password is Invalid
          </label>
        </div>}

        <div className={styles.socialMediaButtons}>
          <div className={styles.googleButton}>
            Log in with <FcGoogle className={styles.googleIcon} onClick={() => alert("Hello")} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
