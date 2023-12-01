import Image from 'next/image'
import styles from '../Styles/Featured.module.css'
import Link from 'next/link'
import { BiChevronRight } from "react-icons/bi"

const Featured = ({ products }) => {
    function extractMinimumNetValue(variants) {
        let obj = {}
        if (!Array.isArray(variants) || variants.length === 0) {
            return null; // Handle invalid input
        }

        let minNetValue = Number.MAX_VALUE;
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
            return { minNetValue: null, obj };; // No valid netValues found
        }
        return { minNetValue: minNetValue.toLocaleString("en-IN", { useGrouping: true }), obj };
    }

    return (
        <div className={styles.featured_cards} >
            <div className={styles.featured_redirect} >
                <h2 style={{ marginBottom: "20px", fontWeight: "500" }} >Featured Products</h2>
                <Link href={"/product-list/featured-products"} >see all <BiChevronRight style={{ position: "relative", top: "3px" }} /> </Link>
            </div>
            <ul>
                {products.map((prop) => {
                    return (
                        <li key={prop.FeaturedId} > <Link href={{ pathname: `/product/${prop.productId}`, query: { ...extractMinimumNetValue(prop.variants)?.obj || "" } }} > <Image width={500} height={500} src={prop.productFirtsImgURL} alt={prop.productFirtsImgURL} /> <div><p>{prop.productName}</p> <p>From &#8377;{extractMinimumNetValue(prop.variants)?.minNetValue || parseInt((prop.price - (prop.price * (prop.discount / 100)))).toLocaleString("en-IN", { useGrouping: true })}</p> </div> </Link> </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Featured