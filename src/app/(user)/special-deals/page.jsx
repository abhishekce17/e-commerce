import Image from 'next/image'
import Link from 'next/link'
import { ProductListLayout } from '@/Components/ProductListLayout'
import { fetchCollectionData } from "@/actions/fetchCollectionData"
import { ProductCard } from "@/Components/ProductCard"

const Page = async () => {
    const bannerDeals = await fetchCollectionData({ collectionName: "SpecialDealseBannerProduct" });
    const selectedDeals = await fetchCollectionData({ collectionName: "SpecialDealseSelectedProducts", limitNo: 25 });

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
            return { minNetValue: null, obj }; // No valid netValues found
        }
        return { minNetValue: minNetValue.toLocaleString("en-IN", { useGrouping: true }), obj };
    }

    return (
        <div className="" >
            <div className="w-full flex flex-col gap-2" >
                {
                    bannerDeals.map((info, index) => {
                        return <Link key={info.productId} href={`/product/${info.productId}`} className="min-w-full" >
                            <Image width={1000} height={1000} src={info.pcViewURL} alt={info.pcViewURL} className="w-full h-full aspect-3" />
                        </Link>
                    })}
            </div>
            <ProductListLayout heading="Special offers on selected products" >

                {/* {selectedDeals.map((info, index) => {

                    return info.variants.length ? info.variants.map((prty, i) => prty.type.map((atb, j) => {
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
                    }))
                        : (
                            <div key={index} className={dealsStyles.each_product_card} >
                                <Link href={{ pathname: `product/${info.productId}` }} >
                                    <Image width={500} height={500} src={info.productFirtsImgURL} alt={info.productFirtsImgUR} />
                                    <div>
                                        <p>{info.productName}</p>
                                    </div>
                                    <div>
                                        <p>₹{parseInt(info.price - info.price * info.discount / 100).toLocaleString("en-IN", { useGrouping: true })}<s>₹{info.price.toLocaleString("en-IN", { useGrouping: true })}</s> </p>
                                    </div>
                                </Link>
                            </div>
                        )
                }) */}
                {/* } */}
                {
                    selectedDeals.map((prop) => {
                        return prop.variants.length ? prop.variants.map((prty, i) => prty.type.map((variant, j) =>
                            <ProductCard
                                key={`${j}_${prop.productId}_${variant}`}
                                productInfo={{ ...prop, price: variant.price, variants: undefined, discount: variant.discount }}
                                href={{ pathname: `/product/${prop.productId}`, query: { [prty.title]: variant.variant } }}
                            />
                        ))
                            : <ProductCard
                                key={prop.productId}
                                productInfo={prop}
                                href={{ pathname: `/product/${prop.productId}`, query: { ...extractMinimumNetValue(prop.variants)?.obj || "" } }}
                            />
                    })
                }


            </ProductListLayout>
        </div>
    )
}

export default Page