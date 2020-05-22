import React from "react";
import { Icon } from "office-ui-fabric-react";
import { MAIN_CONTENT } from "./display-type";
import classNames from "classnames";
import { connect } from "react-redux";

function ChangePermissonMenu(props) {
  const { member, setDisplay, boardDetail } = props;
  const { boardInfo } = boardDetail;
  return (
    <div className="change-permisson-menu">
      <div className="menu-header">
        <span className="toggle-back" onClick={() => setDisplay(MAIN_CONTENT)}>
          <Icon iconName="ChevronLeft" />
        </span>
        <span className="menu-title">Change Permissions</span>
        <hr className="line" />
      </div>
      <div className="menu-content">
        <ul className="action-list">
          <li className={classNames({ disabled: member.role === "ADMIN" })}>
            <p className="member-type">
              Admin {member.role === "ADMIN" && <Icon iconName="CheckMark" />}
            </p>
            <p className="member-desc">
              Can view and edit cards, remove members and change all settings
              for the board
            </p>
          </li>
          <li
            className={classNames({
              disabled:
                member.role === "MEMBER" ||
                (boardInfo && boardInfo.owner === member.email),
            })}
          >
            <p className="member-type">
              Member {member.role === "MEMBER" && <Icon iconName="CheckMark" />}
            </p>
            <p className="member-desc">
              Can view and edit cards. Can change some board settings
            </p>
          </li>
        </ul>
        {boardInfo && boardInfo.owner === member.email && (
          <div className="message-wrapper">
            <hr className="line" />
            <p>
              You can't change your role to Member you're the owner of this
              Board
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    boardDetail: state.boardDetail,
  };
};

export default connect(mapStateToProps, null)(ChangePermissonMenu);
