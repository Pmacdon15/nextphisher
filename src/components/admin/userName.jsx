"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";

const UserName = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const onSubmitForm = (data) => {
    onSubmit(data.userName); // Pass the username value to the onSubmit function
  };

  return (
    <div style={{ textAlign: "center" }} className="form-container">
      <Image className="login-image" src="/notGoogle.png" alt="Not Google" />
      <h2 className="title">Hello</h2>
      <p className="prompt">Enter your Email:</p>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          id="outlined-basic"
          {...register("userName", { required: true })}
          label="Email"
          variant="outlined"
          style={{ width: "80%", margin: "auto" }}
        />
        <div>
          <div
            style={{ textAlign: "right", marginRight: "10%", marginTop: "2%" }}
          >
            <Link href={"https://www.google.com/"} passHref>
              Forgot Email?
            </Link>
          </div>
          <div>
            <Button
              type="submit" // Specify type as submit to trigger form submission
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserName;
