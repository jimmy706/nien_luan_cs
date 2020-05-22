import React from "react";
import { Persona } from "office-ui-fabric-react";
import { CHANGE_PERMISSION } from "./display-type";
import { connect } from "react-redux";
import classNames from "classnames";

function MainMenu(props) {
  const { member, setDisplay, boardDetail } = props;
  const { boardInfo } = boardDetail;
  return (
    <div className="main-menu">
      <div className="profile-wrapper">
        <Persona text={member.email} imageUrl={member.avatar} />
      </div>
      <div className="action-wrapper">
        <ul className="action-list">
          <li onClick={() => setDisplay(CHANGE_PERMISSION)}>
            Change Permissions...
          </li>
          <li
            className={classNames({
              disabled: boardInfo && boardInfo.owner === member.email,
            })}
          >
            Remove from Board...
          </li>
        </ul>
      </div>
      {boardInfo && boardInfo.owner === member.email && (
        <div className="message-wrapper">
          <hr className="line" />
          <p>You can't leave because you're the owner of this Board</p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    boardDetail: state.boardDetail,
  };
};

export default connect(mapStateToProps, null)(MainMenu);
