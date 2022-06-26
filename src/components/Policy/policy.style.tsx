import styled from "styled-components";

const PolicyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > a {
    display: block;
    width: fit-content;
    font-weight: 700;
  }
`;

const PolicyHeader = styled.h3`
  font-size: 1em;
  margin-top: 1rem;
  text-align: center;
`;

const PolicyList = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 90%;
`;

const PolicyListItem = styled.li`
  font-weight: 500;
  font-size: 0.8em;
  margin: 2px 0;
`;

const PolicyFooter = styled.footer`
  font-size: 0.8em;
  text-align: center;
`;

export {
  PolicyWrapper,
  PolicyHeader,
  PolicyList,
  PolicyListItem,
  PolicyFooter,
};
