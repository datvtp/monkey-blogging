import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  color: ${(props) => props.theme.greyDark};
  font-weight: 600;
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
