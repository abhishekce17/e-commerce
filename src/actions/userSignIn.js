'use server'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken';
import { loginSchema } from "@/schema/allSchemas";
import { db } from "@/config/firebase-config";

export const userSignIn = async ({ email, password }) => {
    try {
        const { success, error } = loginSchema.safeParse({ email, password });
        if (!success) {
            throw new Error(JSON.stringify(error)); // Return proper validation error
        }
        const auth = getAuth();
        const response = await signInWithEmailAndPassword(auth, email, password);
        const user = {
            uid: response.user.uid,
            email: response.user.email,
        };

        const token = sign(user, process.env.AUTH_SECRET_KEY); // Corrected 'AUTH_SECRET_KEY' typo

        const isSecure = process.env.NODE_ENV === 'production';

        cookies().set({
            name: 'authToken',
            value: token,
            httpOnly: true,
            secure: isSecure,
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 // 1 week
        });

        return { status: 200, token };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Email or Password is wrong" }
    }
};
