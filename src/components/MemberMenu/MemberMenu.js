import React, { useState } from "react";
import ChangePermissonMenu from "./ChangePermissionMenu";
import MainMenu from "./MainMenu";
import { MAIN_CONTENT, CHANGE_PERMISSION } from "./display-type";

function MemberMenu(props) {
  const [display, setDisplay] = useState(MAIN_CONTENT);
  const { member, currentUserRole } = props;

  function renderContent() {
    switch (display) {
      case MAIN_CONTENT:
        return (
          <MainMenu
            member={member}
            setDisplay={setDisplay}
            currentUserRole={currentUserRole}
          />
        );
      case CHANGE_PERMISSION:
        return (
          <ChangePermissonMenu
            setDisplay={setDisplay}
            member={member}
            currentUserRole={currentUserRole}
          />
        );
    }
  }

  return <div className="member-menu">{renderContent()}</div>;
}

export default MemberMenu;
