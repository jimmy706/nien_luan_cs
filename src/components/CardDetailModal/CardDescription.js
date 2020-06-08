import React, { useState } from "react";
import { IconButton, PrimaryButton, TooltipHost } from "office-ui-fabric-react";
import TextareaAutosize from "react-autosize-textarea";
import showdown from "showdown";
import { useCookies } from "react-cookie";
import * as cardAPIs from "../../API/card.api";

function CardDescription(props) {
  const { description } = props.cardDetail;
  const [desc, setDesc] = useState(description ? description : "");
  const [cookies] = useCookies();
  const [openForm, setOpenForm] = useState(false);
  const converter = new showdown.Converter();
  const html = converter.makeHtml(desc);

  function handleChangeDesc(e) {
    setDesc(e.target.value);
  }

  async function handleSubmitDesc(e) {
    e.preventDefault();
    const token = cookies.jwt;
    const cardId = props.cardDetail._id;
    const updateResult = await cardAPIs.updateCardDescription(
      cardId,
      desc,
      token
    );
    if (updateResult.status === 200) {
      setOpenForm(false);
    }
  }

  function handleOpenForm() {
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
  }

  return (
    <div className="card-desc section-wrapper">
      <h4 className="section-title">
        <TooltipHost id="tooltip-desc" content="Support markdown format">
          Description:
        </TooltipHost>
      </h4>
      {!openForm &&
        (desc.trim() ? (
          <div
            onClick={handleOpenForm}
            className="desc-display"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <div onClick={handleOpenForm} className="empty-desc">
            Add a more detail description...
          </div>
        ))}

      <form
        style={{ display: `${openForm ? "block" : "none"}` }}
        onSubmit={handleSubmitDesc}
      >
        <TextareaAutosize
          className="desc-content form-control"
          placeholder="Add a more detail description..."
          onChange={handleChangeDesc}
          value={desc}
          autoFocus
        />
        <div className="button-wrapper">
          <IconButton
            type="button"
            iconProps={{ iconName: "Cancel" }}
            onClick={handleCloseForm}
          />
          <PrimaryButton text="Save" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default CardDescription;
