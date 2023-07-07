import filterStyle from "@/Styles/filter.module.css"


const FilterComponent = () => {
  return (
    <div className={filterStyle.filter_container} >
      <div className={filterStyle.sort_container}>
      <p>Sort</p>
        <select>
            <option>Sort By</option>
            <option>Price - Low to High</option>
            <option>Price - High to Low</option>
            <option>Price - Top Rated</option>
        </select>
      </div>
      <div className={filterStyle.category} >
        <p>Category</p>
        <p>Mobile</p>
      </div>
      <div className={filterStyle.brand} >
        <p>Brand</p>
        <div>
          <input type="checkbox"/>
          <span>Samsung</span>
        </div>
        <div>
          <input type="checkbox"/>
          <span>Xiomi</span>
        </div>
        <div>
          <input type="checkbox"/>
          <span>Vivo</span>
        </div>
        <div>
          <input type="checkbox"/>
          <span>Oppo</span>
        </div>
        <div>
          <input type="checkbox"/>
          <span>Apple</span>
        </div>
        <div>
          <input type="checkbox"/>
          <span>Realme</span>
        </div>
        <div>
          <input type="checkbox"/>
          <span>Oneplus</span>
        </div>
      </div>
      <div className={filterStyle.range} >
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
      </div>
    </div>

  )
}

export default FilterComponent