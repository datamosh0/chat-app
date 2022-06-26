import React from "react";
import { Link } from "react-router-dom";
import {
  PolicyWrapper,
  PolicyHeader,
  PolicyList,
  PolicyListItem,
  PolicyFooter,
} from "./policy.style";

const Policy = (): JSX.Element => {
  return (
    <PolicyWrapper>
      <PolicyHeader>Privacy policy:</PolicyHeader>

      <PolicyList>
        <PolicyListItem>
          We store your e-mail adress and display name for filtering the
          messages by author
        </PolicyListItem>

        <PolicyListItem>
          All of the data is used only for application performance
        </PolicyListItem>

        <PolicyListItem>
          The data is stored by Dawson Contreras, contact me:
          dawsoncontreras@gmail.com
        </PolicyListItem>
      </PolicyList>

      <PolicyFooter>
        If you decide to log in to the application, you declare that you are
        aware and that you consent to the storage of email and display name
      </PolicyFooter>
    </PolicyWrapper>
  );
};

export default Policy;
