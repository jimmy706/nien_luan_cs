import React, { useState } from "react";
import MainMenu from "./MainMenu";
import { MAIN_MENU, CHANGE_THEME, LABELS } from "./display-type";
import LabelMenu from "./LabelsMenu";
import ThemeMenu from "./ThemeMenu";

const menuList = [
  {
    title: "Change board background",
    display: CHANGE_THEME,
    icon: "ArrangeSendBackward",
  },
  {
    title: "Labels",
    display: LABELS,
    icon: "Tag",
  },
];

function BoardPanelMainContent() {
  const [display, setDisplay] = useState(MAIN_MENU);

  function renderDisplay() {
    switch (display) {
      case LABELS:
        return <LabelMenu setDisplay={setDisplay} />;
      case CHANGE_THEME:
        return <ThemeMenu setDisplay={setDisplay} />;
      default:
        return <MainMenu setDisplay={setDisplay} menuList={menuList} />;
    }
  }

  return <div className="board-panel-content">{renderDisplay()}</div>;
}

export default BoardPanelMainContent;
