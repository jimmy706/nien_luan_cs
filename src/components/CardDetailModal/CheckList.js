import React, { useState, useRef } from "react";
import {
  DefaultButton,
  PrimaryButton,
  TextField,
  IconButton,
  Checkbox,
  ProgressIndicator,
} from "office-ui-fabric-react";
import { connect } from "react-redux";
import * as cardAPIs from "../../API/card.api";
import { useCookies } from "react-cookie";
import { updateCard } from "../../store/actions/card.action";

function CheckList(props) {
  const { checklist, cardState } = props;
  const [openAddItem, setOpenAddItem] = useState(false);
  const [list, setList] = useState(checklist.list ? checklist.list : []);
  const inputEl = useRef(null);
  const [itemName, setItemName] = useState("");
  const [cookies] = useCookies();
  function handleOpenForm() {
    setOpenAddItem(true);
    inputEl.current.focus();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      name: itemName,
      checked: false,
    };
    setList([...list, newItem]);

    const data = {
      checklistId: checklist._id,
      list: [...list, newItem],
      checklistName: checklist.checklistName,
    };
    const cardId = cardState.cardDetail._id;
    const token = cookies.jwt;

    try {
      const result = await cardAPIs.updateChecklist(cardId, data, token);
      if (result.status === 200) {
        props.updateCard(result.data);
        setItemName("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCheck(index, value) {
    let newList = list.map((item, i) => {
      if (i === index) {
        item.checked = value;
      }
      return item;
    });
    const cardId = cardState.cardDetail._id;
    const token = cookies.jwt;
    const data = {
      checklistId: checklist._id,
      list: newList,
      checklistName: checklist.checklistName,
    };
    setList(newList);
    try {
      const result = await cardAPIs.updateChecklist(cardId, data, token);
      if (result.status === 200) {
        props.updateCard(result.data);
        setItemName("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveItem(index) {
    let newList = list.filter((item, i) => i !== index);
    setList(newList);
     const cardId = cardState.cardDetail._id;
     const token = cookies.jwt;
     const data = {
       checklistId: checklist._id,
       list: newList,
       checklistName: checklist.checklistName,
     };
     try {
       const result = await cardAPIs.updateChecklist(cardId, data, token);
       if (result.status === 200) {
         props.updateCard(result.data);
         setItemName("");
       }
     } catch (err) {
       console.log(err);
     }
  }

  function renderCheckbox() {
    return list.map((item, index) => (
      <li key={`item-${item.name}-${index}`}>
        <Checkbox
          label={item.name}
          defaultChecked={item.checked}
          onChange={(e, isChecked) => handleCheck(index, isChecked)}
        />
        <IconButton
          iconProps={{ iconName: "Delete" }}
          styles={{ root: { color: "rgb(224, 0, 27)!important" } }}
          title="Remove item"
          onClick={() => handleRemoveItem(index)}
        />
      </li>
    ));
  }

  async function handleRemoveChecklist() {
    const cardId = cardState.cardDetail._id;
    const token = cookies.jwt;
    const checklistId = checklist._id;

    try {
      const result = await cardAPIs.removeChecklist(cardId, checklistId, token);
      if (result.status === 200) {
        props.updateCard(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function calcPercentComplete() {
    if(list.length < 1) {
      return 0;
    }
    let countCheck = 0;
    let itemLength = list.length;
    for (let item of list) {
      if (item.checked) {
        countCheck++;
      }
    }
    return countCheck / itemLength;
  }

  return (
    <div className="checklist-wrapper">
      <div className="checklist-header">
        <h4 className="section-title">{checklist.checklistName}</h4>
        <DefaultButton text="Delete" onClick={handleRemoveChecklist} />
      </div>
      <div className="checklist-body">
        <div>
          <ProgressIndicator
            label={`${parseInt(calcPercentComplete() * 100)}%`}
            percentComplete={calcPercentComplete()}
          />
        </div>
        <ul className="checlist-items">{renderCheckbox()}</ul>
        <form
          onSubmit={handleSubmit}
          style={{ display: openAddItem ? "block" : "none" }}
        >
          <TextField
            className="form-control"
            componentRef={inputEl}
            placeholder="Add an item"
            name="itemName"
            autoComplete="off"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <div className="button-wrapper">
            <PrimaryButton text="Add" type="submit" />
            <IconButton
              type="button"
              iconProps={{ iconName: "Cancel" }}
              onClick={() => setOpenAddItem(false)}
            />
          </div>
        </form>
        {!openAddItem && (
          <DefaultButton text="Add an item" onClick={handleOpenForm} />
        )}
      </div>
    </div>
  );
}

CheckList.defaultProps = {
  checklist: {
    checklistName: "",
    list: [],
  },
};

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
  };
};

export default connect(mapStateToProps, { updateCard })(CheckList);
