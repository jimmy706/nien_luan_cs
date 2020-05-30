import React from "react";
import { IconButton, Icon } from "office-ui-fabric-react";
import { connect } from "react-redux";
import { checkCurrentIsAdmin } from "../../helpers/auth";
import * as cardAPIs from "../../API/card.api";
import { useCookies } from "react-cookie";
import moment from "moment";

function Card(props) {
  const { card } = props;
  const { cardTitle, description, dueDate } = card;
  const { boardDetail, user } = props;
  const [cookies] = useCookies();
  function handleOpenModal() {
    props.handleOpenCardModal(card._id);
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

  function renderLabels() {
    if (boardDetail.boardInfo) {
      return boardDetail.boardInfo.labels.map((label) => {
        if (card.labels.includes(label._id)) {
          return (
            <div
              key={label._id}
              style={{ background: label.color }}
              className="label-box"
              title={card.labelName}
            >
              {label.labelName}
            </div>
          );
        }
      });
    }
    return null;
  }

  function renderMembers() {
    if (boardDetail.boardInfo) {
      return boardDetail.boardInfo.members.map((mem) => {
        if (card.members.includes(mem.email)) {
          return (
            <div
              title={mem.email}
              key={`member-${mem._id}`}
              className="member-avatar-wrapper"
            >
              <img src={mem.avatar} alt="member avatar" className="full-img" />
            </div>
          );
        }
      });
    }
  }

  function isLate(date) {
    if (new Date(date).getTime() > new Date().getTime()) {
      return false;
    }
    return true;
  }

  return (
    <div className="card-single">
      <div className="card-content" onClick={handleOpenModal}>
        {card.labels.length > 0 && (
          <div className="card-labels">{renderLabels()}</div>
        )}
        <div className="card-name">{cardTitle}</div>
        <div className="card-content-icons">
          {description && (
            <Icon iconName="TextDocument" title="This card has description" />
          )}
          {dueDate && (
            <div
              className="due-date-wrapper"
              style={{ background: isLate(dueDate) ? "#ff9f1a" : "#61bd50" }}
            >
              {moment(dueDate).format("DD/MM/YYYY")}
            </div>
          )}
        </div>
        <div style={{ marginTop: "10px" }} className="members-wrapper">
          {renderMembers()}
        </div>
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
