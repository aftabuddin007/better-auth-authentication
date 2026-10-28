// import React from 'react';
"use client";
import { authClient } from "@/app/lib/auth-client";
// import { Form } from '@heroui/react';
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form ,Input, Label, TextField} from "@heroui/react";
const Login = () => {
    const onSubmit = async(e)=>{
         e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries())
    console.log(userData)
    const {data,error}=await authClient.signIn.email({
        email:userData.email,
        password:userData.password,
        rememberMe:true,
        callbackURL:'/'
        
    })
    console.log("sign up",{data,error})
    if(error){
        alert("error login" + error.message);

    }
    if(data){
        alert("login successful")
    }
    // // Convert FormData to plain object
    // formData.forEach((value, key) => {
    //   data[key] = value.toString();
    // });
    // alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    }
    return (
        <div>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
               
          {/* email */}
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input name="email" placeholder="enter your email " />
        <FieldError />
      </TextField>
      {/* password */}
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input name="password" placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Login
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
        </div>
    );
};

export default Login;