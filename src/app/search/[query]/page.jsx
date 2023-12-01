"use client"
import styles from "@/Styles/productsLayout.module.css"
import Link from "next/link"
import Image from "next/image"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import FilterComponent from "@/Components/FilterComponent"



const Page = ({ params }) => {
    const query = decodeURIComponent(params.query);
    let wishist = false;
    let product_count = 15;
    return (
        <div className={styles.layout} >
            <center> <p style={{ fontSize: "20px" }} > Showing Result for <span style={{ fontWeight: 600 }} >{query.replace("-", " ")}</span> </p></center>
            <div className={styles.layout_container} >
                {[...Array(product_count)].map((undefined, index) => {
                    return (
                        <div key={index} className={styles.each_product_card} >
                            <Link href={"/product-link"} >
                                <Image width={500} height={500} src={"/category.jpg"} alt='product-image' />
                                <div>
                                    <p>Nothing Phone 2 8+ GEN 1 120Hz display</p> <p>₹99<s>₹129</s> </p>
                                </div>
                            </Link>
                            <div className={styles.rating} > <span>★★★★☆</span> 4</div>
                            <button className={styles.action} >Add to cart</button>
                            <span className={styles.wishlist_icon} >
                                {
                                    wishist ?
                                        <AiFillHeart />
                                        :
                                        <AiOutlineHeart />
                                }
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Page