import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";


export async function GET(req) {
    try {
        console.log("from userInfo route");
        const authToken = cookies().get("authToken")
        console.log(authToken)
        if (authToken !== undefined) {
            const userData = verify(authToken.value, process.env.AUTH_SECRETE_KEY);
            if (userData) {
                const userExistance = await getDoc(doc(db, "User", userData.uid))
                if (userExistance.exists()) {
                    let fetchedUserData = {}
                    const userInfoSnap = await getDocs(collection(db, "User", userData.uid, "Information"))
                    const fetchPromise = new Promise((resolve, reject) => {
                        userInfoSnap.forEach(doc => { fetchedUserData = { ...fetchedUserData, [doc.id]: doc.data() } })
                        if (userInfoSnap.size === Object.keys(fetchedUserData).length) resolve();
                    })
                    await fetchPromise
                    return NextResponse.json({ status: 200, userData: fetchedUserData })
                }
            }
        }
        return NextResponse.json({ status: 401 })
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ error: e });
    }
}
