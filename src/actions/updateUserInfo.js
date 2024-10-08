"use server"
import { db } from "@/config/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { userValidation } from "./userValidation";

export async function updateUserInfo({ newData }) {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        const userDocRef = doc(db, "User", isValidUser.uid);
        const userInfoDocRef = doc(userDocRef, "Information", "Personal");

        await updateDoc(userInfoDocRef, newData);

        return { status: 200, message: "Saved" };
    } catch (e) {
        console.log('Error:', e);
        return { status: 500, message: "Error while updating your information" };
    }
}
