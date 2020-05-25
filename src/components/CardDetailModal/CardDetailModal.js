import React, { useState } from "react";
import { connect } from "react-redux";
import { Spinner, SpinnerSize, IconButton } from "office-ui-fabric-react";
import CardLabels from "./CardLabels";
import CardDescription from "./CardDescription";
import { Icon } from "office-ui-fabric-react";
import * as cardAPIs from "../../API/card.api";
import { useCookies } from "react-cookie";

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
              <CardLabels />
              <CardDescription cardDetail={cardState.cardDetail} />
            </div>
            <div className="card-sidebar">
              <h2 className="section-title">CARD ACTIONS</h2>
              <ul className="action-list">
                <li>
                  <Icon iconName="Contact" /> Members
                </li>
                <li>
                  <Icon iconName="Label" /> Labels
                </li>
                <li>
                  <Icon iconName="CheckList" /> Checklist
                </li>
                <li>
                  <Icon iconName="DateTime" /> Due Date
                </li>
              </ul>
            </div>
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
