"use client";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import notGoogleStyles from "./notGoogleStyles.module.css";
import notGoogleImage from "/public/notGoogle.png";
import adminImage from "/public/admin.png";

import testcss from "./testcss.module.css";

const UserName = ({ onSubmit, argument }) => {
  const { register, handleSubmit } = useForm();

  // Check the value of the argument prop
  const Service = argument;
  let file;
  if(Service === "notGoogle"){
    file = notGoogleImage;
  } else if(Service ==='admin') {
    file = adminImage;
  }

  let selectedStyles;

  if (Service === "notGoogle") {
    selectedStyles = notGoogleStyles;
  } else {
    selectedStyles = testcss; // Default option
  }

  const onSubmitForm = (data) => {
    onSubmit(data.userName); // Pass the username value to the onSubmit function
  };

  return (
    <div
      style={{ textAlign: "center" }}
      className={selectedStyles.formContainer}
    >
      <Image className={selectedStyles.loginImage} src={file} alt={Service} />
      <h2 className={selectedStyles.title}>Hello</h2>
      <p className={selectedStyles.prompt}>Enter your Email:</p>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          className={selectedStyles.textField}
          id="outlined-basic"
          {...register("userName", { required: true })}
          label="Email"
          variant="outlined"
          autoFocus={true}
        />

        <div className={selectedStyles.forgotEmail}>
          <Link href={"https://www.google.com/"} passHref>
            Forgot Email?
          </Link>
        </div>
        <div>
          <Button
            className={selectedStyles.button}
            type="submit" // Specify type as submit to trigger form submission
            variant="contained"
            color="primary"
            
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserName;
