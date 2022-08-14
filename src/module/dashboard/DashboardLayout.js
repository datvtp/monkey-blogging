import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

const StyledDashboard = styled.div`
  max-width: 1600px;
  margin: 0 auto;

  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 20px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }

    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;

const DashboardLayout = ({ children }) => {
  return (
    <StyledDashboard>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </StyledDashboard>
  );
};

export default DashboardLayout;
