import React, {useState} from 'react';
import {Icon, TextField, PrimaryButton, IconButton} from "office-ui-fabric-react";

function AddList(props) {
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

    function renderForm() {
        return (
            <form className="add-list-form">
                <TextField placeholder="Enter list title..." value={name} onChange={handleChangeInput}/>
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
                    <PrimaryButton text="Add list" onClick={()=>props.addNewList(name)}/>
                </div>
            </form>
        )
    }

    return (
        <div className={"add-list-wrapper"}>
            {!open ? <span className="toggle-form" onClick={handleOpenForm}><Icon iconName="Add"/> Add another list</span> : null}
            {open ? renderForm() : null}
        </div>
    )
}

export default AddList;