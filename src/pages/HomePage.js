import React from "react";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { Header } from "components/layout";

const StyledHomePage = styled.div``;

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <StyledHomePage>
      <Header></Header>
    </StyledHomePage>
  );
};

export default HomePage;
