import React, { useState } from "react";
import { connect } from "react-redux";
import {
  TextField,
  DefaultButton,
  PrimaryButton,
} from "office-ui-fabric-react";
import { updateCard } from "../../store/actions/card.action";
import * as cardAPIs from "../../API/card.api";
import { useCookies } from "react-cookie";

function CheckList(props) {
  const [cookies] = useCookies();

  const { cardState } = props;
  const [checklistName, setChecklistName] = useState(
    cardState.cardDetail
      ? cardState.cardDetail.checklist.checklistName
        ? cardState.cardDetail.checklist.checklistName
        : ""
      : ""
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const cardId = cardState.cardDetail?._id;
    const token = cookies.jwt;

    try {
      const result = await cardAPIs.addCheckList(cardId, checklistName, token);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  function handleChangeInput(e) {
    setChecklistName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="check-list-board">
      <TextField
        value={checklistName}
        onChange={handleChangeInput}
        placeholder="Create checklist"
        name="checklistName"
        autoComplete="off"
      />
      <div style={{ textAlign: "right", marginTop: "15px" }}>
        <PrimaryButton type="submit" text="Save" />
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
  };
};

export default connect(mapStateToProps, { updateCard })(CheckList);
