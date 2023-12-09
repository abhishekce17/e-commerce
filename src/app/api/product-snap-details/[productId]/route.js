import {NextResponse} from "next/server";
import {db} from "@/firebase-config/config";
import {collection, getDocs, query, where} from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET(req, {params}) {
    try {
        const {productId} = params;
        const querySnapshot = query(collection(db, "ProductSnapDetails"), where("productId", "==", productId));
        const queryResult = await getDocs(querySnapshot);
        const queryData = await Promise.all(
            queryResult.docs.map(async x => {
                return x.data();
            })
        )

        return NextResponse.json({queryData, status: 200})
    } catch (error) {
        return NextResponse.json({status: 500, error})
    }
}