import { FaAngleRight } from "react-icons/fa";
import { PrimaryButton } from "./PrimaryButton";
import { useState } from "react";


const FilterComponent = ({ categoryInfo, setFilterByBrand, category, setFilterByTags, applyFilter }) => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const filter = (brand, tags) => {
    if (brand !== undefined) {
      setFilterByBrand(prev => {
        if (prev.some(x => x == brand)) {
          return prev.filter(x => x !== brand);
        }
        return [...prev, brand]
      });
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
    <div className=" overflow-y-auto sm:w-max self-start sm:sticky top-20 bg-white rounded p-2 shadow-sm w-full min-w-max" >
      <div className="rounded relative" >
        <div className="absolute sm:hidden h-full w-full" onClick={() => setToggleFilter(prev => !prev)} ></div>
        <h3 className="font-medium hidden sm:block" >Category</h3>
        <h3>{category}</h3>
        <FaAngleRight className={`absolute right-0 top-2 sm:hidden ${toggleFilter ? "rotate-90" : "rotate-0"}`} />
      </div>
      <div className={`${toggleFilter ? "max-h-screen border-t mt-2" : "max-h-0 border-none m-0"} sm:max-h-max transition-all duration-300 ease-in-out overflow-hidden sm:overflow- `} >
        {categoryInfo?.categoryBrands.length &&
          <div>
            <h3 className="font-medium" >Brands</h3>
            {
              categoryInfo.categoryBrands?.map((brand, index) => {
                return (
                  <div key={brand + index} className="w-max" >
                    <input id={brand + index} onClick={() => { filter(brand, undefined) }} type="checkbox" />
                    <label htmlFor={brand + index} > {brand}</label>
                  </div>

                )
              })
            }
          </div>}
        <div>
          <h3 className="font-medium" >Tags</h3>
          {
            categoryInfo?.filterTags.map((tag, index) => {
              return (
                <div key={"tag" + index} className="w-max" >
                  <input onChange={() => { filter(undefined, tag) }} id={"tag" + index} type="checkbox" key={`brand-${index}`} value={tag} />
                  <label htmlFor={"tag" + index} > {tag}</label>
                </div>
              )
            })
          }
        </div>
        <PrimaryButton onClick={applyFilter} label="Apply" className="text-sm w-full" />
      </div>
    </div>

  )
}

export default FilterComponent