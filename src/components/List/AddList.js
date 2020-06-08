import React, { useState } from "react";
import {
  Icon,
  TextField,
  PrimaryButton,
  IconButton,
} from "office-ui-fabric-react";
import {connect} from 'react-redux';
import { checkCurrentIsAdmin } from "../../helpers/auth";

function AddList(props) {
  const { boardDetail, user } = props;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  function handleOpenForm() {
    setOpen(true);
  }

  function handleCloseForm() {
    setOpen(false);
  }

  function handleChangeInput(e) {
    setName(e.target.value);
  }

  function handleAddNewList(e) {
    e.preventDefault();
    props.addNewList(name);
    setOpen(false);
    setName("");
  }

  function renderForm() {
    return (
      <form className="add-list-form" onSubmit={handleAddNewList}>
        <TextField
          autoComplete="off"
          placeholder="Enter list title..."
          value={name}
          onChange={handleChangeInput}
        />
        <div className="button-wrapper">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            <IconButton
              onClick={handleCloseForm}
              iconProps={{
                iconName: "ChromeClose",
              }}
              title="Close form"
              ariaLabel="Close form"
              type="button"
            />
          </span>
          <PrimaryButton
            text="Add list"
            type={"submit"}
            disabled={!checkCurrentIsAdmin(boardDetail.boardInfo, user)}
          />
        </div>
      </form>
    );
  }

  return (
    <div className={"add-list-wrapper"}>
      {!open ? (
        <span className="toggle-form" onClick={handleOpenForm}>
          <Icon iconName="Add" /> Add another list
        </span>
      ) : null}
      {open ? renderForm() : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    boardDetail: state.boardDetail,
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(AddList);
