'use server'

import { db } from "@/config/firebase-config"
import { arrayUnion, collection, doc, getDoc, serverTimestamp, writeBatch } from "firebase/firestore"
import { revalidatePath } from 'next/cache'
import { userValidation } from './userValidation'

export async function addReviewToProduct({ Rating, Review, userName, productId }) {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        const batch = writeBatch(db)

        // Add review to user's collection
        const userReviewRef = doc(collection(db, "User", isValidUser.uid, "ReviewsAndRatings"))
        batch.set(userReviewRef, {
            productId,
            Rating,
            Review,
            timeStamp: serverTimestamp()
        })

        // Update or create product review document
        const productReviewRef = doc(db, "ProductsReviewsAndRatings", productId)
        const productReviewDoc = await getDoc(productReviewRef)

        const reviewData = {
            userId: isValidUser.uid,
            Rating,
            Review,
            userName,
            timeStamp: serverTimestamp()
        }

        if (!productReviewDoc.exists()) {
            batch.set(productReviewRef, { RatingsAndReviewsArray: [reviewData] })
        } else {
            batch.update(productReviewRef, {
                RatingsAndReviewsArray: arrayUnion(reviewData)
            })
        }

        await batch.commit()

        // Revalidate the product page to show the new review
        revalidatePath(`/products/${productId}`)

        return { status: 200, message: "Than you for your contribution" }
    } catch (error) {
        console.log('Error adding review:', error)
        return { status: 500, message: 'Failed to add review. Please try again later.' }
    }
}