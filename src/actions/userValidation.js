"use server"
import { db } from "@/config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const userValidation = async () => {

    try {
        const authToken = cookies().get("authToken")?.value;
        if (!authToken) {
            return { status: 401, message: "Unauthorized" };
        }
        const userData = verify(authToken, process.env.AUTH_SECRET_KEY);
        if (!userData || !userData.uid) {
            return { status: 401, message: "Invalid token" };
        }

        const userDocRef = doc(db, "User", userData.uid);
        const userExistence = await getDoc(userDocRef);
        if (!userExistence.exists()) {
            return { status: 404, message: "User not found" };
        }
        return { status: 200, uid: userData.uid };
    }
    catch (e) {
        console.error(e);
        return { status: 500, message: "Error while processing your request" };
    }
}
