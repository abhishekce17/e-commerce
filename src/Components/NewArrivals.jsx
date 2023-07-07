import Image from 'next/image'
import styles from '../Styles/NewArrivals.module.css'
import Link from 'next/link'
import { BiChevronRight } from "react-icons/bi"
 
const NewArrivals = () => {
    return (
        <div className={styles.newArrivals_cards} >
            <div className={styles.newArrivals_redirect} >
            <h2 style={{ marginBottom: "20px", fontWeight: "500" }} >New Products landed on the store</h2>
            <Link href={"/offer-list/new-products"} >see all <BiChevronRight style={{position: "relative", top:"3px"}} /> </Link>
            </div>
            <ul>
                <li> <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Nothing Phone 2 8+ GEN 1 120Hz display</p> <p>From 12$</p> </div> </Link> </li>
                <li> <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Product Name</p> <p>From 12$</p> </div> </Link> </li>
                <li> <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Product Name</p> <p>From 12$</p> </div> </Link> </li>
                <li> <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Product Name</p> <p>From 12$</p> </div> </Link> </li>
                <li> <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Product Name</p> <p>From 12$</p> </div> </Link> </li>
            </ul>
        </div>
    )
}

export default NewArrivals