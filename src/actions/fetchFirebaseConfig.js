"use server"
import { firebaseConfig } from "@/config/firebase-config";

export const fetchFirebaseConfig = async () => {
    return firebaseConfig;
}