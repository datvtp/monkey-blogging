import * as yup from "yup";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "firebase-app/firebase-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { Button } from "components/button";
import { IconEyeClose, IconEyeOpen } from "components/icon";

const StyledSignUpPage = styled.div`
  min-height: 100vh;
  padding: 40px;

  .logo {
    margin: 0 auto 20px;
  }

  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 32px;
  }

  .form {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;

    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });

    const collectionRef = collection(db, "users");
    await addDoc(collectionRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });

    toast.success("Register successfully!");
    navigate("/");
  };

  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    const errorArr = Object.values(errors);

    if (errorArr.length > 0) {
      toast.error(errorArr[0].message);
    }
  }, [errors]);

  return (
    <StyledSignUpPage>
      <div className="container">
        <img srcSet="/logo.png 3x" alt="monkey-blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form
          className="form"
          onSubmit={handleSubmit(handleSignUp)}
          autoComplete="off"
        >
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              name="fullname"
              type="text"
              placeholder="Enter your fullname"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="email">Email address</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email address"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type={togglePassword ? "text" : "password"}
              placeholder="Enter your password"
              control={control}
            >
              {togglePassword ? (
                <IconEyeOpen onClick={() => setTogglePassword(false)} />
              ) : (
                <IconEyeClose onClick={() => setTogglePassword(true)} />
              )}
            </Input>
          </Field>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </StyledSignUpPage>
  );
};

export default SignUpPage;
