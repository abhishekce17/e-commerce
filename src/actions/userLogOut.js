'use server'
import { cookies } from 'next/headers'
import { userValidation } from './userValidation';


export async function userLogOut() {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        cookies().delete('authToken')
        return { status: 200, message: "successfully logged out" };
    } catch (error) {
        console.log(error.message);
        return { status: 500, message: "Internal server error" };
    }
}
