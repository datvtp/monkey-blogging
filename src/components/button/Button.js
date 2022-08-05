import { LoadingSpinner } from "components/loading";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-style: 18px;
  width: 100%;
  height: ${(props) => props.height || "70px"};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  &:disabled {
    opacity: 0.7;
    pointer-events: none;
  }
`;

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner /> : children;

  return (
    <StyledButton type={type} onClick={onClick} {...props}>
      {child}
    </StyledButton>
  );
};

export default Button;
