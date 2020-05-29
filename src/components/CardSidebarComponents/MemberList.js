import React from "react";
import { connect } from "react-redux";
import { Persona, PersonaSize } from "office-ui-fabric-react";

function MemberList(props) {
  const { cardState, boardDetail } = props;

  async function handleClick(mem) {}

  function renderMemberList() {
    if (cardState.cardDetail && boardDetail.boardInfo) {
      return boardDetail.boardInfo.members.map((mem) => (
        <li key={mem._id}>
          <Persona
            imageUrl={mem.avatar}
            text={mem.email}
            size={PersonaSize.size32}
          />
        </li>
      ));
    }
    return null;
  }

  return (
    <div className="member-choice-wrapper">
      <ul>{renderMemberList()}</ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
    boardDetail: state.boardDetail,
  };
};

export default connect(mapStateToProps, null)(MemberList);
