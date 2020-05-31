import React from "react";
import { MAIN_MENU } from "./display-type";
import { Icon } from "office-ui-fabric-react";
import boardColors from "../../constants/board-colors";
import { connect } from "react-redux";
import * as boardAPIs from "../../API/board.api";
import { useCookies } from "react-cookie";
import { updateBoard } from "../../store/actions/board-detail.action";

function ThemeMenu(props) {
  const { setDisplay, boardInfo } = props;
  const [cookies] = useCookies();

  async function handleChangeTheme(theme) {
    const token = cookies.jwt;
    const boardId = boardInfo?._id;
    try {
      const result = await boardAPIs.changreBoardTheme(boardId, theme, token);
      console.log(result);
      if (result.status === 200) {
        props.updateBoard(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function renderThemeColors() {
    return boardColors.map((color) => (
      <li
        onClick={() => handleChangeTheme(color)}
        key={color}
        style={{ background: color }}
      ></li>
    ));
  }

  return (
    <div className="menu-wrapper">
      <div className="menu-header">
        <span
          className="toggle-back"
          title="Back"
          onClick={() => setDisplay(MAIN_MENU)}
        >
          <Icon iconName="ChevronLeft" />
        </span>
        <span className="title">Change Background</span>
        <hr className="line" />
      </div>
      <div>
        <ul className="board-color-lits">{renderThemeColors()}</ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { boardInfo: state.boardDetail.boardInfo };
};

export default connect(mapStateToProps, { updateBoard })(ThemeMenu);
