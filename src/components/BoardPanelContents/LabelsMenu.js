import React, { useState } from "react";
import { Icon } from "office-ui-fabric-react";
import { MAIN_MENU } from "./display-type";
import LabelEditBoard from "../LabelEditBoard/LabelEditBoard";
import { connect } from "react-redux";
import * as boardAPIs from "../../API/board.api";
import { useCookies } from "react-cookie";
import { updateBoard } from "../../store/actions/board-detail.action";

function LabelMenu(props) {
  const { setDisplay, boardInfo } = props;
  const [openEditLabel, setOpenEditLabel] = useState(false);
  const [labelBoardType, setLabelBoardType] = useState("create");
  const [cookies] = useCookies();

  async function handleCreateNewLabel({ name, color }) {
    const token = cookies.jwt;
    const boardId = boardInfo?._id;
    try {
      const result = await boardAPIs.addLabel(
        boardId,
        { labelName: name, color },
        token
      );
      if (result.status === 200) {
        setOpenEditLabel(false);
        updateBoard(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function renderLabels() {
    return boardInfo
      ? boardInfo.labels.map((label) => (
          <li
            style={{ background: label.color }}
            key={label._id}
            className="label-item"
          >
            <span>{label.labelName}</span>
            <span className="toggle-edit">
              <Icon iconName="Edit" />
            </span>
          </li>
        ))
      : null;
  }

  return (
    <div className="menu-wrapper">
      {openEditLabel ? (
        <div>
          <div className="menu-header">
            <span
              className="toggle-back"
              onClick={() => setOpenEditLabel(false)}
            >
              <Icon iconName="ChevronLeft" />
            </span>
            <span className="title">
              {labelBoardType === "create" ? "Create label" : "Edit label"}
            </span>
            <hr className="line" />
          </div>
          <LabelEditBoard
            onCreate={handleCreateNewLabel}
            boardType={labelBoardType}
          />
        </div>
      ) : (
        <div>
          <div className="menu-header">
            <span className="toggle-back" onClick={() => setDisplay(MAIN_MENU)}>
              <Icon iconName="ChevronLeft" />
            </span>
            <span className="title">Labels</span>
            <hr className="line" />
          </div>
          <ul className="label-list action-list">
            {renderLabels()}
            <li
              className="action-box text-center"
              onClick={() => {
                setOpenEditLabel(true);
                setLabelBoardType("create");
              }}
            >
              Create new label
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    boardInfo: state.boardDetail.boardInfo,
  };
};

export default connect(mapStateToProps, { updateBoard })(LabelMenu);
