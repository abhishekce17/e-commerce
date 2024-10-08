import React from 'react'
import styles from '@/Styles/Footer.module.css'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="bg-primary md:text-center text-xs   sm:text-base md:lg text-white" >
      <div className="grow md:justify-around border-b-2 p-5 flex flex-wrap gap-4" >
        <ul>
          <li> <Link href={"#"} > Cancellation & Returns</Link></li>
          <li> <Link href={"#"} > Report Infringment</Link></li>
          <li> <Link href={"#"} > Payment Methods</Link></li>
          <li> <Link href={"#"} > Shipping</Link></li>
          <li> <Link href={"#"} > FAQ</Link></li>
        </ul>
        <ul>
          <li> <Link href={"#"} > Retrun policy</Link></li>
          <li> <Link href={"#"} > Terms of Use</Link></li>
          <li> <Link href={"#"} > Security</Link></li>
          <li> <Link href={"#"} > Privacy</Link></li>
        </ul>
        <ul>
          <li> <Link href={"#"} > Contact Us</Link></li>
          <li> <Link href={"#"} > About Us</Link></li>
          <li> <Link href={"#"} > Corporate Information</Link></li>
        </ul>
      </div>
      <div className="py-2">
        <p>	&#169; 2023-2024 e-commerce</p>
      </div>
    </div>
  )
}

export default Footer 