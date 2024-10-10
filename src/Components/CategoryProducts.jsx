"use client"
import extractMinimumNetValue from '@/utils/ExtractMinimumNetValue';
import React, { useState } from 'react'
import FilterComponent from './FilterComponent';
import { ProductCard } from './ProductCard';

function CategoryProducts({ products, categoryInfo }) {
    const [filterByBrand, setFilterByBrand] = useState([]);
    const [filterByTags, setFilterByTags] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState(products);

    const applyFilter = () => {
        if (filterByBrand.length) {
            setCategoryProducts(products.filter(x => filterByBrand.includes(x.brandName)))
        }
        if (filterByTags.length) {
            setCategoryProducts(products.filter(x => x.allTags?.some(y => filterByTags.includes(y))))
        }
        else {
            setCategoryProducts(products);
        }
    }

    return (
        <div className="flex flex-col sm:flex-row sm:gap-5 mb-4 relative p-2" data-listing="true" >
            <FilterComponent
                setFilterByTags={setFilterByTags}
                category={categoryInfo[0]?.category}
                categoryInfo={categoryInfo[0]}
                setFilterByBrand={setFilterByBrand}
                applyFilter={applyFilter}
            />
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-2 gap-x-[4%] gap-y-7 py-2">
                {
                    categoryProducts.map((prop) => {
                        return (
                            <ProductCard
                                key={prop.productId}
                                productInfo={prop}
                                href={{ pathname: `/product/${prop.productId}`, query: { ...extractMinimumNetValue(prop.variants)?.obj || "" } }}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default CategoryProducts