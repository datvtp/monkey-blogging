import React from "react";
import styled from "styled-components";
import { Label } from "components/label";

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
    font-size: 40px;
    margin-bottom: 60px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }

  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }

  .input {
    width: 100%;
    padding: 20px;
    background-color: ${(props) => props.theme.greyLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
  }

  .input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }

  .input::-webkit-input-placeholder {
    color: #84878b;
  }

  .input::-moz-input-placeholder {
    color: #84878b;
  }
`;

const SignUpPage = () => {
  return (
    <StyledSignUpPage>
      <div className="container">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form className="form">
          <div className="field">
            <Label htmlFor="fullname">Fullname</Label>
            <input
              id="fullname"
              type="text"
              className="input"
              placeholder="Enter your fullname"
            ></input>
          </div>
        </form>
      </div>
    </StyledSignUpPage>
  );
};

export default SignUpPage;
