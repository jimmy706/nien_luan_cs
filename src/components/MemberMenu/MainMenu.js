import React from "react";
import { Persona } from "office-ui-fabric-react";
import { CHANGE_PERMISSION } from "./display-type";
import { connect } from "react-redux";
import classNames from "classnames";
import * as boardAPIs from "../../API/board.api";
import { useCookies } from "react-cookie";
import { updateBoard } from "../../store/actions/board-detail.action";

function MainMenu(props) {
  const { member, setDisplay, boardDetail, user, currentUserRole } = props;
  const { boardInfo } = boardDetail;
  const [cookies] = useCookies();

  async function handleRemoveUser() {
    const token = cookies.jwt;
    try {
      const result = await boardAPIs.removeMember(
        boardInfo._id,
        member.email,
        token
      );
      if (result.status === 200) {
        props.updateBoard(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="main-menu">
      <div className="profile-wrapper">
        <Persona text={member.email} imageUrl={member.avatar} />
      </div>
      <div className="action-wrapper">
        <ul className="action-list">
          <li
            className={classNames({
              disabled: currentUserRole === "MEMBER",
            })}
            onClick={() => setDisplay(CHANGE_PERMISSION)}
          >
            Change Permissions...
          </li>
          <li
            onClick={handleRemoveUser}
            className={classNames({
              disabled:
                currentUserRole === "MEMBER" ||
                (boardInfo.owner === user.email &&
                  user.email === member.email) ||
                boardInfo.owner === member.email,
            })}
          >
            Remove from Board...
          </li>
        </ul>
      </div>
      {boardInfo.owner === user.email && user.email === member.email && (
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
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (data) => dispatch(updateBoard(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
