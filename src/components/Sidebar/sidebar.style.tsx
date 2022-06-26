import styled from "styled-components";

const SidebarWrapper = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  grid-column: 2 / 2;

  .addButton {
    :hover,
    :active {
      background-color: transparent !important;
    }
    .MuiTouchRipple-root {
      display: none;
    }
    .MuiSvgIcon-root {
      height: 1.7em;
      width: 1.7em;
      transition: 0.2s linear;
      &:hover,
      :focus {
        transform: scale(1.1);
      }
    }
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  height: 10vh;
  width: 100%;
  padding: 2rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
`;

const SidebarHeaderIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: fit-content;

  & > .MuiIconButton-root {
    .MuiSvgIcon-root {
      font-size: 1.5rem !important;
      color: #d3d3d3;
      transition: 0.2s ease-in;
      :hover {
        color: black;
      }
    }
  }
`;

const SidebarHeaderName = styled.p`
  display: block;
  font-weight: bold;
  text-align: left;
  padding-left: 10px;
`;

const SidebarSearch = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;

  & > .MuiIconButton-root {
    font-size: 1.5rem !important;
    color: lightgray;
    &:hover {
      color: black;
    }
  }
`;

const SidebarSearchInput = styled.input`
  border: none;
  flex: 1;
  outline: none;
  border-bottom: 1px solid transparent;
  transition: 0.2s ease-in-out;
  ::placeholder {
    color: #e0e0e0;
    text-align: center;
  }
  &:focus {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const SidebarChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 1rem;
  height: 100%;
`;

const ChatItem = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0;
  align-items: center;
  justify-content: space-between;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatItemInfo = styled.div`
  display: flex;
  flex: 1;
  margin-left: 10px;
  flex-direction: column;
  & > h2 {
    font-size: 1rem;
  }
  & > p {
    font-size: 0.9rem;
    color: darkgray;
    overflow: hidden;
    max-height: 5vh;
    display: inline-block;
    word-break: break-word;
  }
  @media (min-width: 768px) {
    & > h2 {
      font-size: 1.5rem;
    }
  }
`;

const SidebarMenu = styled.div`
  height: 3rem;
  background: #ededed;
  margin: 0;
  padding: 0;
  min-height: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const SidebarMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  :hover {
    background: hsl(0, 0%, 77%);
  }
`;

export {
  SidebarWrapper,
  SidebarHeader,
  SidebarHeaderIcons,
  SidebarSearch,
  SidebarSearchInput,
  SidebarChat,
  ChatItem,
  ChatItemInfo,
  SidebarHeaderName,
  SidebarMenu,
  SidebarMenuItem,
};
