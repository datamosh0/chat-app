import styled from "styled-components";

const MainWrapper = styled.main`
  display: flex;
  flex: 1;
  background-color: white;
  flex-direction: column;
  @media and screen (max-width: 768px) {
    flex: 0.65;
  }
`;

const MainHeader = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;
  height: 10vh;
  justify-content: space-between;
  position: relative;
  padding: 5px;
`;

const MainHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  flex: 1;
  & > p {
    color: darkgray;
    font-size: 0.8rem;
  }
`;

const MainHeaderIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .MuiSvgIcon-root {
    font-size: 1.5rem !important;
    color: #d3d3d3;
    transition: 0.2s ease-in;
    :hover {
      color: black;
    }
  }
`;

const MainContentInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  position: absolute;
  bottom: 0;
  opacity: 0;
  left: 0;
  z-index: 5;
  outline: none;
  background-color: white;
  border: 1px solid black;
  transition: all 0.3s ease-in;
  pointer-events: none;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  background-color: #d8d8d8;
  border-bottom: 1px solid darkgray;
  padding: 15px;
  min-height: 60vh;
  justify-content: flex-start;
  flex-direction: column;
  overflow-y: auto;
`;
const MainFooter = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f0f0;
  height: 3rem;
`;

const MainFooterInput = styled.input`
  display: flex;
  flex: 1;
  margin: 0 5px;
  background-color: white;
  padding: 3px 5px;
  border: none;
  margin: 0 1rem;
  height: 2rem;
  min-height: 1.5rem;

  border-radius: 20px;
  outline: none;
  ::placeholder {
    color: lightgray;
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;

  a {
    text-decoration: underline !important;
  }
  p {
    padding: 5px 10px;
    line-height: 1.5;
    display: inline-block;
    word-break: break-word;
  }
`;

const MessageContent = styled.p`
  display: flex;
  padding: 3px 10px;
  width: fit-content;
  font-size: 0.85rem;
  background-color: #505050;
  justify-self: flex-end;
  color: white;
  position: relative;
  border-radius: 15px;
  margin-left: 5px;
  span {
    display: inline-block;
    color: black;
    position: absolute;
    left: 0%;
    top: -20px;
    font-size: 0.6rem;
    font-weight: bold;
    padding: 0 2px;
    white-space: nowrap;
  }
`;

const OwnMessage = styled.div`
  display: flex;

  justify-content: flex-end;
  width: 100%;
  margin-bottom: 15px;
  align-items: center;
  height: fit-content;
  a {
    text-decoration: underline !important;
  }
  p {
    background-color: white;
    color: black;
    font-weight: 500;
    line-height: 1.5;
    margin-right: 5px;
    padding: 5px 10px;
    display: inline-block;
    word-break: break-word;
  }
  span {
    display: none;
  }
`;

export {
  MainWrapper,
  MainHeader,
  MainHeaderInfo,
  MainHeaderIcons,
  MainContent,
  MainFooter,
  MainFooterInput,
  MessageContent,
  Message,
  OwnMessage,
  MainContentInput,
};
