"use client"
import React, { useState } from 'react'
import styles from "@/Styles/productDetail.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { RiAccountCircleFill } from "react-icons/ri"


const Page = ({ params }) => {
  // console.log(params.product_id)
  let default_variant = { color: "red", storage: "4GB + 64GB" }
  let color_variants = ["red", "#bff", "yellow", "blue"];
  let storage_type = ["4GB + 64GB", "6GB + 128GB", "8GB + 256GB", "12GB + 512GB"]


  const [number, setNumber] = useState(1);

  const decreaseNumber = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  const increaseNumber = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };




  function handleSelection(e) {
    const selectedElement = e.target;
    const optionsContainer = selectedElement.parentNode;

    const options = optionsContainer.querySelectorAll('div');
    options.forEach(option => {
      option.setAttribute('data-selected', 'false');
      option.setAttribute('data-default', 'false');
    });

    selectedElement.setAttribute('data-selected', 'true');
  }

  return (
    <div className={styles.product_details_container} >
      <div className={styles.product_images_actions} >
        <div className={styles.product_images} >
          <Image width={500} height={500} src={"/category.jpg"} alt='product-image' />
          <div className={styles.extra_images} >
            <Image width={500} height={500} data-selected="true" src={"/category.jpg"} alt='product-image' />
            <Image width={500} height={500} src={"/category.jpg"} alt='product-image' />
            <Image width={500} height={500} src={"/category.jpg"} alt='product-image' />
            <Image width={500} height={500} src={"/category.jpg"} alt='product-image' />
          </div>
        </div>
        <div className={styles.details} >
          <div className={styles.extra}  >
            <AiFillHeart />
            <AiOutlineHeart />
            <AiOutlineShareAlt />
          </div>
          <h1>Nothing Phone (R) 2
          </h1>
          <p className={styles.ratings_review} >★★★★☆
            <span>4</span>|
            <span>625 ratings</span>|
            <span>125 reviews</span>
          </p>
          <p className={styles.price_discount} >M.R.P.<s>₹129</s> <strong>₹99</strong> </p>
          <div className={styles.variants_container} >
            <p>variants</p>
            <div>
              <div className={styles.color_variants} >
                <p>color</p>
                <div className={styles.options} >
                  {
                    color_variants.map((color, index) => {
                      return (
                        <div key={index} style={{ backgroundColor: color }} data-selected="false" data-default={default_variant.color === color && "true"} onClick={handleSelection} ></div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.storage_variant} >
                <p>Storage Type</p>
                <div className={styles.storage_options} >

                  {
                    storage_type.map((type, index) => {
                      return (
                        <div key={index} data-selected="false" data-default={default_variant.storage === type && "true"} onClick={handleSelection} >{type}</div>
                      )
                    })
                  }

                </div>
              </div>
            </div>
          </div>
          <div className={styles.utils_container} >
            <div className={styles.quantity}>
              <AiOutlineMinus onClick={number > 1 ? decreaseNumber : undefined} />
              <span>{number}</span>
              <AiOutlinePlus onClick={number < 9 ? increaseNumber : undefined} />
            </div>
            <div className={styles.pincode_check} >
              <p>Check delivery option</p>
              <input type="text" maxLength={6} placeholder="pincode" />
            </div>
            <div className={styles.check_button} >
              <button>Check</button>
            </div>
          </div>
        </div>
        <div className={styles.action_buttons}>
          <button className={styles.buy_now} >Buy Now</button>
          <button className={styles.add_to_cart} >Add to cart</button>
        </div>
      </div>
      <div className={styles.description} >
        <div className={styles.key_feature} >
          <p>key Specification</p>
          <ul>
            <li>1st Spesificaion</li>
            <li>1st Spesificaion</li>
            <li>1st Spesificaion</li>
            <li>1st Spesificaion</li>
            <li>1st Spesificaion</li>
            <li>1st Spesificaion</li>
          </ul>
        </div>
        <div className={styles.captions} >
          <p>More about this items</p>
          <p>
            Snapdragon 8 Gen 2 Mobile Platform adopts TSMC 4NM process which has 10% higher CPU peak performance and 20% higher GPU peak performance than Snapdragon 8+ Gen 1. Also, equipped with LPDDR5X RAM & UFS 4.0 storage.
            The 2K AMOLED display has 77.8% more pixels than the 1080P display. E6 Performs much better than E4 in terms of power consumption and brightness. 25% less in Power Consumption and 1800 nits Local Peak Brightness
            iQOO 11&apos;s 120W FlashCharge charges 50% battery in just 8 mins and 100% battery in just 25 mins
            V2 Chip provides better gaming and photography experience. It can increase the frame rate from 45fps 60fps to 90fps & 120fps respectively. It also facilitates users to shoot better night videos photos.
          </p>
        </div>
      </div>
      <div className={styles.similar_items} >
        <div>
          <span>Similar Items You Might Like</span>
          <span>see all</span>
        </div>
        <ul>

          {

            [...Array(7)].map((undefined, index) => {
              return (
                <li key={index} > <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Nothing Phone 2 8+ GEN 1 120Hz display</p> <p>From 12$</p> </div> </Link> </li>
              )
            })
          }
        </ul>
      </div>
      <div className={styles.customer_review_ratings} >
        <p>Ratings and reviews</p>
        <div className={styles.each_review} >
          <div className={styles.profile} >
            <div> <RiAccountCircleFill /> </div>
            <p>Consumer Name</p>
          </div>
          <div className={styles.rating_details} >
            <p>★★★★☆ <span>4</span> </p>
            <p>timeline</p>
            <p>greatest phone all over the wolrd i have seen till now</p>
          </div>
        </div>
        <div className={styles.each_review} >
          <div className={styles.profile} >
            <div> <RiAccountCircleFill /> </div>
            <p>Consumer Name</p>
          </div>
          <div className={styles.rating_details} >
            <p>★★★★☆ <span>4</span> </p>
            <p>timeline</p>
            <p>greatest phone all over the wolrd i have seen till now kakdfhkdf dfkfhakfj akdfkshdf akfjhakdfj</p>
          </div>
        </div>
        <div className={styles.each_review} >
          <div className={styles.profile} >
            <div> <RiAccountCircleFill /> </div>
            <p>Consumer Name</p>
          </div>
          <div className={styles.rating_details} >
            <p>★★★★☆ <span>4</span> </p>
            <p>timeline</p>
            <p>greatest phone all over the wolrd i have seen till now aksdfkf akjdfh afdj akjsdfhaskd fakjdfhakd</p>
          </div>
        </div>
        <div className={styles.each_review} >
          <div className={styles.profile} >
            <div> <RiAccountCircleFill /> </div>
            <p>Consumer Name</p>
          </div>
          <div className={styles.rating_details} >
            <p>★★★★☆ <span>4</span> </p>
            <p>timeline</p>
            <p>greatest phone all over the wolrd i have seen till now kdsfkajdf dfkhkajdfhakdjf adfjhakdfj</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page