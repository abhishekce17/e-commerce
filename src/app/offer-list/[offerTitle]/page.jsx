import styles from "@/Styles/productsLayout.module.css"
import Link from "next/link"
import Image from "next/image"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"



const page = ({params}) => {

    let wishist = false;
    let product_count = 7;
    return (
        <div className={styles.layout} >
            <center> <p style={{ fontSize: "20px", fontWeight: 600 }} >All Featured Products</p> <h1>{params.offerTitle}</h1> </center>
            <div className={styles.layout_container} >

                {[...Array(product_count)].map(( undefined, index) => {
                    return (
                        <div key={index} className={styles.each_product_card} >
                            <span className={styles.wishlist_icon} >
                            {
                                wishist ? 
                                <AiFillHeart />
                                :
                                <AiOutlineHeart />
                            }
                            </span>
                            <Link href={"/product-link"} >
                                <Image width={500} height={500} src={"/category.jpg"} alt='product-image' />
                                <div>
                                    <p>Nothing Phone 2 8+ GEN 1 120Hz display</p> <p>From 12$</p>
                                </div>
                            </Link>
                            <button className={styles.action} >Add to cart</button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default page