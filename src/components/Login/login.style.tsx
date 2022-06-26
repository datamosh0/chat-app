import styled from "styled-components";
import logo from "../../assets/logo.png";

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: auto;
  padding: auto;
  margin: auto;
  grid-column: 1 / span 2;
`;

const LogoHeader = styled.h2`
  font-weight: bold;
  margin: 20px;
  text-align: center;
`;

const LogoImage = styled.p`
  display: block;
  height: 20vh;
  width: 50%;
  background-image: url(${logo});
  background-size: 100%, 100%;
  background-position: center;
  background-repeat: no-repeat;
  margin: 10px auto;
`;

const LogoButton = styled.button`
  cursor: pointer;
  display: block;
  padding: 10px 15px;
  background-color: #4285f4;
  color: white;
  font-weight: bold;
  width: fit-content;
  border: 1px solid transparent;
  border-radius: 10px;
  outline: none;
  transition: 0.2s ease-in;
  :hover {
    color: #4285f4;
    text-decoration: underline;
    background-color: white;
    border: 1px solid #4285f4;
  }
`;

export { LogoWrapper, LogoHeader, LogoImage, LogoButton };
