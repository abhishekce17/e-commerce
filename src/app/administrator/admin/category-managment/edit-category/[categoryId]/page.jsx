"use client"
import React, {useEffect, useState} from 'react';
import styles from "@/Styles/CategoryManagment.module.css"
import {ImCircleUp} from 'react-icons/im'
import {useRouter} from 'next/navigation';
import Loading from '../../../loading';
import {notify} from '@/JS/notify';


const AddCategory = ({params}) => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [newBrand, setNewBrand] = useState('');
  const [newVariantTitle, setNewVariantTitle] = useState('');
  const [newVariantType, setNewVariantType] = useState('');
  const [newTag, setNewTag] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModeOn, setIsEditModeOn] = useState(false)

  // const handleCategoryChange = (e) => {
  //   setNewCategory(e.target.value);
  // };


  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch("/api/AdminCategories/QueryCategory/" + params.categoryId)
      const result = await response.json()
      setCategories([result.data])
    }
    fetchCategory()
  }, [params.categoryId])

  const handleBrandChange = (e) => {
    setNewBrand(e.target.value);
  };

  const handleVariantTitleChange = (e) => {
    setNewVariantTitle(e.target.value);
  };

  const handleVariantTypeChange = (e) => {
    setNewVariantType(e.target.value);
  };

  const handleTagChange = (e) => {
    setNewTag(e.target.value.split(","));
  };

  const handleEditMode = () => {
    setIsEditModeOn(!isEditModeOn)
    if (isEditModeOn) {
      handleSubmit()
    }
  }


  const handleAddBrand = () => {
    if (selectedCategory !== null && newBrand !== '') {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      selectedCategoryObj.categoryBrands.push(newBrand);
      setCategories(updatedCategories);
      setNewBrand('');
    }
  };

  const handleAddVariant = () => {
    if (selectedCategory !== null && newVariantTitle !== '' && newVariantType !== '') {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];

      const existingVariant = selectedCategoryObj.defaultVariants.find(variant => variant.title === newVariantTitle);
      if (existingVariant) {
        existingVariant.type.push({variant: newVariantType});
      } else {
        const newVariantObj = {
          title: newVariantTitle,
          type: [{variant: newVariantType}]
        };
        selectedCategoryObj.defaultVariants.push(newVariantObj);
      }

      setCategories(updatedCategories);
      setNewVariantType('');
    }
  };


  const handleAddTag = () => {
    if (selectedCategory !== null && newTag.length) {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      console.log(newTag);
      selectedCategoryObj.filterTags = selectedCategoryObj.filterTags.concat(newTag);
      console.log(updatedCategories)
      setCategories(updatedCategories);
      setNewTag([]);
    }
  };

  const handleRemoveBrand = (brandToRemove) => {
    if (selectedCategory !== null) {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      selectedCategoryObj.categoryBrands = selectedCategoryObj.categoryBrands.filter((brand) => brand !== brandToRemove);
      setCategories(updatedCategories);
    }
  };

  const handleRemoveVariantType = (variantIndex, typeIndex) => {
    if (selectedCategory !== null) {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      if (selectedCategoryObj.defaultVariants.length > variantIndex) {
        const selectedVariantObj = selectedCategoryObj.defaultVariants[variantIndex];
        selectedVariantObj.type.splice(typeIndex, 1);
        if (selectedVariantObj.type.length === 0) {
          selectedCategoryObj.defaultVariants.splice(variantIndex, 1);
        }
      }
      setCategories(updatedCategories);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    if (selectedCategory !== null) {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      selectedCategoryObj.filterTags = selectedCategoryObj.filterTags.filter((tag) => tag !== tagToRemove);
      setCategories(updatedCategories);
    }
  };

  const handleRemoveCategory = async () => {
    const response = await fetch("/api/AdminCategories/DeleteCategory/" + params.categoryId)
    const result = await response.json()
    if (result.data.status === 200) {
      router.push("/administrator/admin/category-managment")
    }
  };


  const handleSubmit = async () => {
    const response = await fetch("/api/AdminCategories/UpdateCategory/" + params.categoryId, {
      method: "POST", body: JSON.stringify(categories[0])
    });
    const result = await response.json()
    if (result.status === 200) {
      notify("Changes saved", "success");
    }
  }


  const renderPreview = () => {
    const selectedCategoryObj = categories[selectedCategory];
    return (
      <div className={styles.row_preview} >
        <label>
          <ImCircleUp className={styles.list_style} /> Category
        </label>
        <p>
          {selectedCategoryObj.category}
        </p>
        <label>
          <ImCircleUp className={styles.list_style} /> Brands
        </label>

        {selectedCategoryObj.categoryBrands.map((brand, index) => {
          return (<div key={index} >
            <span>{brand}</span>
            {
              isEditModeOn &&
              <button onClick={() => handleRemoveBrand(brand)}>Remove</button>
            }
          </div>)
        })}<br />

        <label>
          <ImCircleUp className={styles.list_style} /> Variants
        </label>
        <ul>
          {selectedCategoryObj.defaultVariants.map((variant, variantIndex) => (
            <li key={variantIndex}>
              <label>
                <ImCircleUp className={styles.list_style} /> Title
              </label>
              <p>
                {variant.title}<br />
              </p>
              <label>
                <ImCircleUp className={styles.list_style} /> Type
              </label>
              {variant.type.map((type, index) => {
                return (<div key={index} >
                  <span>{type.variant}</span>
                  {
                    isEditModeOn &&
                    <button onClick={() => handleRemoveVariantType(variantIndex, index)}>Remove</button>
                  }
                </div>)
              })}
            </li>
          ))}
        </ul>
        <label>
          <ImCircleUp className={styles.list_style} /> Tags
        </label>
        {selectedCategoryObj.filterTags.map((tag, index) => {
          return (<div key={index} >
            <span>{tag}</span>
            {
              isEditModeOn &&
              <button onClick={() => handleRemoveTag(tag)}>Remove</button>
            }
          </div>)
        })}

        <button onClick={handleEditMode}>{!isEditModeOn ? "Edit" : "Save"}</button>
      </div>
    );
    return null;
  };

  return (
    <div className={styles.add_category_page} >
      {categories.length ?
        <div className={styles.add_category_container}>
          {selectedCategory !== null && (
            <div  >
              <div className={styles.add_brand} >
                <div>
                  <label>Brands for </label>{categories[selectedCategory].category}
                </div>
                <div>
                  <input disabled={!isEditModeOn} type="text" value={newBrand} onChange={handleBrandChange} />
                  {
                    isEditModeOn &&
                    <button onClick={handleAddBrand}>Add Brand</button>
                  }
                </div>
              </div>

              <div className={styles.add_variant} >
                <div>
                  <label>Variant for </label>{categories[selectedCategory].category}
                </div>
                <div>
                  <input disabled={!isEditModeOn}
                    type="text"
                    placeholder="Title"
                    value={newVariantTitle}
                    onChange={handleVariantTitleChange}
                  />
                  <input disabled={!isEditModeOn}
                    type="text"
                    placeholder="Type"
                    value={newVariantType}
                    onChange={handleVariantTypeChange}
                  />
                  {
                    isEditModeOn &&
                    <button onClick={handleAddVariant}>Add Variant</button>
                  }
                </div>
              </div>

              <div className={styles.add_tags} >
                <div>
                  <label>Tag for </label>{categories[selectedCategory].category}
                </div>
                <div>
                  <input disabled={!isEditModeOn} type="text" placeholder="Tag" value={newTag.toString()} onChange={handleTagChange} />
                  {
                    isEditModeOn &&
                    <button onClick={handleAddTag}>Add Tag</button>
                  }
                </div>
              </div>
              <div className={styles.remove_category} >
                {
                  isEditModeOn &&
                  <button onClick={() => handleRemoveCategory(selectedCategory)}>Remove Category</button>
                }
              </div>
            </div>
          )
          }
          {renderPreview()}
        </div>
        : Loading()
      }
    </div>
  );
};

export default AddCategory;
