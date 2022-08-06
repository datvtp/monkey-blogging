import * as yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";

import { Input } from "components/input";
import { Label } from "components/label";
import { Field } from "components/field";
import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import AuthenticationPage from "./AuthenticationPage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IconEyeClose, IconEyeOpen } from "components/icon";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In Page";
    if (userInfo?.email) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    const errorArr = Object.values(errors);

    if (errorArr.length > 0) {
      toast.error(errorArr[0].message);
    }
  }, [errors]);

  const handleSignIn = async (values) => {
    if (!isValid) return;

    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            control={control}
            placeholder="Please enter your email address"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            control={control}
            placeholder="Please enter your password"
          >
            {togglePassword ? (
              <IconEyeOpen onClick={() => setTogglePassword(false)} />
            ) : (
              <IconEyeClose onClick={() => setTogglePassword(true)} />
            )}
          </Input>
        </Field>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Sign In
        </Button>
        <div className="have-account">
          Create an account? <NavLink to={"/sign-up"}>Sign Up</NavLink>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
