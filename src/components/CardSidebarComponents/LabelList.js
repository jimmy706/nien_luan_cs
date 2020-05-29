import React from "react";
import { connect } from "react-redux";
import { Icon } from "office-ui-fabric-react";
import { useCookies } from "react-cookie";
import * as cardAPIs from "../../API/card.api";
import { updateCard } from "../../store/actions/card.action";

function LabelList(props) {
  const [cookies] = useCookies();
  const { cardState, boardDetail } = props;

  async function handleChoiceLabel(labelId) {
    const token = cookies.jwt;
    const cardId = cardState.cardDetail._id;
    try {
      if (!cardState.cardDetail.labels.includes(labelId)) {
        const result = await cardAPIs.addLabel(cardId, labelId, token);
        if (result.status === 200) {
          props.updateCard(result.data);
        }
      } else {
        const result = await cardAPIs.removeLabel(cardId, labelId, token);
        if (result.status === 200) {
          props.updateCard(result.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  function renderLabelList() {
    if (cardState.cardDetail && boardDetail.boardInfo) {
      return boardDetail.boardInfo.labels.map((label) => {
        return (
          <li
            onClick={() => handleChoiceLabel(label._id)}
            style={{ background: label.color }}
            className="label-item"
            key={label._id}
          >
            {label.labelName}{" "}
            {cardState.cardDetail.labels.includes(label._id) && (
              <Icon iconName="CheckMark" />
            )}
          </li>
        );
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateCard: (data) => dispatch(updateCard(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelList);
