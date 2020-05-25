import React from "react";
import { IconButton } from "office-ui-fabric-react";
import { connect } from "react-redux";
import { checkCurrentIsAdmin } from "../../helpers/auth";
import * as cardAPIs from "../../API/card.api";
import { useCookies } from "react-cookie";

function Card(props) {
  const { cardTitle, handleOpenCardModal } = props.card;
  const { boardDetail, user } = props;
  const [cookies] = useCookies();
  function handleOpenModal() {
    props.handleOpenCardModal(props.card._id);
  }

  async function handleDeleteCard() {
    const cardId = props.card._id;
    try {
      const deleteResult = await cardAPIs.removeCard(cardId, cookies.jwt);
      if (deleteResult.status === 200) {
        props.handleRemoveCard(cardId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="card-single">
      <div className="card-content" onClick={handleOpenModal}>
        <div className="card-labels"></div>
        <div className="card-name">{cardTitle}</div>
        <div className="card-content-icons"></div>
      </div>
      <span className="delete-button" title="Remove this card">
        <IconButton
          styles={{ root: { color: "#e0001b!important" } }}
          iconProps={{ iconName: "Delete" }}
          disabled={!checkCurrentIsAdmin(boardDetail.boardInfo, user)}
          onClick={handleDeleteCard}
        />
      </span>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    boardDetail: state.boardDetail,
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Card);
