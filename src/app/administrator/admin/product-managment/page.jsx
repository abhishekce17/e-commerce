"use client"
import React from 'react'
import styles from "@/Styles/ProductsManagment.module.css"
import { RiSearch2Line } from 'react-icons/ri'
import {BiEditAlt} from "react-icons/bi"
import Image from 'next/image'
import { MdDeleteOutline } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  let router = useRouter()
  const handleClick = () => {
    router.push("/administrator/admin/product-managment/add-products")
  }
  return (
    <div className={styles.product_managemnet} >
      <div className={styles.view_products} >
        <div className={styles.top_bar} >
          <div> <RiSearch2Line style={{position:"relative", top:"4px"}} /> <input type='text' placeholder='Search Product' /> </div>
          <button onClick={handleClick} >+ Add Product</button>
        </div>
        <div className={styles.headings} >
          <input type='checkbox' />
          <div>Product</div>
          <div>Category</div>
          <div>Stock</div>
          <div>Price</div>
          <div>sold</div>
          <div className={styles.action_icons} > <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <Link href={"administrator/admin/product-managment/product-details/product_Id"} >
            <p>Nothing Phone 2 120 Htz</p>
            </Link>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
        <div className={styles.product_info} >
          <input type='checkbox' />
          <div>
            <Image src={"/category.jpg"} width={100} height={100} alt='name' />
            <p>Nothing Phone 2 120 Htz</p>
          </div>
          <div>Mobiles</div>
          <div>2250</div>
          <div>$1522</div>
          <div>147,523</div>
          <div className={styles.action_icons} > <BiEditAlt /> <MdDeleteOutline /> </div>
        </div>
      </div>
    </div>
  )
}

export default page