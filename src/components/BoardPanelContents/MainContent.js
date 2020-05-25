import React, { useState } from "react";
import MainMenu from "./MainMenu";
import { MAIN_MENU, CHANGE_THEME, LABELS, MEMBERS } from "./display-type";

const menuList = [
  {
    title: "Change board background",
    display: CHANGE_THEME,
    icon: "ArrangeSendBackward",
  },
  {
    title: "Members",
    display: MEMBERS,
    icon: "Teamwork",
  },
  {
    title: "Labels",
    display: LABELS,
    icon: "Tag",
  },
];

function BoardPanelMainContent() {
  const [display, setDispay] = useState(MAIN_MENU);

  function renderDisplay() {
    switch (display) {
      default:
        return <MainMenu setDispay={setDispay} menuList={menuList} />;
    }
  }

  return <div className="board-panel-content">{renderDisplay()}</div>;
}

export default BoardPanelMainContent;
