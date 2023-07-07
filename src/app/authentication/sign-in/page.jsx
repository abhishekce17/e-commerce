"use client"

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import styles from "@/Styles/Authentication.module.css";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log({ email, password });
  };

  return (
    <div className={styles.formCenter}>
      <form className={styles.formFields} onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label className={styles.formFieldLabel} htmlFor="email">
            E-Mail Address
          </label>
          <input
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
