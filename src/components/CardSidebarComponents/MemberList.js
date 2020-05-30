import React, { useState } from "react";
import { connect } from "react-redux";
import { Persona, PersonaSize, Icon } from "office-ui-fabric-react";
import * as cardAPIs from "../../API/card.api";
import { useCookies } from "react-cookie";
import { updateCard } from "../../store/actions/card.action";

function MemberList(props) {
  const { cardState, boardDetail } = props;
  const [cookies] = useCookies();
  const [members, setMembers] = useState(
    cardState.cardDetail ? cardState.cardDetail.members : []
  );

  async function handleClick(mem) {
    let data = [];
    if (!members.includes(mem.email)) {
      data = [...members, mem.email];
    } else {
      data = members.filter((email) => email !== mem.email);
    }
    setMembers(data);
    const token = cookies.jwt;
    const cardId = cardState.cardDetail._id;
    try {
      const result = await cardAPIs.updateMembers(cardId, data, token);
      if (result.status === 200) {
        props.updateCard(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function renderMemberList() {
    if (cardState.cardDetail && boardDetail.boardInfo) {
      return boardDetail.boardInfo.members.map((mem) => (
        <li
          className="member-item"
          onClick={() => handleClick(mem)}
          key={mem._id}
        >
          <Persona
            imageUrl={mem.avatar}
            text={mem.email}
            size={PersonaSize.size32}
          />
          {members.includes(mem.email) && <Icon iconName="CheckMark" />}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateCard: (data) => dispatch(updateCard(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
