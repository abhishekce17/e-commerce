'use client'
import Image from "next/image"
import styles from "../Styles/Banner.module.css"
import Link from "next/link"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const Banner = ({ buy_link, banner_img, banner_text, products }) => {

  // console.log(products)

  let id = 0;
  function prevCall() {
    let banners = document.getElementsByClassName(styles.banner_container)
    if (id == 0) {
      id = banners.length - 1;
      banners[id].scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
    else {
      id -= 1;
      banners[id].scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }
  function nextCall(e) {
    let banners = document.getElementsByClassName(styles.banner_container)
    if (id < banners.length - 1) {
      id += 1;
      banners[id].scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
    else {
      id = 0;
      banners[id].scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }
  return (
    <div className={styles.banner} >
      {products.length > 1 && <div onClick={prevCall} className={styles.prev} >
        <FaChevronLeft />
      </div>}
      <div className={styles.banner_collection} >

        {
          products.map((prop, index) => {
            return <div key={prop.dealId} className={styles.banner_container} style={{ "--i": index }} >
              <Image width={1000} height={1000} src={prop.pcViewURL} alt={prop.mobileViewURL} />
              <div className={styles.banner_utils_container} >
                {/* <h2>{prop?.productName}</h2> */}
                <Link style={{ height: "max-content" }} href={`/${prop.productId}`}> Buy Now</Link>
              </div>
            </div>
          })}
      </div>
      {products.length > 1 && <div onClick={nextCall} className={styles.next} >
        <FaChevronRight />
      </div>}
    </div>
  )
}

export default Banner