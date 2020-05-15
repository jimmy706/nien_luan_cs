import React,{useState} from 'react';
import {Icon, TextField, PrimaryButton, IconButton} from "office-ui-fabric-react";
import * as cardAPIs from "../../API/card.api";


function ListFooter(props) {
    const [openForm, setOpenForm] = useState(false);
    const [cardName, setCardName] = useState('');

    function handleCloseForm() {
        setOpenForm(false);
    }

    function handleOpenForm() {
        setOpenForm(true);
    }

    function handleChangeName(e) {
        setCardName(e.target.value);
    }

    async function handleAddCard() {

        if(props.listInfo) {
           const newCardResult = await cardAPIs.addNewCard(props.listInfo._id, cardName);
           console.log(newCardResult.data);
           setOpenForm(false);
        }
    }

    function renderForm() {
        return (
            <form className="add-card-form">
                <TextField placeholder="Enter a card title..." value={cardName} onChange={handleChangeName}/>
                <div className="button-wrapper">
                    <span style={{
                        marginRight: "10px"
                    }}>
                        <IconButton
                            onClick={handleCloseForm}
                            iconProps={{
                                iconName: 'ChromeClose'
                            }} title="Close form" ariaLabel="Close form" />
                    </span>
                    <PrimaryButton text="Add card" onClick={handleAddCard}/>
                </div>
            </form>
        )
    }

    return (
        <div className="list-footer">
            {
                !openForm ? (
                <div className="toggle-form" onClick={handleOpenForm}>
                    <Icon iconName="Add"/> Add another card
                </div>
                ): null
            }
            {
                openForm ? renderForm() : null
            }
        </div>
    )
}

export default ListFooter;