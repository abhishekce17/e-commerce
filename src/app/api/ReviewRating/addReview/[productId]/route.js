// 'use server'
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { db } from "@/firebase-config/config";
import { verify } from 'jsonwebtoken';
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc, writeBatch } from "firebase/firestore";

export const dynamic = 'force-dynamic'
export async function POST(req, { params }) {
    try {
        const authToken = cookies().get("authToken");
        if (authToken === undefined) return NextResponse.json({ status: 401 })
        const userData = verify(authToken.value, process.env.AUTH_SECRETE_KEY);
        if (userData) {
            const userExistance = await getDoc(doc(db, "User", userData.uid))
            if (userExistance.exists()) {
                const batch = writeBatch(db)
                const { Rating, Review, userName } = await req.json();
                const productId = params.productId;
                await addDoc(collection(db, "User", userData.uid, "ReviewsAndRatings"), { productId, Rating, Review, timeStamp: serverTimestamp() })
                const ReviewRef = await getDoc(doc(db, "ProductsReviewsAndRatings", productId));
                if (!ReviewRef.exists()) {
                    await setDoc(doc(db, "ProductsReviewsAndRatings", productId), { RatingsAndReviewsArray: [{ userId: userData.uid, Rating, Review, userName, timeStamp: new Date().getTime() }] });
                } else {
                    await updateDoc(ReviewRef.ref, { RatingsAndReviewsArray: arrayUnion({ userId: userData.uid, userName, Rating, Review, timeStamp: new Date().getTime() }) })
                }
                await batch.commit()
                return NextResponse.json({ status: 200 })
            }
        }
        return NextResponse.json({ status: 401 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ status: 401, error: "Something went wrong please try again leter" });
    }
}

// "ReviewRating/addReview/"