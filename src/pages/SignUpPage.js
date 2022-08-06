import * as yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { Button } from "components/button";
import AuthenticationPage from "./AuthenticationPage";
import { auth, db } from "firebase-app/firebase-config";
import { IconEyeClose, IconEyeOpen } from "components/icon";

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

  useEffect(() => {
    document.title = "Sign Up Page";
  }, []);

  return (
    <AuthenticationPage>
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
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Sign Up
        </Button>
        <div className="have-account">
          You already have an account?{" "}
          <NavLink to={"/sign-in"}>Sign In</NavLink>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
