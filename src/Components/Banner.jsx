'use client'
import Image from "next/image"
import styles from "../Styles/Banner.module.css"
import Link from "next/link"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const Banner = ({ buy_link, banner_img, banner_text, products }) => {
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
                <Link style={{ height: "max-content" }} href={{ pathname: `/product/${prop.productId}`, query: { ...extractMinimumNetValue(prop.variants).obj } }}> Buy Now</Link>
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