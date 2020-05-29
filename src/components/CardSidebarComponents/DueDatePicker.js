import React, { useState } from "react";
import { DatePicker, DefaultButton } from "office-ui-fabric-react";
import moment from "moment";
import { useCookies } from "react-cookie";
import * as cardAPIs from "../../API/card.api";
import { connect } from "react-redux";
import { updateCard } from "../../store/actions/card.action";

function DueDatePicker(props) {
  const [cookies] = useCookies();
  const { cardState } = props;

  const [dueDate, setDueDate] = useState(
    cardState.cardDetail
      ? cardState.cardDetail.dueDate
        ? new Date(cardState.cardDetail.dueDate)
        : null
      : null
  );
  async function handleChangeDate(date) {
    setDueDate(date);
    const cardId = cardState.cardDetail?._id;
    const token = cookies.jwt;
    try {
      const result = await cardAPIs.updateCardDueDate(cardId, date, token);
      if (result.status === 200) {
        props.updateCard(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClearDate() {
    setDueDate(null);
    const cardId = cardState.cardDetail?._id;
    const token = cookies.jwt;
    try {
      const result = await cardAPIs.updateCardDueDate(cardId, null, token);
      if (result.status === 200) {
        props.updateCard(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="due-date-picker">
      <DatePicker
        placeholder="Select a day"
        showMonthPickerAsOverlay={true}
        value={dueDate}
        onSelectDate={handleChangeDate}
        formatDate={(d) => moment(d).format("DD/MM/YYYY")}
      />
      <div style={{ textAlign: "right", marginTop: "15px" }}>
        <DefaultButton text="Delete" onClick={handleClearDate} />
      </div>
    </div>
  );
}

DueDatePicker.defaultProps = {
  dueDate: null,
};

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCard: (data) => dispatch(updateCard(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DueDatePicker);
