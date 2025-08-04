"use server";
import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const LoginAction = async (email: string, password: string) => {
    try {
        const {auth} = await createClient();

        const {error} = await auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            throw error;
        }
        //const dbUser = await prisma.user.findUnique({
        //    where: { id: email }, // or use user.email
        //});

        return { errorMessage: null };
    } catch (error) {   
        handleError(error);
    }
};

export const LogOutAction = async () => {
    try {
        const {auth} = await createClient();

        const {error} = await auth.signOut();
        if (error) {
            throw error;
        }
        return { errorMessage: null };
    } catch (error) {   
        handleError(error);
    }
};
//asda

export const SignUpAction = async (email: string, password: string) => {
    try {
        const {auth} = await createClient();

        const {data, error} = await auth.signUp({
            email,
            password
        });
        if (error) {
            throw error;
        }



        const userID = data.user?.id;
        if (!userID) {
            throw new Error("Error signing up");
        }

        await prisma.user.create({
            data: {
                id: userID,
                email,
            }   
        });


        return { errorMessage: null };
    } catch (error) {   
        handleError(error);
    }
};