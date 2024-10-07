import Link from 'next/link'
import React from 'react'
import { PrimaryWrapper } from './PrimaryWrapper'

export const PrimaryButton = ({ label, onClick, href, className, type, disabled }) => {
    if (href) {
        return (
            <PrimaryWrapper>
                <a className={`px-4 py-2 ${className}`} href={href} >{label}</a>
            </PrimaryWrapper>
        )
    }
    return (
        <PrimaryWrapper disabled={disabled} >
            <button disabled={disabled} className={`px-4 py-2 ${className}`} type={type || "submit"} onClick={onClick} >{label}</button>
        </PrimaryWrapper>
    )
}
