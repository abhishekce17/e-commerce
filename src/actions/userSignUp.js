'use server'

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase-config";
import { sign } from 'jsonwebtoken';
import { cookies } from "next/headers";
import { collection, doc, writeBatch } from "firebase/firestore";

const setCookie = (user) => {
    const token = sign(user, process.env.AUTH_SECRET_KEY);
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
}

export async function userSignUp({ email, password, name, agreedTermAndCondition }) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { uid, metadata } = userCredential.user;

        const batch = writeBatch(db);
        const userCollection = collection(db, "User", uid, "Information");

        // Set up user documents
        batch.set(doc(db, "User", uid), { createdAt: metadata.creationTime });
        batch.set(doc(userCollection, "Account"), {
            email,
            agreedTermAndCondition,
            emailVerify: true
        });
        batch.set(doc(userCollection, "Personal"), {
            fullName: name,
            contact: { email, phoneNo: null },
            address: {},
            wishlist: []
        });

        await batch.commit();

        // Set authentication cookie
        setCookie({ uid, email });

        return { status: 201, message: "User created successfully" };
    } catch (error) {
        console.log("Error creating user:", error);

        if (error.code === 'auth/email-already-in-use') {
            return { status: 409, error: "Email is already in use" };
        }

        return { status: 500, error: "User creation failed. Please try again later." };
    }
}