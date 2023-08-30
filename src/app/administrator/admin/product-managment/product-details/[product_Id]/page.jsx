"use client"
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Loading from '../../../loading';
import AdminProdcutActionPage from '@/Components/AdminProductAction';

const Page = ({ params }) => {

    function extractValues(value, variant) {
        const extractedValues = {};
        for (const item of variant) {
            for (const variantType of item.type) {
                const variantName = variantType.variant;
                const titleValue = variantType[value];
                if (titleValue !== undefined) {
                    if (value !== 'price') {
                        extractedValues[variantName] = titleValue;
                    } else {
                        extractedValues[item.title] = { ...extractedValues[item.title], [variantName]: titleValue };
                    }
                }
            }
        }
        return extractedValues;
    }

    const [revenueDetails, setRevenueDetails] = useState(null);
    const [editMode, setEditMode] = useState(true);
    const [productDetails, setProductDetails] = useState(null);
    const [categories, setCategories] = useState(null);

    const { product_Id } = params;

    async function updateProduct(formDataAPI) {
        if (!editMode) {
            formDataAPI.append('productId', product_Id);
            const res = await fetch(`/api/update-products`, {
                method: 'POST',
                body: formDataAPI,
            });
            const result = await res.json();
            if (result.status === 200) {
                // router.replace(`/administrator/admin/product-managment/product-details/${product_Id}`);
            }
        }
    }

    const handleUpdateProduct = (formDataAPI) => {
        if (!productDetails?.dealProduct) {
            setEditMode(!editMode);
            updateProduct(formDataAPI);
        } else {
            window.alert("Please Remove the Product from deals page before updating")
        }
    };

    const handleDeleteProduct = async () => {
        console.log(product_Id);
    };

    async function fetchRevenueDetails() {
        const res = await fetch(`/api/FetchRevenue/${product_Id}`);
        const result = await res.json();
        if (result.status === 200) {
            setRevenueDetails(result.data[0]);
        }
    }

    async function fetchDetails() {
        const res = await fetch(`/api/product-details/${product_Id}`, {
            method: 'GET',
        });
        const result = await res.json();
        if (result.status === 200) {
            const extractedValues = extractValues('discount', result.data.variants);
            setProductDetails({
                dealProduct: result.data.dealProduct,
                productName: result.data.productName,
                brandName: result.data.brandName,
                moreDetails: result.data.description,
                category: result.data.category,
                price: result.data.price,
                specifications: result.data.specifications,
                variants: result.data.variants,
                discount: result.data.discount || extractedValues,
                imgURLs: result.data.imgURLs,
                variantPrice: result.data.netPrice === undefined && extractValues('price', result.data.variants),
                averageRating: result.data.averageRating,
            });
            console.log(result.data.brandName);
        } else if (result.status === 404) {
            setProductDetails(404);
        }
        // else if (result.status === 500) {
        //     //server error page
        // }
    }

    async function fetchCategories() {
        const response = await fetch('/api/AdminCategories/FetchCategories');
        const resultData = await response.json();
        setCategories(resultData.data);
    }

    useEffect(() => {
        fetchDetails();
        fetchRevenueDetails();
        fetchCategories();
    }, [product_Id]);

    return (
        <>
            {productDetails !== null && revenueDetails !== null && categories !== null ? (
                <>
                    {productDetails === 404 ? (
                        notFound()
                    ) : (
                        <div>
                            <AdminProdcutActionPage
                                FetchedProductDetails={productDetails}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                handleUpdateProduct={handleUpdateProduct}
                                handleDeleteProduct={handleDeleteProduct}
                                productId={product_Id}
                                revenueDetails={revenueDetails}
                                categories={categories}
                            />
                        </div>
                    )}
                </>
            ) : (
                Loading()
            )}
        </>
    );
};

export default Page;
