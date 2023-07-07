import styles from "@/Styles/TopCategories.module.css"
import Image from "next/image"
import Link from "next/link"

const TopCategory = () => {

  const categories = ["Mobile", "Electronics", "Home Decore", "Kitchen"]

  return (
    <div className={styles.top_category} >
      <h2 style={{ marginBottom: "20px", fontWeight: "500" }} >Top Categories</h2>
      <div className={styles.container} >
        {
          categories.map((category, index) => {
            return (<div key={index} className={styles.each_category}  >
            <Link href={"/category/"+category} >
              <Image width={500} height={500} src={"/category.jpg"} alt='product-image' />
              <center>
                <h3>{category}</h3>
              </center>
            </Link>
            </div>)
          })
        }
      </div>
    </div>
  )
}

export default TopCategory