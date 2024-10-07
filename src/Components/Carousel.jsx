
"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const Carousel = ({ products }) => {
  const [current, setCurrent] = useState(0);
  const next = () => current === products.length - 1 ? setCurrent(0) : setCurrent(x => x + 1);
  const prev = () => current === 0 ? setCurrent(products.length - 1) : setCurrent(x => x - 1)
  return (
    <div className="relative w-full overflow-hidden" >
      <div className="flex transition duration-400 aspect-3" style={{ transform: `translateX(-${current * 100}%)` }} >

        {
          products.map((prop, index) => {
            return (
              <Link key={prop.productId} href={`/product/${prop.productId}`} className="min-w-full" >
                <Image width={1000} height={1000} src={prop.pcViewURL} alt={prop.mobileViewURL} className="w-full h-full" />
              </Link>
            )
          })}
      </div>
      <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={prev}>
        <IoIosArrowBack className="text-2xl text-white" />
      </button>
      <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={next}>
        <IoIosArrowForward className="text-2xl text-white" />
      </button>
    </div>
  )
}

export default Carousel;