import filterStyle from "@/Styles/filter.module.css"
import { PrimaryButton } from "./PrimaryButton";


const FilterComponent = ({ categoryInfo, setFilterByBrand, category, setFilterByTags, applyFilter }) => {
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
    <div className=" overflow-y-auto w-60 self-start sticky top-20" >
      <div>
        <h3 className="font-medium" >Category</h3>
        <h3>{category}</h3>
      </div>
      {categoryInfo?.categoryBrands.length &&
        <div>
          <h3 className="font-medium" >Brands</h3>
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
      <div>
        <h3 className="font-medium" >Tags</h3>
        {
          categoryInfo?.filterTags.map((tag, index) => {
            return (
              <div key={"tag" + index} >
                <input onChange={() => { filter(undefined, tag) }} id={"tag" + index} type="checkbox" key={`brand-${index}`} value={tag} />
                <label htmlFor={"tag" + index} > {tag}</label>
              </div>
            )
          })
        }
      </div>
      <PrimaryButton onClick={applyFilter} label="Apply" className="text-sm" />
    </div>

  )
}

export default FilterComponent