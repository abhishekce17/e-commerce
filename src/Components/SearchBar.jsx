"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { CgSearch } from 'react-icons/cg';

export const SearchBar = () => {
    const [queryValue, setQueryValue] = useState("");
    let router = useRouter()


    const handleQueryRequest = (e) => {
        e.preventDefault()
        router.push("/search/" + queryValue.replace(" ", "-"))
    }
    const handleChange = (e) => {
        setQueryValue(e.target.value)
    }

    return (
        <form onSubmit={handleQueryRequest} className="flex items-center rounded-lg overflow-hidden border border-gray-400 px-1" >
            <CgSearch className="text-2xl text-primary" size={27} />
            <input type="text" placeholder="Search Product" value={queryValue} onChange={handleChange} spellCheck="false" className="text-lg p-1 border-none outline-none w-full" style={{ boxShadow: "none" }} />
        </form>
    )
}
