import React from "react";
import { connect } from "react-redux";

function LabelList(props) {
  const { cardState, boardDetail } = props;

  function renderLabelList() {
    if (cardState && boardDetail) {
      return boardDetail.boardInfo.labels.map((label) => {
        if (!cardState.cardDetail.labels.includes(label._id)) {
          return (
            <li
              style={{ background: label.color }}
              className="label-item"
              key={label._id}
            >
              {label.labelName}
            </li>
          );
        }
      });
    }
    return null;
  }

  return (
    <div className="label-choice-wrapper">
      <ul>{renderLabelList()}</ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
    boardDetail: state.boardDetail,
  };
};

export default connect(mapStateToProps, null)(LabelList);
