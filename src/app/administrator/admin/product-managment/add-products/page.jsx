"use client"
import React, { useState, useRef } from 'react';
import styles from "@/Styles/ProductsManagment.module.css"
import { RxCross1 } from 'react-icons/rx';
import { CiImageOn } from 'react-icons/ci';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AddProductPage = () => {
  const router = useRouter()
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState("");
  const [netValue, setNetValue] = useState("");
  const [images, setImages] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [category, setCategory] = useState('');
  const [specifications, setSpecifications] = useState(['']);
  const [moreDetails, setMoreDetails] = useState('');
  const [variants, setVariants] = useState([]);
  const fileInputRef = useRef(null);
  const [variantPrice, setVariantPrice] = useState({})
  const [formData, setFormData] = useState([])

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const removeDiscountNetValue = (type, variantRemoved) => {
    let updatedNetValue = { ...netValue };
    let updatedDiscount = { ...discount };

    delete updatedDiscount[type]; // Delete discount for the given type
    delete updatedNetValue[type]; // Delete net value for the given type

    setNetValue(updatedNetValue);
    setDiscount(updatedDiscount);
    console.log(variantPrice)
    if (variantRemoved) {
      setDiscount("");
      setNetValue("");
    }
  };


  const handlePriceChange = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
    setPrice(numericValue);
  };

  const handleDiscountChange = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
    setDiscount(numericValue);
    const calculatedNetValue = price - (price * (numericValue / 100)); // Calculate net value
    setNetValue(calculatedNetValue.toFixed(2)); // Set net value with 2 decimal places
  };

  const handleVariantDiscountChange = (event) => {
    const { name } = event.target;
    const numericValue = event.target.value.replace(/[^0-9]/g, ''); // Filter out non-numeric characters

    if (typeof discount === 'object') {
      setDiscount((prev) => {
        return { ...prev, [name]: numericValue };
      });

      const calculatedNetValue = Object.values(variantPrice).map((price) => {
        return price[name] !== undefined
          ? Number(price[name]) - Number(price[name]) * (numericValue / 100)
          : "";
      });
      setNetValue((prev) => {
        return { ...prev, [name]: calculatedNetValue.filter(x => typeof x === "number")[0] };
      });
    } else {
      setDiscount({});
      setNetValue({});
    }
  };


  const handleImageChange = async (event) => {
    const fileList = event.target.files;
    const imageArray = Array.from(fileList).map((file) => URL.createObjectURL(file));
    setFormData((prevFormData) => [...prevFormData, ...fileList])
    setImages((prevImages) => [...prevImages, ...imageArray]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    const updatedFormData = [...formData]
    updatedFormData.splice(index, 1);
    updatedImages.splice(index, 1);
    setFormData(updatedFormData);
    setImages(updatedImages);
    fileInputRef.current.value = ""
  };

  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    if (selectedCategory && selectedCategory in defaultVariants) {
      setVariants(defaultVariants[selectedCategory]);
    } else {
      setVariants([]);
    }
  };

  const handleSpecificationChange = (event, index) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index] = event.target.value;
    setSpecifications(updatedSpecifications);
  };

  const handleAddSpecification = () => {
    setSpecifications((prevSpecifications) => [...prevSpecifications, '']);
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications.splice(index, 1);
    setSpecifications(updatedSpecifications);
  };

  const handleMoreDetailsChange = (event) => {
    setMoreDetails(event.target.value);
  };

  const handleVariantChange = (event, variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].title = event.target.value;
    setVariants(updatedVariants);
  };


  const handleVariantPrice = (e, variantTitle) => {
    setPrice("")
    const { name, value } = e.target;
    let updatedVariantPrice = { ...variantPrice };
    if (value === "") {
      delete updatedVariantPrice[variantTitle][name];
      removeDiscountNetValue(name, false)
    } else {
      updatedVariantPrice = {
        ...updatedVariantPrice,
        [variantTitle]: {
          ...updatedVariantPrice[variantTitle],
          [name]: value,
        },
      };
    }
    if (
      updatedVariantPrice[variantTitle] !== undefined &&
      Object.values(updatedVariantPrice[variantTitle]).every(
        (property) => property === ""
      )
    ) {
      delete updatedVariantPrice[variantTitle];
    }
    setVariantPrice(updatedVariantPrice);
    // setPrice(updatedVariantPrice)
  };


  const handleAddVariant = () => {
    setVariants((prevVariants) => [...prevVariants, { title: '', type: [] }]);
  };

  const handleRemoveVariant = (variantIndex, variantTitle) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(variantIndex, 1);
    let updateVariantPrice = { ...variantPrice }
    if (updateVariantPrice[variantTitle] !== undefined) {
      // console.log("calling from outside of the objct function")
      Object.keys(updateVariantPrice[variantTitle]).map((key) => {
        removeDiscountNetValue(key, true)
      })
      delete updateVariantPrice[variantTitle]
      setVariantPrice(updateVariantPrice)
      // setPrice(updateVariantPrice)
    }
    setVariants(updatedVariants);
  };

  const handleTypeChange = (event, variantIndex, typeIndex) => {
    const updatedVariants = [...variants];
    console.log(updatedVariants)
    updatedVariants[variantIndex].type[typeIndex] = { variant: event.target.value };
    setVariants(updatedVariants);
  };

  const handleAddType = (variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].type.push('');
    setVariants(updatedVariants);
  };

  const handleRemoveType = (variantIndex, variantTitle, type, typeIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].type.splice(typeIndex, 1);
    let updateVariantPrice = { ...variantPrice };
    console.log(updateVariantPrice[variantTitle])
    if (updateVariantPrice[variantTitle] !== undefined) {
      removeDiscountNetValue(type, false)
      delete updateVariantPrice[variantTitle][type]
      setVariantPrice(updateVariantPrice)
      // setPrice(updateVariantPrice)
    }
    setVariants(updatedVariants);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataAPI = new FormData()
    formData.map((each) => {
      formDataAPI.append("file", each)
    })
    let updatedVariants = variants.map((variant, index) => {
      if (variantPrice[variant.title] != undefined) {
        let newVariant = Object.values(variant.type).map((eachValues, valueIndex) => {
          return { ...eachValues, discount: Number(discount[eachValues.variant]), netPrice: Number(netValue[eachValues.variant]), price: Number(variantPrice[variant.title]?.[eachValues.variant]) }
        })
        return { ...variant, type: newVariant }
      }
      return variant
    })

    formDataAPI.append("body", JSON.stringify({
      productName: productName,
      brandName: brandName,
      description: moreDetails,
      category: category,
      price: Number(price),
      specifications: specifications,
      variant: updatedVariants,
      discount: Number(discount),
      netPrice: Number(netValue)
    }))
    const res = await fetch("http://localhost:3000/api/add-products", {
      method: "POST",
      body: formDataAPI,
    });
    const result = await res.json()
    if (result.status === 200) {
      router.replace("/administrator/admin/product-managment")
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    const imageArray = Array.from(fileList).map((file) => URL.createObjectURL(file));
    setFormData((prevFormData) => [...prevFormData, ...fileList])
    setImages((prevImages) => [...prevImages, ...imageArray]);

  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const addedBrands = ["realme", "xiaomi", "redmi", "samsung", "apple"];
  const categoryOptions = ["mobile", "electronic", "clothes", "kitchen"];
  const defaultVariants = {
    mobile: [
      { title: "storage", type: [{ variant: "6GB + 128GB" }, { variant: "8GB + 256 GB" }] },
      { title: "color", type: [{ variant: "red" }, { variant: "blue" }, { variant: "black" }] },
    ],
    electronic: [
      { title: "wattage", type: ["100W", "200W", "300W"] },
      { title: "color", type: ["silver", "black"] },
    ],
    clothes: [
      { title: "size", type: ["S", "M", "L", "XL"] },
      { title: "color", type: ["white", "blue", "black"] },
    ],
    kitchen: [
      { title: "material", type: ["plastic", "metal"] },
      { title: "color", type: ["red", "green"] },
    ],
  };

  return (
    <div className={styles.add_product_page}>
      <form id="productInfo" className={styles.all_product_info} onSubmit={handleSubmit}>
        <div className={styles.group_1}>
          <label className={styles.product_name}>
            Product Name
            <div>
              <input type="text" value={productName} onChange={handleProductNameChange} placeholder='Product name (Not more than 50 characters)' maxLength={50} />
            </div>
          </label>
          <div className={styles.display_grid}>
            <label className={styles.brand_name}>
              Brand Name
              <select value={brandName} onChange={handleBrandNameChange}>
                <option value="">Select Brand</option>
                {addedBrands.map((brand, index) => (
                  <option key={`brand-${index}`} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.product_category}>
              Category
              <select value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {categoryOptions.map((option, index) => (
                  <option key={`category-${index}`} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.variant_container}>
            <label className={styles.variant_label}>Variants</label>
            {variants.map((variant, variantIndex) => (
              <div key={`variant-${variantIndex}`} className={styles.variant_item}>
                <div className={styles.light_grey} >Title</div>
                <input
                  type="text"
                  placeholder="Variant title"
                  value={variant.title}
                  onChange={(event) => handleVariantChange(event, variantIndex)}
                />
                <button
                  style={{ marginRight: "10px" }}
                  type="button"
                  onClick={() => handleRemoveVariant(variantIndex, variant.title)}
                >
                  Remove Variant
                </button>
                <div className={styles.light_grey} >Types</div>
                {variant.type.map((type, typeIndex) => (
                  <div key={`type-${variantIndex}-${typeIndex}`} className={styles.variant_type}>
                    <input
                      type="text"
                      placeholder="Type"
                      value={type.variant}
                      onChange={(event) => handleTypeChange(event, variantIndex, typeIndex)}
                    />
                    <input
                      name={type.variant}
                      type="text"
                      placeholder="Variant Price"
                      value={variantPrice[variant.title] !== undefined ? variantPrice[variant.title][type] : ""}
                      onChange={(event) => handleVariantPrice(event, variant.title)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveType(variantIndex, variant.title, type, typeIndex)}
                    >
                      <RxCross1 />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddType(variantIndex)}>
                  Add Type
                </button>

              </div>
            ))}
            <div>
              <button type="button" onClick={handleAddVariant}>
                Add Variants
              </button>
            </div>
          </div>
          <div className={styles.subgroup1_3}>
            <label className={styles.specification_label}>Specifications</label>
            {specifications.map((specification, index) => (
              <div key={`specification-${index}`} className={styles.specification_item}>
                <input
                  style={{ marginRight: "10px" }}
                  type="text"
                  value={specification}
                  onChange={(event) => handleSpecificationChange(event, index)}
                />
                <button style={{ margin: '0' }} type="button" onClick={() => handleRemoveSpecification(index)}>
                  <RxCross1 />
                </button>
              </div>
            ))}
            <button style={{ margin: "0", width: "max-content" }} type="button" onClick={handleAddSpecification}>
              Add Specification
            </button>
            <div>
              <label className={styles.more_details}>
                More Details
                <div>
                  <textarea value={moreDetails} onChange={handleMoreDetailsChange} rows={20} cols={51} />
                </div>
              </label>
            </div>

          </div>
        </div>
        <div className={styles.group_2}>
          Images
          {/* <div  > */}
          <div className={styles.image_preview} >
            {images.map((image, index) => (
              <div key={`image-${index}`}>
                <Image width={200} height={200} src={image} alt={`Product ${index}`} className={styles.product_image} />
                <button className={styles.remove_image} type="button" onClick={() => handleRemoveImage(index)}>
                  <RxCross1 />
                </button>
              </div>
            ))}
            <label className={styles.product_images}>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={styles.image_drop_area}
              >
                <CiImageOn style={{ fontSize: "2.5rem" }} />
                Drag and Drop or click to add images
                <input
                  name='images'
                  type="file"
                  multiple
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
            </label>
          </div>
          {/* </div> */}
          <div className={styles.subgroup1_2} >
            {!Object.keys(variantPrice).length || !Object.values(variantPrice).length ?
              <div>
                <label className={styles.product_price}>
                  <p>Price (₹)</p>
                  <input type="text" value={price} onChange={handlePriceChange} inputMode="numeric" pattern="[0-9]*" />
                </label>
                <label className={styles.product_discount}>
                  <p>Discount (%)</p>
                  <input type="text" value={discount} onChange={handleDiscountChange} inputMode="numeric" pattern="[0-9]*" />

                </label>
                <label className={styles.product_discount}>
                  <p>Net Value (₹) </p>
                  <input type="Text" disabled value={netValue} />
                </label>
              </div>
              :
              <>
                {Object.values(variantPrice).map((value, valueIndex) => {
                  return Object.keys(value).map((key, eachValueIndex) => {
                    return <div key={eachValueIndex} >
                      <label>
                        <p>Price ₹(Variant)</p>
                        <input type='text' value={`${value[key]}(${key})`} disabled />
                      </label>
                      <label className={styles.product_discount}>
                        <p>Discount (%)</p>
                        <input type="text" name={key} value={discount[key] || ""} onChange={handleVariantDiscountChange} inputMode="numeric" pattern="[0-9]*" />
                      </label>
                      <label className={styles.product_discount}>
                        <p>Net Value (₹) </p>
                        <input type="Text" disabled value={netValue[key] || ""} />
                      </label>
                    </div>
                  })
                })}
              </>
            }
          </div>
          <button className={styles.add_product_button} type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
