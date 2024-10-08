'use server'

import { cookies } from 'next/headers'
import { db } from "@/config/firebase-config";
import { sign } from 'jsonwebtoken';
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";

const setCookie = (uid, email) => {
    const token = sign({ uid, email }, process.env.AUTH_SECRET_KEY);
    const isSecure = process.env.NODE_ENV === 'production';

    cookies().set({
        name: 'authToken',
        value: token,
        httpOnly: true,
        secure: isSecure,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60
    });
    return token;
}

export async function signInWithGooglePopUp({ uid, providerData, displayName, email, creationTime }) {
    try {

        const userDocRef = doc(db, "User", uid);
        const userDoc = await getDoc(userDocRef);

        // Check if user is already registered with password
        if (providerData.some(x => x.providerId === "password")) {
            return { success: false, error: "Email is already registered, please try to login" };
        }

        // If user exists, just set the cookie and return
        if (userDoc.exists()) {
            const token = setCookie(uid, email);
            // return { token };
        }

        // User doesn't exist, create new user
        const batch = writeBatch(db);
        const userCollection = collection(db, "User", uid, "Information");

        batch.set(userDocRef, { createdAt: creationTime });
        batch.set(doc(userCollection, "Account"), {
            email: email,
            agreedTermAndCondition: true,
            emailVerify: true
        });
        batch.set(doc(userCollection, "Personal"), {
            fullName: displayName,
            contact: { email: email, phoneNo: null },
            address: {},
            wishlist: []
        });

        await batch.commit();
        const token = setCookie(uid, email);
        return { status: 200 };

    } catch (err) {
        console.log("Error in signInWithGoogle:", err);
        return { status: 500, message: "Authentication failed. Please try again later." }
    }
}