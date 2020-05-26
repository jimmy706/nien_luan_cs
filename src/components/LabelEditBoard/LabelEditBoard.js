import React from "react";
import {
  TextField,
  Label,
  DefaultButton,
  PrimaryButton,
} from "office-ui-fabric-react";
import labelColors from "../../constants/label-colors";

function LabelEditBoard(props) {
  const { boardType, onCreate } = props;

  function renderLabelColors() {
    return labelColors.map((color) => (
      <div key={color} className="color-wrapper">
        <input
          defaultChecked={color === "#61bd50"}
          type="radio"
          name="color"
          id={color}
          value={color}
        />
        <label htmlFor={color} style={{ background: color }}></label>
      </div>
    ));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target["name"].value;
    const color = e.target["color"].value;
    if (boardType === "create") {
      onCreate({ name, color });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="label-edit-board">
      <TextField
        autoComplete="off"
        placeholder="Label name"
        label="Name"
        name="name"
        autoFocus
        required
      />
      <div className="form-group">
        <Label>Select a color</Label>
        <div className="color-choice-group">{renderLabelColors()}</div>
      </div>
      <div className="button-wrapper">
        {boardType === "create" ? (
          <PrimaryButton text="Create" type="submit" />
        ) : (
          <>
            <PrimaryButton text="Save" type="submit" />
            <DefaultButton type="button" text="Delete" />
          </>
        )}
      </div>
    </form>
  );
}

export default LabelEditBoard;

LabelEditBoard.defaultProps = {
  boardType: "create",
  onCreate: ({ name, color }) => {},
  onUpdate: ({ name, color }) => {},
  labelInfo: null,
};
