// import React from 'react';
"use client"
import {  Button } from "@heroui/react";

import Link from "next/link";
import { signOut, useSession } from "../lib/auth-client";

const Navbar = () => {
const {data,isPending}=useSession();
if(isPending){
    return <div >data is loading</div>
}

// console.log(data)
const user = data?.user


    return (
<div className="">

{/* Basic */}
<nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
  <header className="flex h-16 items-center justify-between px-6">
    <div className="flex items-center gap-3">
<p className="">logo</p>      <p className="font-bold">ACME</p>
    </div>
    <ul className="flex items-center gap-4">
      <li><Link href="#">Features</Link></li>
      <li><Link href="#">Pricing</Link></li>
    </ul>
    <div className="">
        {user?<><p className="">wellcome, {user.name}!</p>  
        <button onClick={()=>signOut()} className="">signout</button>
        </>
        :<><Link href="/auth/login">Login</Link></>}
    </div>
  </header>
</nav>

{/* With right-aligned content */}



</div>
    );
};

export default Navbar;