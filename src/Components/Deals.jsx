import Image from 'next/image'
import styles from '../Styles/Deals.module.css'
import Link from 'next/link'
import { BiChevronRight } from "react-icons/bi"

const Deals = ({ products }) => {

    function extractMinimumNetValue(variants) {
        if (!Array.isArray(variants) || variants.length === 0) {
            return null; // Handle invalid input
        }

        let minNetValue = Number.MAX_VALUE;

        variants.forEach(variant => {
            if (Array.isArray(variant.type)) {
                variant.type.forEach(type => {
                    if (type.netValue && !isNaN(Number(type.netValue))) {
                        const netValue = parseFloat(type.netValue);
                        if (netValue < minNetValue) {
                            minNetValue = netValue;
                        }
                    }
                });
            }
        });

        if (minNetValue === Number.MAX_VALUE) {
            return null; // No valid netValues found
        }
        return minNetValue;
    }

    return (
        <div className={styles.deals_cards} >
            <div className={styles.deals_redirect} >
                <h2 style={{ marginBottom: "20px", fontWeight: "500" }} >Spacial Deals on selected Products</h2>
                <Link href={"/special-deals"} >see all <BiChevronRight style={{ position: "relative", top: "3px" }} /> </Link>
            </div>
            <ul>
                {products.map((prop) => {
                    return (
                        <li key={prop.productId} > <Link href={`/${prop.productId}`} > <Image width={500} height={500} src={`${prop.productFirtsImgURL}`} alt={`${prop.productFirtsImgURL}`} /> <div><p>{prop.productName}</p> <p>From 	&#8377;{extractMinimumNetValue(prop.variants)}</p> </div> </Link> </li>
                    )
                })
                }
                {/* <li> <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Product Name</p> <p>From 12$</p> </div> </Link> </li>
                <li> <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Product Name</p> <p>From 12$</p> </div> </Link> </li>
                <li> <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Product Name</p> <p>From 12$</p> </div> </Link> </li>
                <li> <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Product Name</p> <p>From 12$</p> </div> </Link> </li> */}
            </ul>
        </div>
    )
}

export default Deals