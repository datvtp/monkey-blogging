import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Button } from "components/button";

const StyledHero = styled.div`
  height: 560px;
  padding: 40px 0;
  margin-bottom: 60px;

  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  .hero-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hero-content {
    max-width: 600px;
    color: white;
  }

  .hero-heading {
    font-size: 36px;
    margin: 32px 0;
  }

  .hero-description {
    line-height: 1.75;
    margin-bottom: 32px;
  }

  @media screen and (max-width: 1023.98px) {
    .banner {
      flex-direction: column;
      min-height: unset;
      &-heading {
        font-size: 30px;
        margin-bottom: 10px;
      }
      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-image {
        margin-top: 25px;
      }
      &-button {
        font-size: 14px;
        height: auto;
        padding: 15px;
      }
    }
  }
`;

const Hero = () => {
  const navigate = useNavigate();
  const handleGetStartedButton = () => {
    navigate("/sign-up");
  };

  return (
    <StyledHero>
      <div className="container">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-heading">Monkey Blogging</h1>
            <p className="hero-description">
              Blog is a discussion or informational website published on the
              World Wide Web consisting of discrete, often informal diary-style
              text entries (posts). Posts are typically displayed in reverse
              chronological order, so that the most recent post appears first,
              at the top of the web page. Until 2009, blogs were usually the
              work of a single individual,[citation needed] occasionally of a
              small group, and often covered a single subject or topic.
            </p>
            <Button
              className="max-w-[200px]"
              onClick={handleGetStartedButton}
              variant="secondary"
            >
              Get started
            </Button>
          </div>
          <div className="hero-image">
            <img srcSet="/hero.png 2x" alt="hero" />
          </div>
        </div>
      </div>
    </StyledHero>
  );
};

export default Hero;
