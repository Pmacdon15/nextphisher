"use client";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import notGoogleImage from '/public/notGoogle.png';
import adminImage from "/public/admin.png";

import notGoogleStyles from "./notGoogleStyles.module.css";
import testcss from "./testcss.module.css";

const Password = ({ onSubmit, argument }) => {
  //const router = useRouter();
  // Check the value of the argument prop
  const Service = argument;
  let file;
  if (Service === "notGoogle") {
    file = notGoogleImage;
  } else if (Service === "admin") {
    file = adminImage;
  }
  let selectedStyles;

  if (Service === "notGoogle") {
    selectedStyles = notGoogleStyles;
  } else {
    selectedStyles = testcss; // Default option
  }

  const { register, handleSubmit } = useForm();

  const onSubmitForm = (data) => {
    onSubmit(data.password); // Pass the password value to the onSubmit function
  };

  return (
    <div
      style={{ textAlign: "center" }}
      className={selectedStyles.formContainer}
    >
      <Image
        className={selectedStyles.loginImage}
        src={file}
        alt={Service}
      />
      <h2 className={selectedStyles.title}>Hello</h2>
      <p className={selectedStyles.prompt}>Enter your Password:</p>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          className={selectedStyles.textField}
          id="outlined-basic"
          {...register("password", { required: true })}
          label="Password"
          type="password"
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
            //onClick={() => router.push(Service !== 'admin' ? 'https://www.google.com' : '/admin')}
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Password;
