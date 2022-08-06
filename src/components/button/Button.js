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
  font-size: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.variant === "primary" &&
    css`
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
      color: white;
    `};

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: white;
      color: ${(props) => props.theme.primary};
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
  const child = !!isLoading ? <LoadingSpinner size="24px" /> : children;

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
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
