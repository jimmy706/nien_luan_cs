import React from "react";
import { connect } from "react-redux";

function CardMembers(props) {
  const { cardState, boardDetail } = props;

  function renderMembers() {
    if (cardState.cardDetail && boardDetail.boardInfo) {
      return boardDetail.boardInfo.members.map((mem) => {
        if (cardState.cardDetail.members.includes(mem.email)) {
          return (
            <div
              key={mem._id}
              title={mem.email}
              className="member-avatar-wrapper"
            >
              <img className="full-img" src={mem.avatar} />
            </div>
          );
        }
      });
    }

    return null;
  }

  return (
    <div className="card-members section-wrapper">
      <h4 className="section-title">Members: </h4>
      <div className="member-display-box">{renderMembers()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
    boardDetail: state.boardDetail,
  };
};

export default connect(mapStateToProps, null)(CardMembers);
