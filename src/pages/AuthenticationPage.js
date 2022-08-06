import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledAuthenticationPage = styled.div`
  min-height: 100vh;
  padding: 40px;

  .logo {
    margin: 32px auto 12px;
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

  .have-account {
    margin-top: 24px;
    a {
      display: inline-block;
      font-weight: 600;
      color: ${(props) => props.theme.primary};
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <StyledAuthenticationPage>
      <div className="container">
        <NavLink to="/">
          <img srcSet="/logo.png 3x" alt="monkey-blogging" className="logo" />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </StyledAuthenticationPage>
  );
};

export default AuthenticationPage;
