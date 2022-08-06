import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const StyledHeader = styled.div`
  padding: 32px 0;

  .logo {
    display: block;
    max-width: 48px;
  }

  .header-main {
    display: flex;
    align-items: center;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-left: 44px;
    list-style: none;
    font-weight: 500;
  }

  .search {
    position: relative;
    margin-left: 32px;
    padding: 12px 24px;
    border: 2px solid ${(props) => props.theme.primary};
    border-radius: 8px;
    width: 100%;
    max-width: 480px;
    display: flex;
    align-items: center;
  }

  .search-input {
    flex: 1;
    padding-right: 36px;
    font-weight: 500;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 24px;
  }

  .header-button {
    margin-left: auto;
  }

  .display-name {
    margin-left: auto;
  }
`;

const getLastName = (name) => {
  return name.split(" ").slice(-1).join(" ");
};

const Header = () => {
  const { userInfo } = useAuth();

  const navigate = useNavigate();
  const handleOnClickSignInButton = () => {
    navigate("/sign-in");
  };

  return (
    <StyledHeader>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <Button
              className="header-button"
              onClick={handleOnClickSignInButton}
              style={{ maxWidth: "160px" }}
            >
              Sign In
            </Button>
          ) : (
            <div className="display-name">
              {userInfo?.displayName && (
                <>
                  <span>Welcome back, </span>
                  <strong className="primary-text">
                    {getLastName(userInfo?.displayName)}
                  </strong>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
