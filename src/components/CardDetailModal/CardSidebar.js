import React from "react";
import { Icon } from "office-ui-fabric-react";
import HiddenMenu from "../HiddenMenu/HiddenMenu";
import LabelList from "../CardSidebarComponents/LabelList";
import MemberList from "../CardSidebarComponents/MemberList";

function CardSidebar(props) {
  return (
    <div className="card-sidebar">
      <h2 className="section-title">CARD ACTIONS</h2>
      <ul className="action-list">
        <li className="action-item">
          <HiddenMenu
            title="Members"
            toggle={
              <span className="item-content">
                <Icon iconName="Contact" /> Members
              </span>
            }
          >
            <MemberList />
          </HiddenMenu>
        </li>
        <li className="action-item">
          <HiddenMenu
            toggle={
              <span className="item-content">
                <Icon iconName="Label" /> Labels
              </span>
            }
            title="Labels"
          >
            <LabelList />
          </HiddenMenu>
        </li>
        <li className="action-item">
          <span className="item-content">
            <Icon iconName="CheckList" /> Checklist
          </span>
        </li>
        <li className="action-item">
          <span className="item-content">
            <Icon iconName="DateTime" /> Due Date
          </span>
        </li>
      </ul>
    </div>
  );
}

export default CardSidebar;
