import React from "react";
import { connect } from "react-redux";

function CardLabels(props) {
  const { cardState, boardDetail } = props;

  function renderLabel() {
    if (cardState.cardDetail && boardDetail.boardInfo) {
      return boardDetail.boardInfo.labels.map((label) => {
        if (cardState.cardDetail.labels.includes(label._id)) {
          return (
            <div
              key={label._id}
              style={{ background: label.color }}
              className="label-box"
            >
              {label.labelName}
            </div>
          );
        }
      });
    }
    return null;
  }

  return (
    <div className="card-labels section-wrapper">
      <h4 className="section-title">Labels: </h4>
      <div className="labels-display-box">{renderLabel()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
    boardDetail: state.boardDetail,
  };
};

export default connect(mapStateToProps, null)(CardLabels);
