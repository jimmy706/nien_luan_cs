import React,{useState} from 'react';
import {Icon, TextField, PrimaryButton, IconButton} from "office-ui-fabric-react";


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

    function handleAddCard() {

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