"use client"
import React, { useState } from 'react'
import styles from "@/Styles/CategoryManagment.module.css"
import { RiSearch2Line } from 'react-icons/ri'
import { BiEditAlt } from "react-icons/bi"
import { MdDeleteOutline } from 'react-icons/md'
import { ImCircleDown } from 'react-icons/im'
import { useRouter } from 'next/navigation'

const page = () => {
  let router = useRouter()
  const [isSelected, setIsSelected] = useState(false);
  const [subSelection, setSubSelection] = useState("")
  const [optionsSelection, setOptionsSelection] = useState("")
  const handleSelection = (index) => {
    setIsSelected((prev) => index === prev ? false : index)
    setSubSelection("")
    setOptionsSelection("")
  }
  const handleSubSelection = (lable) => {
    setSubSelection((prev) => lable === prev ? "" : lable)
    setOptionsSelection("")
  }
  const handleOptionSelection = (option) =>{
    setOptionsSelection((prev) => option === prev ? "" : option)
  }
  const handleClick = (route) => {
    router.push("/administrator/admin/category-managment/"+route)
  }
  return (
    <div className={styles.category_managemnet} >
      <div className={styles.view_category} >
        <div className={styles.top_bar} >
          <div> <RiSearch2Line style={{ position: "relative", top: "4px" }} /> <input type='text' placeholder='Search...' /> </div>
          <button onClick={ ()=> {handleClick("add-category")}} >+ New Category</button>
        </div>
        <div className={styles.headings} >
          <div>Category</div>
          <div>Products</div>
          <div>Featured</div>
          <div>Action</div>
        </div>

        {[...Array(10)].map((undefined, index) => {
          return (
            <div key={index} className={`${styles.category_info}  ${isSelected === index && styles.selected}`} >
              <div>
                <div>
                  <ImCircleDown onClick={() => { handleSelection(index) }} className={styles.list_style} />
                  <p>Nothing Phone 2 120 Htz</p>
                </div>
                <div>Mobiles</div>
                <div>2250</div>
                <div className={styles.action_icons} > <div onClick={()=>{handleClick("edit-category")}} ><BiEditAlt /> Edit</div> <div> <MdDeleteOutline /></div> </div>
              </div>
              {isSelected === index &&
                <div className={styles.category_info_subgroup} >
                  <div className={styles.brand_names} >
                    <label onClick={() => { handleSubSelection("brand") }} className={subSelection === "brand" && styles.selected} >
                      <ImCircleDown className={styles.list_style} />
                      Brands
                    </label>
                    {
                      subSelection === "brand" &&
                      <ul>
                        <li>Realme</li>
                        <li>Xiaomi</li>
                        <li>OPPO</li>
                        <li>VIVO</li>
                        <li>Oneplus</li>
                      </ul>
                    }
                  </div>
                  <div className={styles.tags_options} >
                    <label onClick={() => { handleSubSelection("tags") }} className={subSelection === "tags" && styles.selected} >
                      <ImCircleDown className={styles.list_style} />
                      Tags
                    </label>
                    {
                      subSelection === "tags" &&
                      <ul>
                        <li>Realme</li>
                        <li>Xiaomi</li>
                        <li>OPPO</li>
                        <li>VIVO</li>
                        <li>Oneplus</li>
                      </ul>
                    }
                  </div>
                  <div className={styles.variant_options} >
                    <label onClick={() => { handleSubSelection("variant") }} className={subSelection === "variant" && styles.selected} >
                      <ImCircleDown className={styles.list_style} />
                      Variants options
                    </label>
                    {
                      subSelection === "variant" &&
                      <div className={styles.options} >
                        <div onClick={() => { handleOptionSelection("color") }} >
                          <ImCircleDown className={`${styles.list_style} ${optionsSelection === "color" && styles.selected} `} />
                          <label >Color</label>
                          {optionsSelection === "color" &&
                            <ul>
                              <li>Red</li>
                              <li>Green</li>
                              <li>Blue</li>
                            </ul>
                          }
                        </div>
                        <div onClick={() => { handleOptionSelection("storage") }} >
                          <ImCircleDown className={`${styles.list_style} ${optionsSelection === "storage" && styles.selected} `} />
                          <label >Storage</label>
                          {
                            optionsSelection === "storage" &&
                            <ul>
                              <li>6GB + 128GB</li>
                              <li>8GB + 256GB</li>
                            </ul>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default page