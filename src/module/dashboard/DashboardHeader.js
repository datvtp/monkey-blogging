import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { useAuth } from "contexts/auth-context";

const StyledDashboardHeader = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }

  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();

  return (
    <StyledDashboardHeader>
      <NavLink to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
        <span className="hidden lg:inline-block">Monkey Blogging</span>
      </NavLink>
      <div className="header-right">
        <div className="flex gap-x-4 text-primary text-xl font-semi-bold items-center">
          {userInfo.fullname}
          {userInfo.avatar ? (
            <NavLink to="/profile" className="header-avatar">
              <img src={userInfo.avatar} alt="" />
            </NavLink>
          ) : (
            <div className="w-[52px] h-[52px] rounded-full bg-primary"></div>
          )}
        </div>
      </div>
    </StyledDashboardHeader>
  );
};

export default DashboardHeader;
