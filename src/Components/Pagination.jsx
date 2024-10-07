import React from 'react'

export const Pagination = () => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 w-full justify-center mb-5 text-xl">
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-primary-light border border-e-0 border-primary rounded-s-lg hover:bg-primary">
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-primary-light border border-primary hover:bg-primary">1</a>
                </li>

                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-primary-light border border-primary rounded-e-lg hover:bg-primary">
                        <span className="sr-only">Next</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
