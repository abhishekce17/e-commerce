import React from 'react'
import dealsStyles from "@/Styles/dealsStyles.module.css"
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
    let product_count = 21
    return (
        <div className={dealsStyles.banner_deals_container} >
            <div className={dealsStyles.banner_collection} >
                {
                    [...Array(5)].map((undefined, index) => {
                        return <div key={index} className={dealsStyles.banner_container} style={{ "--i": index }} >
                            <Image width={1000} height={1000} src={"/banner_img.jpg"} alt={"text"} />
                            <div className={dealsStyles.banner_utils_container} >
                                <h2>Nothing Phone 2 8 GEN+ 2 launching on 2nd July, 120 Hz smoothness</h2>
                                <Link href={"#"}> Buy Now {index} </Link>
                            </div>
                        </div>
                    })}
            </div>
            <div className={dealsStyles.product_collection} >
                {[...Array(product_count)].map((undefined, index) => {
                    return (
                        <div key={index} className={dealsStyles.each_product_card} >
                            <Link href={"/product-link"} >
                                <Image width={500} height={500} src={"/category.jpg"} alt='product-image' />
                                <div>
                                    <p>Nothing Phone 2 8+ GEN 1 120Hz display</p> 
                                    <p>₹99<s>₹129</s> </p>
                                </div>
                            </Link>
                            <button className={dealsStyles.action} >Add to cart</button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default page