import React from "react";
import { DefaultButton } from "office-ui-fabric-react";

function CheckList(props) {
  const { checklist } = props;

  function renderProcess() {}

  return (
    <div className="checklist-wrapper">
      <div className="checklist-header">
        <h4 className="section-title">{checklist.checklistName}: </h4>
        <DefaultButton text="Delete" />
      </div>
    </div>
  );
}

export default CheckList;

CheckList.defaultProps = {
  checklist: {
    checklistName: "",
    list: [],
  },
};
