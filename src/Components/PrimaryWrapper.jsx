import React from "react"
export const PrimaryWrapper = ({ disabled, children }) => <div aria-disabled={disabled} className="bg-primary text-white rounded h-full w-full aria-disabled:bg-primary-light" >
    {children}</div>