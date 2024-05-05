"use client";
//TODO: remove these
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Login from "@/components/login/login";
//import notGoogleStyles from "../components/login/notGoogleStyles.module.css"



export default function Home() {  


  return (
    <div>
    <Login  argument={"admin"}/>
  </div>
  );
}


