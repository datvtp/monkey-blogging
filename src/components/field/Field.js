import React from "react";
import styled from "styled-components";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 12px;
  margin-bottom: 24px;
`;

const Field = ({ children }) => {
  return <StyledField>{children}</StyledField>;
};

export default Field;
