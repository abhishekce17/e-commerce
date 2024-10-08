"use client"
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import {
    signInWithPopup,
    onAuthStateChanged,
    GoogleAuthProvider,
    getAuth,
} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { fetchFirebaseConfig } from '@/actions/fetchFirebaseConfig';
import { signInWithGooglePopUp } from '@/actions/signInWithGooglePopUp';
import { notify } from '@/utils/notify';
import { useRouter } from 'next/navigation';

export const SignWithGoogleButton = ({ isPending }) => {
    const router = useRouter();
    const signInWithGoogle = async () => {
        try {
            const firebaseConfig = await fetchFirebaseConfig();
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);

            const provider = new GoogleAuthProvider();
            // await signInWithRedirect(auth, provider);
            await signInWithPopup(auth, provider);

            onAuthStateChanged(auth, async (result) => {
                // console.log(result)
                try {
                    const response = await signInWithGooglePopUp(
                        {
                            uid: result.uid,
                            email: result.email,
                            creationTime: result.metadata.creationTime,
                            providerData: result.providerData,
                            displayName: result.displayName
                        });

                    if (response.status !== 200) {
                        notify(response.message, "error");
                    } else {
                        router.refresh();
                    }

                } catch (error) {
                    console.log(error)
                    notify(error.message, "error");
                }
            })
        } catch (error) {
            console.error(error);
            notify(error, "error");
        }
    };

    return (
        <div onClick={!isPending && signInWithGoogle} className="bg-white min-w-fit md:w-[25%] py-2 px-3 flex justify-center items-center gap-3 rounded font-medium cursor-default">
            Log in with <FcGoogle className="" />
        </div>
    )
}
