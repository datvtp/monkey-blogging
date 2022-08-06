import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";

const StyledInput = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? "12px 64px 12px 12px" : "12px")};
    background-color: ${(props) => props.theme.greyLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 2px solid transparent;
  }

  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }

  input::-webkit-input-placeholder {
    color: #84878b;
  }

  input::-moz-input-placeholder {
    color: #84878b;
  }

  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({ name = "", type = "text", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <StyledInput hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children ? <div className="input-icon">{children}</div> : null}
    </StyledInput>
  );
};

export default Input;
