import AouthLayout from '@/components/ui/layouts/aouth.layout';
import SignIn from './singin';
import SignUp from './signup';
import React from 'react'

export const SignInPage=()=>{
    return (
        <AouthLayout title={"Welcome Back"} description={"Please enter your details to Sign in"}>
            <SignIn/>
        </AouthLayout>
    );
};

export const SignUpPage=()=>{
    return (
        <AouthLayout title={"Create Account"} description={"Please fill the form to Sign up"}>
            <SignUp/>
        </AouthLayout>
    );
};

