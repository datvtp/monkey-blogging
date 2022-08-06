import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNotFoundPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .logo {
    display: inline-block;
    margin-bottom: 40px;
  }

  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 24px;
  }

  .back-link {
    display: inline-block;
    line-height: 28px;
    padding: 12px 24px;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 8px;
    font-weight: 600;
  }
`;

const NotFoundPage = () => {
  return (
    <StyledNotFoundPage>
      <NavLink to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" />
      </NavLink>
      <h1 className="heading">Oops! Page not found!</h1>
      <NavLink to="/" className="back-link">
        Back to home
      </NavLink>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
