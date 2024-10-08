"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { notify } from "@/utils/notify";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreedTermAndCondition: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.agreedTermAndCondition) newErrors.agreedTermAndCondition = 'You must agree to the terms and conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const { confirmPassword, ...signUpData } = formData
      const result = await userSignUp(signUpData)
      if (result.status === 201) {
        router.refresh(); // Redirect to dashboard or home page
      } else {
        notify(result.error || 'Sign up failed. Please try again.', "error");
      }
    } catch (error) {
      console.log('Sign up error:', error)
      notify('An unexpected error occurred. Please try again.', "error");
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-10" >
        <label className="block uppercase text-white" htmlFor="name">
          Full Name
        </label>
        <input
          disabled={isLoading}
          className="w-full md:w-[85%] bg-transparent outline-none text-white border-b-2 py-3"
          required
          type="text"
          id="name"
          placeholder="Enter your full name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="mb-10" >
        <label className="block uppercase text-white" htmlFor="email">
          E-Mail Address
        </label>
        <input
          disabled={isLoading}
          required
          type="email"
          id="email"
          className="w-full md:w-[85%] bg-transparent outline-none text-white border-b-2 py-3"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div className="mb-10" >
        <label className="block uppercase text-white" htmlFor="password">
          Password
        </label>
        <input
          disabled={isLoading}
          required
          type="password"
          id="password"
          className="w-full md:w-[85%] bg-transparent outline-none text-white border-b-2 py-3"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      <div className="mb-10" >
        <label className="block uppercase text-white" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          disabled={isLoading}
          required
          type="password"
          className="w-full md:w-[85%] bg-transparent outline-none text-white border-b-2 py-3"
          placeholder="Confirm your password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      <div className="mb-10" >
        <label className="text-sm text-custom-light-gray">
          <input
            disabled={isLoading}
            type="checkbox"
            id="agreedTermAndCondition"
            name="agreedTermAndCondition"
            checked={formData.agreedTermAndCondition}
            onCheckedChange={(checked) =>
              setFormData(prev => ({ ...prev, agreedTermAndCondition: checked }))
            }
          />{" "}
          I agree to all statements in{" "}
          <a href="#" className="text-white underline underline-offset-4">
            terms of service
          </a>
        </label>
        {errors.agreedTermAndCondition && <p className="text-red-500 text-sm mt-1">{errors.agreedTermAndCondition}</p>}
      </div>

      <div className="flex mb-8 items-end gap-5 text-custom-light-gray justify-center md:justify-start" >
        <PrimaryButton disabled={isLoading} label="Sign up" className="px-5 text-xl font-medium" />
        or
        <Link href="/sign-in" className="text-custom-light-gray underline underline-offset-4 ">
          I&apos;m already a member
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
