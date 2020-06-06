import React, { useState } from "react";
import { connect } from "react-redux";
import { Spinner, SpinnerSize, IconButton } from "office-ui-fabric-react";
import CardLabels from "./CardLabels";
import CardDescription from "./CardDescription";
import * as cardAPIs from "../../API/card.api";
import { useCookies } from "react-cookie";
import CardSidebar from "./CardSidebar";
import CardDueDate from "./CardDueDate";
import CardMembers from "./CardMembers";
import CheckList from "./CheckList";

function CardDetailModal(props) {
  const { cardState } = props;
  const { cardDetail, isPending } = cardState;
  const [cookies] = useCookies();

  async function handleChangeCardTitle(e) {
    const value = e.target.value;
    const result = await cardAPIs.changeCardTitle(
      cardDetail._id,
      value,
      cookies.jwt
    );
  }

  function renderCheckList() {
    if (cardState.cardDetail) {
      return cardState.cardDetail.checklist.map((cl) => (
        <CheckList checklist={cl} key={cl._id} />
      ));
    }
    return null;
  }

  return (
    <div className="card-detail">
      {isPending ? (
        <Spinner label="Pending card..." size={SpinnerSize.large} />
      ) : (
        <div className="content">
          <div className={`window-header`}>
            <span className="toggle-close">
              <IconButton
                onClick={props.handleCloseCardModal}
                iconProps={{ iconName: "Cancel" }}
              />
            </span>
            <input
              className={`card-name form-control`}
              defaultValue={cardDetail.cardTitle}
              onBlur={handleChangeCardTitle}
            />
          </div>
          <div className="main-content">
            <div className="card-info-container">
              {cardState.cardDetail && (
                <div className="card-info">
                  {cardState.cardDetail.labels.length > 0 && <CardLabels />}
                  {cardState.cardDetail.dueDate && <CardDueDate />}
                  {cardState.cardDetail.members.length > 0 && <CardMembers />}
                </div>
              )}
              <CardDescription cardDetail={cardState.cardDetail} />
              {cardState.cardDetail.checklist.length > 0 && (
                <div className="section-wrapper">{renderCheckList()}</div>
              )}
            </div>
            <CardSidebar />
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
    boardDetail: state.boardDetail,
  };
};

export default connect(mapStateToProps, null)(CardDetailModal);
