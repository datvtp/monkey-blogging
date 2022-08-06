import React from "react";
import styled from "styled-components";

import { Button } from "components/button";

const menuLinks = [
  {
    url: "/#",
    title: "Home",
  },
  {
    url: "/#",
    title: "Blog",
  },
  {
    url: "/#",
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
    margin-left: auto;
    padding: 12px 24px;
    border: 2px solid ${(props) => props.theme.primary};
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
  }

  .search-input {
    flex: 1;
    padding-right: 36px;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 24px;
  }

  .header-button {
    margin-left: 24px;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="container">
        <div className="header-main">
          <a href="/">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </a>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <a href={item.url} className="menu-link">
                  {item.title}
                </a>
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
          <Button className="header-button" style={{ maxWidth: "160px" }}>
            Sign In
          </Button>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
