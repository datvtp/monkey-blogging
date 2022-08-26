import React from "react";
import styled from "styled-components";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  margin-bottom: 8px;

  @media screen and (max-width: 1023.98px) {
    margin-bottom: 20px;
  }
`;

const Field = ({ children }) => {
  return <StyledField>{children}</StyledField>;
};

export default Field;
