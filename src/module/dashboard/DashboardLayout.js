import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

import Sidebar from "./Sidebar";
import SignInPage from "pages/SignInPage";
import DashboardHeader from "./DashboardHeader";

const StyledDashboard = styled.div`
  max-width: 1600px;
  max-height: 100vh;
  overflow: hidden;
  margin: 0 auto;

  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.black};
    }
    &-short-desc {
      font-size: 14px;
      color: ${(props) => props.theme.gray80};
    }

    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 0px 20px;
      gap: 0 40px;
      align-items: start;
    }

    @media screen and (max-width: 1023.98px) {
      &-heading {
        font-size: 20px;
      }
      &-main {
        grid-template-columns: 100%;
        padding: 20px;
      }
    }
  }

  .dashboard-children {
    height: calc(100vh - 93px);
    overflow-y: auto;
    scroll-behavior: smooth;
    padding-bottom: 20px;
  }

  .sidebar {
    margin-top: 40px;
  }

  .dashboard-heading-container {
    margin-top: 40px;
  }
`;

const DashboardLayout = () => {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <SignInPage></SignInPage>;
  }

  return (
    <StyledDashboard>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children scrollbar-hide">
          <Outlet></Outlet>
        </div>
      </div>
    </StyledDashboard>
  );
};

export default DashboardLayout;
