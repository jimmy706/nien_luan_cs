import React from "react";
import { Icon } from "office-ui-fabric-react";
import { MAIN_CONTENT } from "./display-type";
import classNames from "classnames";
import { connect } from "react-redux";
import * as boardAPI from "../../API/board.api";
import { updateBoard } from "../../store/actions/board-detail.action";
import { useCookies } from "react-cookie";

function ChangePermissonMenu(props) {
  const [cookies] = useCookies();
  const { member, setDisplay, boardDetail, user } = props;
  const { boardInfo } = boardDetail;

  async function handleChangePermission(role) {
    const token = cookies.jwt;
    try {
      const result = await boardAPI.changeMemberRole(
        boardInfo._id,
        member.email,
        role,
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
          <li
            onClick={() => handleChangePermission("ADMIN")}
            className={classNames({ disabled: member.role === "ADMIN" })}
          >
            <p className="member-type">
              Admin {member.role === "ADMIN" && <Icon iconName="CheckMark" />}
            </p>
            <p className="member-desc">
              Can view and edit cards, remove members and change all settings
              for the board
            </p>
          </li>
          <li
            onClick={() => handleChangePermission("MEMBER")}
            className={classNames({
              disabled:
                member.role === "MEMBER" || boardInfo.owner === member.email,
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
        {boardInfo.owner === user.email && member.email === user.email && (
          <div className="message-wrapper">
            <hr className="line" />
            <p>
              You can't change your role to Member because you're the owner of
              this Board
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
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (data) => dispatch(updateBoard(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePermissonMenu);
