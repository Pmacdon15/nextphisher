"use client";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";

const Password = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const onSubmitForm = (data) => {
    onSubmit(data.password); // Pass the password value to the onSubmit function
  };

  return (
    <div style={{ textAlign: "center" }} className="form-container">
      <Image className="login-image" src="/notGoogle.png" alt="Not Google" />
      <h2 className="title">Hello</h2>
      <p className="prompt">Enter your Password:</p>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          id="outlined-basic"
          {...register("password", { required: true })}
          label="Password"
          type="password"
          variant="outlined"
          style={{ width: "80%", margin: "auto" }}
        />
        <div>
          <div
            style={{ textAlign: "right", marginRight: "10%", marginTop: "2%" }}
          >
            <Link href={"https://www.google.com/"} passHref>
              Forgot Password?
            </Link>
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
            >
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Password;
