"use server";

import { addDoc, collection, doc, increment, runTransaction } from "firebase/firestore";
import { userValidation } from "./userValidation";
import { db } from "@/config/firebase-config";
import _ from "lodash";

// Helper to check if product is in stock based on variant
const isProductInStock = async ({ variants, selectedVariant }) => {
    const selectedKeys = Object.keys(selectedVariant);

    return variants?.some(variant =>
        selectedKeys.includes(variant.title) &&
        variant.type.some(x =>
            x.price &&
            x.variant === selectedVariant[variant.title] &&
            x.stock > 10
        )
    );
};

export const confirmOrder = async ({ buyingProductDetails, paymentMethod, price }) => {
    try {
        const isValidUser = await userValidation();
        if (isValidUser.status !== 200) {
            return isValidUser;
        }

        // Run a Firestore transaction for all products
        const orderConfirmation = await runTransaction(db, async (transaction) => {
            for (const product of buyingProductDetails) {
                const productDocRef = doc(db, "products", product.productId);
                const productSnap = await transaction.get(productDocRef);

                if (!productSnap.exists()) {
                    return { status: 500, message: "Product not found" };
                }

                const productData = productSnap.data();

                // Check if the product has variants or not
                if (_.isEmpty(product.variant)) {
                    // No variant case - handle stock for base product
                    if (productData.stock < 10) {
                        return { status: 404, message: `Product ${product.productId} is out of stock` };
                    } else {
                        // Decrement stock for base product
                        transaction.update(productDocRef, { stock: increment(- product.quantity || 1) });
                    }
                } else {
                    // Variant case
                    const variants = productData.variants;
                    const isInStock = await isProductInStock({
                        variants,
                        selectedVariant: product.variant
                    });

                    if (!isInStock) {
                        return { status: 404, message: `Selected variant for product ${product.productId} is out of stock` };
                    }

                    // Find the specific variant and decrement its stock
                    variants.forEach(variant => {
                        const selectedVariantValue = product.variant[variant.title];
                        if (selectedVariantValue) {
                            const matchingTypeIndex = variant.type.findIndex(type => type.variant === selectedVariantValue);

                            if (matchingTypeIndex !== -1 && variant.type[matchingTypeIndex].stock !== undefined) {
                                const updatedVariants = [...variants];
                                const updatedTypes = [...variant.type];

                                updatedTypes[matchingTypeIndex] = {
                                    ...updatedTypes[matchingTypeIndex],
                                    stock: updatedTypes[matchingTypeIndex].stock - product.quantity || 1
                                };

                                updatedVariants[variants.indexOf(variant)] = {
                                    ...variant,
                                    type: updatedTypes
                                };

                                transaction.update(productDocRef, { variants: updatedVariants });
                            }
                        }
                    });
                }
            }

            return { status: 200, message: "Order confirmed" };
        });

        // After transaction, update user's order details
        if (orderConfirmation.status === 200) {
            const userDocRef = collection(db, "User", isValidUser.uid, "Information", "OrderDetails", "OrderedProducts");
            const now = new Date();
            const expectedDeliveryDate = new Date(now);
            expectedDeliveryDate.setDate(now.getDate() + 7);

            for (const product of buyingProductDetails) {
                await addDoc(userDocRef, {
                    productId: product.productId,
                    productName: product.productName,
                    productFirtsImgURL: product.productFirtsImgURL,
                    variant: product.variant,
                    quantity: product.quantity,
                    paymentMethod,
                    timestamp: now,
                    expectedDeliveryDate,
                    price,
                    deliveryStatus: "product not placed yet"
                });
            }

            return { status: 200, message: "Order placed successfully" };
        }

        return orderConfirmation;
    } catch (error) {
        console.error("Error confirming order:", error);
        return { status: 500, message: "Error processing order" };
    }
};