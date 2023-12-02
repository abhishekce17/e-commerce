"use client"
import React, {useState, useRef} from 'react';
import styles from "@/Styles/ProductsManagment.module.css"
import {RxCross1} from 'react-icons/rx';
import {CiImageOn} from 'react-icons/ci';
import Image from 'next/image';

const AdminProdcutActionPage = ({FetchedProductDetails, editMode, handleUpdateProduct, handleAddProduct, handleDeleteProduct, revenueDetails, categories}) => {
    const [productName, setProductName] = useState(FetchedProductDetails?.productName || '');
    const [price, setPrice] = useState(FetchedProductDetails?.price || '');
    const [discount, setDiscount] = useState(FetchedProductDetails?.discount || "");
    // const [netValue, setNetValue] = useState(FetchedProductDetails?.netValue || "");
    const [images, setImages] = useState(FetchedProductDetails?.imgURLs || []);
    const [brandName, setBrandName] = useState(FetchedProductDetails?.brandName || '');
    const [category, setCategory] = useState(FetchedProductDetails?.category || '');
    const [specifications, setSpecifications] = useState(FetchedProductDetails?.specifications || ['']);
    const [moreDetails, setMoreDetails] = useState(FetchedProductDetails?.moreDetails || '');
    const [variants, setVariants] = useState(FetchedProductDetails?.variants || []);
    const fileInputRef = useRef(null);
    const [variantPrice, setVariantPrice] = useState(FetchedProductDetails?.variantPrice || {})
    const [formData, setFormData] = useState([])
    const [tagList, setTagList] = useState(FetchedProductDetails?.allTags || []);
    const [defaultVariants, setDefaultVariants] = useState(categories.filter(element => element.category === category).defaultVariants)

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    function renderRevenue(variantPrice) {
        return (
            <div className={styles.revenueContainer} >
                <div className={styles.subgroup1_2}  >
                    {!Object.keys(variantPrice).length || !Object.values(variantPrice).length ?
                        <div style={{gridTemplateColumns: "repeat(3, 1fr)"}} >
                            <label className={styles.product_discount}>
                                <p>Stock</p>
                                <input disabled type="text" value={revenueDetails.stock} onChange={handleDiscountChange} inputMode="numeric" pattern="[0-9]*" />

                            </label>
                            <label className={styles.product_discount}>
                                <p>Sold</p>
                                <input type="Text" disabled value={revenueDetails.sold} />
                            </label>
                            <label className={styles.product_discount}>
                                <p>Revenue (₹) </p>
                                <input type="Text" disabled value={revenueDetails.totalRevenue} />
                            </label>
                        </div>
                        :
                        <>
                            {/* //working here to populate revenue */}
                            {revenueDetails.variants.map((value, valueIndex) => {
                                return value.type.map((key, eachValueIndex) => {
                                    return <div key={eachValueIndex} style={{gridTemplateColumns: "repeat(4, 1fr)"}} >
                                        <label>
                                            <p>Variant</p>
                                            <input type='text' value={`${key.variant}`} disabled />
                                        </label>
                                        <label className={styles.product_discount}>
                                            <p>Stock</p>
                                            <input disabled={editMode} type="text" name={key} value={key.stock || "0"} onChange={handleVariantDiscountChange} inputMode="numeric" pattern="[0-9]*" />
                                        </label>
                                        <label className={styles.product_discount}>
                                            <p>Sold </p>
                                            <input type="Text" disabled value={key.sold || "0"} />
                                        </label>
                                        <label className={styles.product_discount}>
                                            <p>Revenue (₹) </p>
                                            <input type="Text" disabled value={key.revenue || "0"} />
                                        </label>
                                    </div>
                                })
                            })}
                        </>
                    }
                </div>
            </div>
        )
    }

    const removeDiscountNetValue = (type, variantRemoved) => {
        // let updatedNetValue = { ...netValue };
        let updatedDiscount = {...discount};

        delete updatedDiscount[type]; // Delete discount for the given type
        // delete updatedNetValue[type]; // Delete net value for the given type

        // setNetValue(updatedNetValue);
        setDiscount(updatedDiscount);
        console.log(variantPrice)
        if (variantRemoved) {
            setDiscount("");
            // setNetValue("");
        }
    };


    const handlePriceChange = (event) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
        setPrice(numericValue);
    };

    const handleDiscountChange = (event) => {
        const numericValue = event.target.value; // Filter out non-numeric characters
        setDiscount(numericValue);
        // const calculatedNetValue = price - (price * (numericValue / 100)); // Calculate net value
        // setNetValue(calculatedNetValue.toFixed(2)); // Set net value with 2 decimal places
    };

    const handleVariantDiscountChange = (event) => {
        const {name, value} = event.target;
        // const numericValue = event.target.value.replace(/[^0-9]/g, ''); // Filter out non-numeric characters

        if (typeof discount === 'object') {
            setDiscount((prev) => {
                return {...prev, [name]: value};
            });

            // const calculatedNetValue = Object.values(variantPrice).map((price) => {
            //     return price[name] !== undefined
            //         ? Number(price[name]) - Number(price[name]) * (numericValue / 100)
            //         : "";
            // });
            // setNetValue((prev) => {
            //     return { ...prev, [name]: calculatedNetValue.filter(x => typeof x === "number")[0] };
            // });
        } else {
            setDiscount({});
            // setNetValue({});
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
        console.log(categories)
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        setVariants(categories.filter(element => element.category === selectedCategory)[0]?.defaultVariants || []);
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
        const {name, value} = e.target;
        let updatedVariantPrice = {...variantPrice};
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
        setVariants((prevVariants) => [...prevVariants, {title: '', type: []}]);
    };

    const handleRemoveVariant = (variantIndex, variantTitle) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(variantIndex, 1);
        let updateVariantPrice = {...variantPrice}
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
        updatedVariants[variantIndex].type[typeIndex] = {variant: event.target.value};
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
        let updateVariantPrice = {...variantPrice};
        if (updateVariantPrice[variantTitle] !== undefined) {
            removeDiscountNetValue(type, false)
            delete updateVariantPrice[variantTitle][type]
            setVariantPrice(updateVariantPrice)
            // setPrice(updateVariantPrice)
        }
        setVariants(updatedVariants);
    };

    const handleTags = (e) => {
        const {value} = e.target;
        console.log(value);
        setTagList(prev => {
            if (prev.some(x => x == value)) {
                return prev.filter(x => x !== value);
            }
            return [...prev, value];
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataAPI = new FormData()
        formData.map((each) => {
            formDataAPI.append("file", each)
        })
        let updatedVariants = variants.map((variant, index) => {
            if (variantPrice[variant.title] != undefined) {
                let newVariant = Object.values(variant.type).map((eachValues, valueIndex) => {
                    return {...eachValues, discount: Number(discount[eachValues.variant]), price: Number(variantPrice[variant.title]?.[eachValues.variant])}
                })
                return {...variant, type: newVariant}
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
            variants: updatedVariants,
            discount: Number(discount),
            imgURLs: FetchedProductDetails?.imgURLs || [],
            allTags: tagList,
            averageRating: FetchedProductDetails?.averageRating || 0
        }))
        formDataAPI.append("categoryId", categories.filter(element => element.category === category)[0].categoryId)
        if (typeof editMode === "undefined" && typeof handleUpdateProduct === "undefined" && typeof handleAddProduct === "function") {
            handleAddProduct(formDataAPI)
        }
        else {
            console.log("Updating")
            handleUpdateProduct(formDataAPI)
        }
        // const res = await fetch("http://localhost:3000/api/add-products", {
        //     method: "POST",
        //     body: formDataAPI,
        // });
        // const result = await res.json()
        // if (result.status === 200) {
        //     router.replace("/administrator/admin/product-managment")
        // }
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


    return (
        <div className={styles.add_product_page}>
            <form id="productInfo" className={styles.all_product_info} onSubmit={handleSubmit}>
                <div className={styles.group_1}>
                    <label className={styles.product_name}>
                        Product Name
                        <div>
                            <input required={true} disabled={editMode} type="text" value={productName} onChange={handleProductNameChange} placeholder='Product name (Not more than 50 characters)' maxLength={50} />
                        </div>
                    </label>
                    <div className={styles.display_grid}>
                        <label className={styles.product_category}>
                            Category
                            <select disabled={editMode} value={category} onChange={handleCategoryChange}>
                                <option value="">Select Category</option>
                                {categories.map((option, index) => (
                                    <option key={`category-${index}`} value={option.category}>
                                        {option.category}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className={styles.brand_name}>
                            Brand Name
                            <select disabled={editMode} value={brandName} onChange={handleBrandNameChange}>
                                <option value="">Select Brand</option>
                                {category !== '' && categories.filter(cat => cat.category === category)[0].categoryBrands.map((brand, index) => (
                                    <option key={`brand-${index}`} value={brand}>
                                        {brand}
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
                                    disabled={editMode}
                                    type="text"
                                    placeholder="Variant title"
                                    value={variant.title}
                                    onChange={(event) => handleVariantChange(event, variantIndex)}
                                />
                                {!editMode &&
                                    <button
                                        style={{marginRight: "10px"}}
                                        type="button"
                                        onClick={() => handleRemoveVariant(variantIndex, variant.title)}
                                    >
                                        Remove Variant
                                    </button>}
                                <div className={styles.light_grey} >Types</div>
                                {variant.type.map((type, typeIndex) => (
                                    <div key={`type-${variantIndex}-${typeIndex}`} className={styles.variant_type} style={{marginBottom: "10px"}} >
                                        <input
                                            disabled={editMode}
                                            type="text"
                                            placeholder="Type"
                                            value={type.variant}
                                            onChange={(event) => handleTypeChange(event, variantIndex, typeIndex)}
                                        />
                                        <input
                                            disabled={editMode}
                                            name={type.variant}
                                            type="text"
                                            placeholder="Variant Price"
                                            value={variantPrice[variant.title] !== undefined ? variantPrice[variant.title][type.variant] : ""}
                                            onChange={(event) => handleVariantPrice(event, variant.title)}
                                        />
                                        {!editMode && <button
                                            type="button"
                                            onClick={() => handleRemoveType(variantIndex, variant.title, type, typeIndex)}
                                        >
                                            <RxCross1 />
                                        </button>}
                                    </div>
                                ))}
                                {!editMode && <button type="button" onClick={() => handleAddType(variantIndex)}>
                                    Add Type
                                </button>}

                            </div>
                        ))}
                        <div>
                            {!editMode && <button type="button" onClick={handleAddVariant}>
                                Add Variants
                            </button>}
                        </div>
                    </div>
                    <div className={styles.subgroup1_3}>
                        <label className={styles.specification_label}>Specifications</label>
                        {specifications.map((specification, index) => (
                            <div key={`specification-${index}`} className={styles.specification_item}>
                                <input
                                    disabled={editMode}
                                    style={{marginRight: "10px"}}
                                    type="text"
                                    value={specification}
                                    onChange={(event) => handleSpecificationChange(event, index)}
                                />
                                {!editMode && <button style={{margin: '0'}} type="button" onClick={() => handleRemoveSpecification(index)}>
                                    <RxCross1 />
                                </button>}
                            </div>
                        ))}
                        {
                            !editMode &&
                            <button style={{margin: "0", width: "max-content"}} type="button" onClick={handleAddSpecification}>
                                Add Specification
                            </button>
                        }
                        <div>
                            <label className={styles.more_details}>
                                More Details
                                <div>
                                    <textarea disabled={editMode} value={moreDetails} onChange={handleMoreDetailsChange} rows={20} />
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

                                {!editMode && <button className={styles.remove_image} type="button" onClick={() => handleRemoveImage(index)}>
                                    <RxCross1 />
                                </button>}
                            </div>
                        ))}
                        {
                            !editMode &&
                            <label className={styles.product_images}>
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    className={styles.image_drop_area}
                                >
                                    <CiImageOn style={{fontSize: "2.5rem"}} />
                                    Drag and Drop or click to add images
                                    <input
                                        name='images'
                                        type="file"
                                        multiple
                                        ref={fileInputRef}
                                        style={{display: 'none'}}
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </label>
                        }
                    </div>
                    {/* </div> */}
                    <div className={styles.subgroup1_2} >
                        {!Object.keys(variantPrice).length || !Object.values(variantPrice).length ?
                            <div>
                                <label className={styles.product_price}>
                                    <p>Price (₹)</p>
                                    <input disabled={editMode} type="text" value={price} onChange={handlePriceChange} inputMode="numeric" pattern="[0-9]*" />
                                </label>
                                <label className={styles.product_discount}>
                                    <p>Discount (%)</p>
                                    <input disabled={editMode} max={100} min={0} step="0.001" type="number" value={discount} onChange={handleDiscountChange} inputMode="numeric" pattern="[0-9]*" />

                                </label>
                                <label className={styles.product_discount}>
                                    <p>Net Value (₹) </p>
                                    <input type="Text" disabled value={price - (price * (discount / 100))} />
                                </label>
                            </div>
                            :
                            <>
                                {Object.values(variantPrice).map((value, valueIndex) => {
                                    return Object.keys(value).map((key, eachValueIndex) => {
                                        return (
                                            value[key] !== null &&
                                            <div key={eachValueIndex} >
                                                <label>
                                                    <p>Price ₹(Variant)</p>
                                                    <input type='text' value={`${value[key]}(${key})`} disabled />
                                                </label>
                                                <label className={styles.product_discount}>
                                                    <p>Discount (%)</p>
                                                    <input disabled={editMode} type="number" max={100} min={0} step="0.001" name={key} value={discount[key] || ""} onChange={handleVariantDiscountChange} inputMode="numeric" pattern="[0-9]*" />
                                                </label>
                                                <label className={styles.product_discount}>
                                                    <p>Net Value (₹) </p>
                                                    <input type="Text" disabled value={Number(value[key]) - Number((value[key]) * (discount[key] / 100)) || ""} />
                                                </label>
                                            </div>)
                                    })
                                })}
                            </>
                        }
                    </div>
                    {category !== '' && <div className={styles.allTags} >
                        <p>Tags</p>
                        <div>
                            {categories.filter(cat => cat.category === category)[0].filterTags.map((tag, index) => (
                                <div key={"tag" + index} className={styles.eachTag} >
                                    <input disabled={editMode} checked={FetchedProductDetails?.allTags.some(x => x === tag)} onChange={handleTags} id={"tag" + index} type="checkbox" key={`brand-${index}`} value={tag} />
                                    <label htmlFor={"tag" + index} >{tag}</label>
                                </div>
                            ))}
                        </div>
                    </div>}
                    {typeof editMode === "boolean" && typeof handleUpdateProduct === "function" &&
                        <>
                            <button className={styles.add_product_button} type="submit" > {editMode ? "Edit Product" : "Save Product"}</button>
                            <button className={styles.add_product_button} style={{background: "#ff4545"}} onClick={handleDeleteProduct} type="button" > Delete Product </button>
                            {
                                renderRevenue(variantPrice)
                            }
                        </>
                    }
                    {typeof editMode === "undefined" && typeof handleUpdateProduct === "undefined" &&
                        <button className={styles.add_product_button} type="submit"> Add Product </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default AdminProdcutActionPage;
