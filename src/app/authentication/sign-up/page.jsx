"use client"
import React, { useState } from "react";
import styles from "@/Styles/Authentication.module.css";
import Link from "next/link";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setHasAgreed(checked);
    } else if (name === "name") {
      setName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log({ name, email, password, confirmPassword, hasAgreed });
  };

  return (
    <div className={styles.formCenter}>
      <form onSubmit={handleSubmit} className={styles.formFields}>
        <div className={styles.formField}>
          <label className={styles.formFieldLabel} htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.formFieldInput}
            placeholder="Enter your full name"
            name="name"
            value={name}
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
          <label className={styles.formFieldLabel} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={styles.formFieldInput}
            placeholder="Confirm your password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
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
          <label className={styles.formFieldCheckboxLabel}>
            <input
              className={styles.formFieldCheckbox}
              type="checkbox"
              name="hasAgreed"
              checked={hasAgreed}
              onChange={handleChange}
            />{" "}
            I agree to all statements in{" "}
            <a href="null" className={styles.formFieldTermsLink}>
              terms of service
            </a>
          </label>
        </div>

        <div className={styles.formField}>
          <button className={styles.formFieldButton}>Sign Up</button>{" "}
          <Link href="/authentication/sign-in" className={styles.formFieldLink}>
            I'm already a member
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
