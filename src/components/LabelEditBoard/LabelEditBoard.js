import React from "react";
import {
  TextField,
  Label,
  DefaultButton,
  PrimaryButton,
} from "office-ui-fabric-react";
import labelColors from "../../constants/label-colors";

function LabelEditBoard(props) {
  const { boardType, onCreate, labelInfo, onUpdate } = props;

  function checkedColor(color) {
    if (labelInfo) {
      return color === labelInfo.color;
    }
    return color === "#61bd50";
  }

  function renderLabelColors() {
    return labelColors.map((color) => (
      <div key={color} className="color-wrapper">
        <input
          defaultChecked={checkedColor(color)}
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
    } else {
      onUpdate({ name, color });
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
        defaultValue={labelInfo?.labelName}
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
            <DefaultButton
              onClick={() => props.onDelete(labelInfo?._id)}
              type="button"
              text="Delete"
            />
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
  onDelete: (labelId) => {},
  labelInfo: null,
};
