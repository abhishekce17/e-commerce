"use client"
import React, { useState, useRef } from "react";
import styles from "@/Styles/ProductsManagment.module.css"
import { RxCross1 } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";
import { RiAccountCircleFill, RiDeleteBin7Line } from "react-icons/ri";

const AddProductPage = () => {
    const [productName, setProductName] = useState("Nothing Phone");
    const [price, setPrice] = useState("1252");
    const [discount, setDiscount] = useState("57");
    const [netValue, setNetValue] = useState("45");
    const [images, setImages] = useState(["/category.jpg", "/category.jpg"]);
    const [brandName, setBrandName] = useState("redmi");
    const [category, setCategory] = useState("mobile");
    const [specifications, setSpecifications] = useState(["better display", "bogger battery"]);
    const [moreDetails, setMoreDetails] = useState("jalskdjfkdjfiod odofajldfadskjfd sdfoajsldkfja fjfaodjflkadjfal faklfjalskjdf asdfjldfja fajf lf");
    const [variants, setVariants] = useState([{ title: "color", type: ["white", "black"] }, {title : "storage", type:["6GB + 128GB", "8GB + 128GB"]}]);
    const fileInputRef = useRef(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditProduct = () => {
        setIsEditMode(!isEditMode);
    };


    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handlePriceChange = (event) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, ""); // Filter out non-numeric characters
        setPrice(numericValue);
    };

    const handleDiscountChange = (event) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, ""); // Filter out non-numeric characters
        setDiscount(numericValue);
        const calculatedNetValue = price - (price * (numericValue / 100)); // Calculate net value
        setNetValue(calculatedNetValue.toFixed(2)); // Set net value with 2 decimal places
    };


    const handleImageChange = (event) => {
        const fileList = event.target.files;
        const imageArray = Array.from(fileList).map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...imageArray]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
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
        setSpecifications((prevSpecifications) => [...prevSpecifications, ""]);
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

    const handleAddVariant = () => {
        setVariants((prevVariants) => [...prevVariants, { title: "", type: [] }]);
    };

    const handleRemoveVariant = (variantIndex) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(variantIndex, 1);
        setVariants(updatedVariants);
    };

    const handleTypeChange = (event, variantIndex, typeIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].type[typeIndex] = event.target.value;
        setVariants(updatedVariants);
    };

    const handleAddType = (variantIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].type.push("");
        setVariants(updatedVariants);
    };

    const handleRemoveType = (variantIndex, typeIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].type.splice(typeIndex, 1);
        setVariants(updatedVariants);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isEditMode) {
            console.log(variants);
        }
        // Submit logic goes here
        // You can access all the form values in the component"s state variables
        // e.g., productName, price, discount, images, brandName, category, specifications, moreDetails, variants
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const fileList = event.dataTransfer.files;
        const imageArray = Array.from(fileList).map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...imageArray]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const addedBrands = ["realme", "xiaomi", "redmi", "samsung", "apple"];
    const categoryOptions = ["mobile", "electronic", "clothes", "kitchen"];
    const defaultVariants = {
        mobile: [
            { title: "storage", type: ["6GB + 128GB", "8GB + 256 GB"] },
            { title: "color", type: ["red", "blue", "black"] },
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
            <form className={styles.all_product_info} onSubmit={handleSubmit}>
                <div className={styles.group_1}>
                    <label className={styles.product_name}>
                        Product Name
                        <div>
                            <input disabled={!isEditMode} type="text" value={productName} onChange={handleProductNameChange} placeholder="Product name (Not more than 50 characters)" maxLength={50} />
                        </div>
                    </label>
                    <div className={styles.display_grid}>
                        <label className={styles.brand_name}>
                            Brand Name
                            <select disabled={!isEditMode} value={brandName} onChange={handleBrandNameChange}>
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
                            <select disabled={!isEditMode} value={category} onChange={handleCategoryChange}>
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
                                    style={{ marginTop: "10px" }}
                                    disabled={!isEditMode}
                                    type="text"
                                    placeholder="Variant title"
                                    value={variant.title}
                                    onChange={(event) => handleVariantChange(event, variantIndex)}
                                />
                                {isEditMode &&
                                    <button
                                        style={{ marginRight: "10px" }}
                                        type="button"
                                        onClick={() => handleRemoveVariant(variantIndex)}
                                    >
                                        Remove Variant
                                    </button>
                                }
                                <div className={styles.light_grey} >Types</div>
                                {variant.type.map((type, typeIndex) => (
                                    <div key={`type-${variantIndex}-${typeIndex}`} className={styles.variant_type}>
                                        <input
                                            style={{ marginTop: "10px" }}
                                            disabled={!isEditMode}
                                            type="text"
                                            placeholder="Type"
                                            value={type}
                                            onChange={(event) => handleTypeChange(event, variantIndex, typeIndex)}
                                        />

                                        {isEditMode &&
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveType(variantIndex, typeIndex)}
                                            >
                                                <RxCross1 />
                                            </button>
                                        }
                                    </div>
                                ))}
                                {isEditMode &&

                                    <button type="button" onClick={() => handleAddType(variantIndex)}>
                                        Add Type
                                    </button>
                                }

                            </div>
                        ))}
                        <div>
                            {isEditMode &&

                                <button type="button" onClick={handleAddVariant}>
                                    Add Variants
                                </button>
                            }
                        </div>
                    </div>
                    <div className={styles.subgroup1_3}>
                        <label className={styles.specification_label}>Specifications</label>
                        {specifications.map((specification, index) => (
                            <div key={`specification-${index}`} className={styles.specification_item}>
                                <input
                                    disabled={!isEditMode}
                                    style={{ marginRight: "10px" }}
                                    type="text"
                                    value={specification}
                                    onChange={(event) => handleSpecificationChange(event, index)}
                                />
                                {isEditMode &&

                                    <button style={{ margin: "0" }} type="button" onClick={() => handleRemoveSpecification(index)}>
                                        <RxCross1 />
                                    </button>
                                }
                            </div>
                        ))}
                        {isEditMode &&

                            <button style={{ margin: "0", width: "max-content" }} type="button" onClick={handleAddSpecification}>
                                Add Specification
                            </button>
                        }
                        <div>
                            <label className={styles.more_details}>
                                More Details
                                <div>
                                    <textarea disabled={!isEditMode} value={moreDetails} onChange={handleMoreDetailsChange} rows={10} cols={54} />
                                </div>
                            </label>
                        </div>

                    </div>
                </div>
                <div className={styles.group_2}>
                    Images
                    <div className={styles.image_preview} >
                        {images.map((image, index) => (
                            <div key={`image-${index}`}>
                                <Image width={200} height={200} src={image} alt={`Product ${index}`} className={styles.product_image} />
                                {isEditMode &&

                                    <button className={styles.remove_image} type="button" onClick={() => handleRemoveImage(index)}>
                                        <RxCross1 />
                                    </button>
                                }
                            </div>
                        ))}
                        {isEditMode &&
                            <label className={styles.product_images}>
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    className={styles.image_drop_area}
                                >
                                    <CiImageOn style={{ fontSize: "2.5rem" }} />
                                    Drag and Drop or click to add images
                                    <input
                                        disabled={!isEditMode}
                                        type="file"
                                        multiple
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </label>
                        }
                    </div>
                    <div className={styles.subgroup1_2} >
                        <label className={styles.product_price}>
                            <p>Price (₹)</p>
                            <input disabled={!isEditMode} type="text" value={price} onChange={handlePriceChange} inputMode="numeric" pattern="[0-9]*" />

                        </label>
                        <label className={styles.product_discount}>
                            <p>Discount (%)</p>
                            <input disabled={!isEditMode} type="text" value={discount} onChange={handleDiscountChange} inputMode="numeric" pattern="[0-9]*" />

                        </label>
                        <label className={styles.product_discount}>
                            <p>Net Value (₹) </p>
                            <input disabled={!isEditMode} type="Text" value={netValue} />
                        </label>
                    </div>
                    <button className={styles.add_product_button} type="submit" onClick={handleEditProduct}>
                        {isEditMode ? "Save Product" : "Edit Product"}
                    </button>
                    <div className={styles.subgroup2_2} >
                        <label className={styles.product_sold}>
                            <p>Sold</p>
                            <input disabled type="text" value={price} onChange={handlePriceChange} inputMode="numeric" pattern="[0-9]*" />

                        </label>
                        <label className={styles.product_stock}>
                            <p>Stock</p>
                            <input disabled type="text" value={discount} onChange={handleDiscountChange} inputMode="numeric" pattern="[0-9]*" />

                        </label>
                        <label className={styles.product_revenue}>
                            <p>Revenue (₹)</p>
                            <input disabled type="Text" value={netValue} />
                        </label>
                    </div>
                </div>
                <div className={styles.group_3} >
                    <div className={styles.customer_review_ratings} >
                        <p>Ratings and reviews</p>
                        <div className={styles.each_review} >
                            <div className={styles.profile} >
                                <div> <RiAccountCircleFill /> </div>
                                <p>Consumer Name</p>
                                <RiDeleteBin7Line style={{ marginLeft:"20px",cursor:"pointer" ,fontSize:"1.2rem"}} />
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
                                <RiDeleteBin7Line style={{ marginLeft:"20px",cursor:"pointer" ,fontSize:"1.2rem"}} />
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
                                <RiDeleteBin7Line style={{ marginLeft:"20px",cursor:"pointer" ,fontSize:"1.2rem"}} />
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
                                <RiDeleteBin7Line style={{ marginLeft:"20px",cursor:"pointer" ,fontSize:"1.2rem"}} />
                            </div>
                            <div className={styles.rating_details} >
                                <p>★★★★☆ <span>4</span> </p>
                                <p>timeline</p>
                                <p>greatest phone all over the wolrd i have seen till now kdsfkajdf dfkhkajdfhakdjf adfjhakdfj</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;
