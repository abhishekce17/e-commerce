"use client"
import { useEffect, useState } from 'react'
import dealsStyles from "@/Styles/dealsStyles.module.css"
import Image from 'next/image'
import Link from 'next/link'
import Loading from '../administrator/admin/loading'

const page = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [bannerDeals, setBannerDeals] = useState([]);
    const [selectedDeals, setSelectedDeals] = useState([]);


    function extractMinimumNetValue(variants) {
        if (!Array.isArray(variants) || variants.length === 0) {
            return null; // Handle invalid input
        }

        let minNetValue = Number.MAX_VALUE;
        let obj = {}
        variants.forEach(variant => {
            if (Array.isArray(variant.type)) {
                variant.type.forEach(type => {
                    if (type.price && !isNaN(Number(type.price))) {
                        const netValue = parseInt((type.price - (type.price * (type.discount / 100))));
                        if (netValue < minNetValue) {
                            minNetValue = netValue;
                            obj = { [variant.title]: type.variant }
                        }
                    }
                    obj = { [variant.title]: variant.type[0].variant, ...obj }
                });
            }
        });
        if (minNetValue === Number.MAX_VALUE) {
            return null; // No valid netValues found
        }
        return { minNetValue, obj };
    }


    useEffect(() => {
        const fetchDeals = async () => {
            const response = await fetch("/api/AdminDealseSetting/FetchDealse");
            const result = await response.json();
            if (result.status === 200) {
                console.log(result.data);
                setBannerDeals(result.data.bannerDeals)
                setSelectedDeals(result.data.selectedDeals)
                setIsLoading(false)
            } else {
                alert("something went wrong please try agian later");
            }
        }
        fetchDeals();
    }, [])

    return (
        <>
            {isLoading ? Loading() :
                <div className={dealsStyles.banner_deals_container} >
                    <div className={dealsStyles.banner_collection} >
                        {
                            bannerDeals.map((info, index) => {
                                return <div key={index} className={dealsStyles.banner_container} style={{ "--i": index }} >
                                    <Image width={1000} height={1000} src={info.pcViewURL} alt={info.pcViewURL} />
                                    <div className={dealsStyles.banner_utils_container} >
                                        <h2>{info.productName}</h2>
                                        <Link href={{ pathname: `product/${info.productId}`, query: { ...extractMinimumNetValue(info.variants)?.obj || "" } }}> Buy Now</Link>
                                    </div>
                                </div>
                            })}
                    </div>
                    <div className={dealsStyles.product_collection} >
                        {selectedDeals.map((info, index) => info.variants.map((prty, i) => prty.type.map((atb, j) => {
                            return (
                                <div key={index} className={dealsStyles.each_product_card} >
                                    <Link href={{ pathname: `product/${info.productId}`, query: { [prty.title]: atb.variant } }} >
                                        <Image width={500} height={500} src={info.productFirtsImgURL} alt={info.productFirtsImgUR} />
                                        <div>
                                            <p>{info.productName}</p>
                                        </div>
                                        <div>
                                            <p>₹{parseInt(atb.price - atb.price * atb.discount / 100).toLocaleString("en-IN", { useGrouping: true })}<s>₹{atb.price.toLocaleString("en-IN", { useGrouping: true })}</s> </p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })))

                        }

                    </div>
                </div>
            }
        </>
    )
}

export default page