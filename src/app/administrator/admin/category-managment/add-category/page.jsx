"use client"
import React, { useState } from 'react';
import styles from "@/Styles/CategoryManagment.module.css"
import { ImCircleUp } from 'react-icons/im'


const AddCategory = () => {
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newBrand, setNewBrand] = useState('');
  const [newVariantTitle, setNewVariantTitle] = useState('');
  const [newVariantType, setNewVariantType] = useState('');
  const [newTag, setNewTag] = useState('');
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

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
    setNewTag(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory !== '') {
      const newCategoryObj = {
        name: newCategory,
        brands: [],
        variants: [],
        tags: []
      };
      setCategories([...categories, newCategoryObj]);
      setNewCategory('');
    }
  };

  const handleAddBrand = () => {
    if (selectedCategory !== null && newBrand !== '') {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      selectedCategoryObj.brands.push(newBrand);
      setCategories(updatedCategories);
      setNewBrand('');
    }
  };

  const handleAddVariant = () => {
    if (selectedCategory !== null && newVariantTitle !== '' && newVariantType !== '') {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];

      // Check if the variant with the same title already exists
      const existingVariant = selectedCategoryObj.variants.find(variant => variant.title === newVariantTitle);
      if (existingVariant) {
        // If the variant exists, add the new type to it
        existingVariant.types.push(newVariantType);
      } else {
        // If the variant does not exist, create a new variant
        const newVariantObj = {
          title: newVariantTitle,
          types: [newVariantType]
        };
        selectedCategoryObj.variants.push(newVariantObj);
      }

      setCategories(updatedCategories);
      setNewVariantType('');
    }
  };


  const handleAddTag = () => {
    if (selectedCategory !== null && newTag !== '') {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      selectedCategoryObj.tags.push(newTag);
      setCategories(updatedCategories);
      setNewTag('');
    }
  };

  const handleRemoveBrand = (brandToRemove) => {
    if (selectedCategory !== null) {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      selectedCategoryObj.brands = selectedCategoryObj.brands.filter((brand) => brand !== brandToRemove);
      setCategories(updatedCategories);
    }
  };

  const handleRemoveVariantType = (variantIndex, typeIndex) => {
    if (selectedCategory !== null) {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      if (selectedCategoryObj.variants.length > variantIndex) {
        const selectedVariantObj = selectedCategoryObj.variants[variantIndex];
        selectedVariantObj.types.splice(typeIndex, 1);
        if (selectedVariantObj.types.length === 0) {
          selectedCategoryObj.variants.splice(variantIndex, 1);
        }
      }
      setCategories(updatedCategories);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    if (selectedCategory !== null) {
      const updatedCategories = [...categories];
      const selectedCategoryObj = updatedCategories[selectedCategory];
      selectedCategoryObj.tags = selectedCategoryObj.tags.filter((tag) => tag !== tagToRemove);
      setCategories(updatedCategories);
    }
  };

  const handleRemoveCategory = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(categoryIndex, 1);
    setCategories(updatedCategories);
    setNewVariantTitle("")
    setSelectedCategory(null);
  };

  const handleCategorySelect = (e) => {
    const categoryIndex = parseInt(e.target.value);
    setNewVariantTitle("")
    setSelectedCategory(categoryIndex);
  };

  const handleSubmit = () => {

  }

  const renderCategoryOptions = () => {
    return categories.map((category, index) => (
      <option key={index} value={index}>
        {category.name}
      </option>
    ));
  };

  // const renderBrands = () => {
  //   if (selectedCategory !== null && categories[selectedCategory] !== undefined) {
  //     const selectedCategoryObj = categories[selectedCategory];
  //     return selectedCategoryObj.brands.map((brand, brandIndex) => (
  //       <li key={brandIndex}>
  //         {brand}
  //         <button onClick={() => handleRemoveBrand(brand)}>Remove</button>
  //       </li>
  //     ));
  //   }
  //   return null;
  // };

  // const renderVariants = () => {
  //   if (selectedCategory !== null && categories[selectedCategory] !== undefined) {
  //     const selectedCategoryObj = categories[selectedCategory];
  //     return selectedCategoryObj.variants.map((variant, variantIndex) => (
  //       <li key={variantIndex}>
  //         {variant.title}
  //         <ul>
  //           {variant.types.map((type, typeIndex) => (
  //             <li key={typeIndex}>
  //               {type}
  //               <button onClick={() => handleRemoveVariantType(variantIndex, typeIndex)}>Remove</button>
  //             </li>
  //           ))}
  //         </ul>
  //       </li>
  //     ));
  //   }
  //   return null;
  // };

  // const renderTags = () => {
  //   if (selectedCategory !== null && categories[selectedCategory] !== undefined) {
  //     const selectedCategoryObj = categories[selectedCategory];
  //     return selectedCategoryObj.tags.map((tag, tagIndex) => (
  //       <li key={tagIndex}>
  //         {tag}
  //         <button onClick={() => handleRemoveTag(tag)}>Remove</button>
  //       </li>
  //     ));
  //   }
  //   return null;
  // };

  const renderPreview = () => {
    if (selectedCategory !== null && categories[selectedCategory] !== undefined) {
      const selectedCategoryObj = categories[selectedCategory];
      return (
        <div className={styles.row_preview} >
          <label>
           <ImCircleUp className={styles.list_style} /> Category
          </label>
          <p>
            {selectedCategoryObj.name}
          </p>
          <label>
          <ImCircleUp className={styles.list_style} /> Brands
          </label>

          {selectedCategoryObj.brands.map((brand, index) => {
            return (<div key={index} >
              <span>{brand}</span>
              <button onClick={() => handleRemoveBrand(brand)}>Remove</button>
            </div>)
          })}<br />

          <label>
          <ImCircleUp className={styles.list_style} /> Variants
          </label>
          <ul>
            {selectedCategoryObj.variants.map((variant, variantIndex) => (
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
                {variant.types.map((type, index) => {
                  return (<div key={index} >
                    <span>{type}</span>
                    <button onClick={() => handleRemoveVariantType(variantIndex, index)}>Remove</button>
                  </div>)
                })}
              </li>
            ))}
          </ul>
          <label>
          <ImCircleUp className={styles.list_style} /> Tags
          </label>
           {selectedCategoryObj.tags.map((tag, index) => {
            return (<div key={index} >
              <span>{tag}</span>
              <button onClick={() => handleRemoveTag(tag)}>Remove</button>
            </div>)
          })}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.add_category_page} >
      <div className={styles.add_category_container}>
        <div className={styles.add_category} >
          <label>Category Name</label>
          <input type="text" value={newCategory} onChange={handleCategoryChange} />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>

        <div className={styles.select_category} >
          <label>Select Category</label>
          <select value={selectedCategory} onChange={handleCategorySelect}>
            <option value="">-- Select Category --</option>
            {renderCategoryOptions()}
          </select>
        </div>

        {selectedCategory !== null && categories[selectedCategory] !== undefined && (
          <div  >
            <div className={styles.add_brand} >
              <div>
                <label>Brands for </label>{categories[selectedCategory].name}
              </div>
              {/* <ul>{renderBrands()}</ul> */}
              <div>
                <input type="text" value={newBrand} onChange={handleBrandChange} />
                <button onClick={handleAddBrand}>Add Brand</button>
              </div>
            </div>

            <div className={styles.add_variant} >
              <div>
                <label>Variant for </label>{categories[selectedCategory].name}
              </div>
              {/* <ul>{renderVariants()}</ul> */}
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={newVariantTitle}
                  onChange={handleVariantTitleChange}
                />
                <input
                  type="text"
                  placeholder="Type"
                  value={newVariantType}
                  onChange={handleVariantTypeChange}
                />
                <button onClick={handleAddVariant}>Add Variant</button>
              </div>
            </div>

            <div className={styles.add_tags} >
              <div>
                <label>Tag for </label>{categories[selectedCategory].name}
              </div>
              {/* <ul>{renderTags()}</ul> */}
              <div>
                <input type="text" placeholder="Tag" value={newTag} onChange={handleTagChange} />
                <button onClick={handleAddTag}>Add Tag</button>
              </div>
            </div>
            <div className={styles.remove_category} >
              <button onClick={() => handleRemoveCategory(selectedCategory)}>Remove Category</button>
            </div>
          </div>
        )
        }
        {renderPreview()}
      </div>
    </div>
  );
};

export default AddCategory;
