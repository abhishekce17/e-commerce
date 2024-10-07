import Link from 'next/link'
import React from 'react'

export const OutlineButton = ({ label, onClick, href, className, type, disabled }) => {
    let classObject = `border text-primary w-fit h-max border-primary-light py-2 px-3 rounded-3xl font-medium hover:text-white transition duration-300 ${className} text-center`
    if (href) {
        return (
            <Link className={classObject} href={href} >{label}</Link>
        )
    }
    return (
        <button disabled={disabled} className={classObject} type={type || "submit"} onClick={onClick} >{label}</button>
    )
}
