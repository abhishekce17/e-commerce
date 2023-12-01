import filterStyle from "@/Styles/filter.module.css"


const FilterComponent = ({ categoryInfo, setFilterByBrand, category, setFilterByTags }) => {
  const filter = (brand, tags) => {
    if (brand !== undefined) {
      setFilterByBrand(prev => {
        if (prev.some(x => x == brand)) {
          return prev.filter(x => x !== brand);
        }
        return [...prev, brand]
      });
      console.log(categoryInfo);
    }
    if (tags !== undefined) {
      setFilterByTags(prev => {
        if (prev.some(x => x == tags)) {
          return prev.filter(x => x !== tags);
        }
        return [...prev, tags];
      });
    }
  }

  return (
    <div className={filterStyle.filter_container} >
      {/* <div className={filterStyle.sort_container}>
        <p>Sort</p>
        <select>
          <option>Sort By</option>
          <option>Price - Low to High</option>
          <option>Price - High to Low</option>
          <option>Price - Top Rated</option>
        </select>
      </div> */}
      <div className={filterStyle.category} >
        <p>Category</p>
        <p>{category}</p>
      </div>
      {categoryInfo?.categoryBrands.length &&
        <div className={filterStyle.brand} >
          <p>Brands</p>
          {
            categoryInfo.categoryBrands?.map((brand, index) => {
              return (
                <div key={brand + index} >
                  <input id={brand + index} onClick={() => { filter(brand, undefined) }} type="checkbox" />
                  <label htmlFor={brand + index} > {brand}</label>
                </div>

              )
            })
          }
        </div>}
      {/* <div className={filterStyle.range} >
        <p>Price Range</p>
        <p>Under ₹1000</p>
        <p>₹1000 - ₹5000</p>
        <p>₹5000 - ₹10000</p>
        <p>₹10000 - ₹20000</p>
        <p>Over ₹20000</p>
        <div>
          <input type="text" placeholder="₹ Min" pattern="[0-9]*" />
          <input type="text" placeholder="₹ Max" pattern="[0-9]*" />
          <button>Filter</button>
        </div>
      </div>
      <div className={filterStyle.rating} >
        <p>Cutomer Ratings</p>
        <p data-value="4" >★★★★☆ & above</p>
        <p data-value="3" >★★★☆☆ & above</p>
        <p data-value="2" >★★☆☆☆ & above</p>
        <p data-value="1" >★☆☆☆☆ & above</p>
      </div> */}
      <div className={filterStyle.tags} >
        <p>Tags</p>
        {
          categoryInfo?.filterTags.map((tag, index) => {
            return (
              <div key={"tag" + index} className={filterStyle.eachTag} >
                <input onChange={() => { filter(undefined, tag) }} id={"tag" + index} type="checkbox" key={`brand-${index}`} value={tag} />
                <label htmlFor={"tag" + index} > {tag}</label>
              </div>
            )
          })
        }
      </div>
    </div>

  )
}

export default FilterComponent