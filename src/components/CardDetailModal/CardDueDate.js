import React from "react";
import { connect } from "react-redux";
import { DatePicker } from "office-ui-fabric-react";
import moment from "moment";

function CardDueDate(props) {
  const { cardState } = props;

  return (
    <div className="section-wrapper">
      <h4 className="section-title">Due Date: </h4>
      {cardState.cardDetail && cardState.cardDetail.dueDate && (
        <DatePicker
          value={new Date(cardState.cardDetail.dueDate)}
          formatDate={(date) => moment(date).format("DD/MM/YYYY")}
          disabled={true}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
  };
};

export default connect(mapStateToProps, null)(CardDueDate);
