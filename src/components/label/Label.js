import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  color: ${(props) => props.theme.grey4b};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <StyledLabel htmlFor={htmlFor} {...props}>
      {children}
    </StyledLabel>
  );
};

export default Label;
