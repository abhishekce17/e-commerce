import Link from 'next/link'
import React from 'react'
import { BiChevronRight } from 'react-icons/bi'

export const SimilarItemsLayout = ({ heading, href, children }) => {
    return (
        <div className="my-7" >
            {(heading || href) ? <div className="flex justify-between" >
                <h1 style={{ marginBottom: "20px", fontWeight: "500" }} >{heading}</h1>
                {href ?
                    <Link className="flex" href={href} >see all <BiChevronRight style={{ position: "relative", top: "3px" }} /> </Link>
                    : undefined
                }
            </div> : undefined}
            <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:grid-cols-2 gap-x-[4%] gap-y-7" >
                {
                    children
                }
            </div>
        </div>
    )
}
