import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { LoadingSpinner } from "components/loading";

const StyledButton = styled.button`
  cursor: pointer;
  padding: 12px;
  line-height: 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.variant === "primary" &&
    css`
      color: white;
      background-color: ${(props) => props.theme.primary};
    `};

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: white;
      color: ${(props) => props.theme.primary};
    `};

  ${(props) =>
    props.variant === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};

  &:disabled {
    opacity: 0.7;
    pointer-events: none;
  }
`;

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 */
const Button = ({
  type = "button",
  onClick = () => {},
  variant = "primary",
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner size="28px" /> : children;

  return (
    <StyledButton type={type} onClick={onClick} variant={variant} {...props}>
      {child}
    </StyledButton>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  variant: PropTypes.oneOf(["primary", "secondary", "ghost"]),
};

export default Button;
