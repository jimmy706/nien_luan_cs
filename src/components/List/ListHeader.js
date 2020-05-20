import React, {useEffect, useRef, useState} from 'react';
import {Icon} from "office-ui-fabric-react";

function ListHeader(props) {
    const inputNameRef = useRef(null);
    const [openInput, setOpenInput] = useState(false);
    const [openHiddenMenu, setOpenHiddenMenu] = useState(false);

    function handleOpenInput() {
        setOpenInput(true);
    }


    useEffect(()=>{
        if(openInput){
            inputNameRef.current.focus();
        }
    },[openInput]);

    function handleChangeListName(e){
        props.setListName(e.target.value);
        setOpenInput(false);
    }

    function handleOpenCardForm() {
        setOpenHiddenMenu(false);
        props.setOpenForm(true);
    }

    async function handleDeleteList() {
       props.deleteList(props.listInfo._id);
       setOpenHiddenMenu(false);
    }

    return (
        <div className="list-header">
            <div className="list-name-wrapper" onClick={handleOpenInput}>
                <input className="list-name form-control" defaultValue={props.listInfo.listName} disabled={!openInput ? 'disabled' : ''}
                       ref={inputNameRef}
                       onBlur={handleChangeListName}
                />
            </div>
            <span className="toggle-menu" onClick={()=>setOpenHiddenMenu(!openHiddenMenu)}>
                <Icon iconName="More"/>
            </span>
            <div className={`hidden-menu ${openHiddenMenu ? 'open' : ''}`}>
                <div className="menu-header">
                    <span>
                        List Action
                    </span>
                    <span className="toggle-close" onClick={()=>setOpenHiddenMenu(false)}>
                        <Icon iconName="ChromeClose"/>
                    </span>
                    <hr className="line"/>
                </div>
                <div className="menu-body">
                    <ul className="action-list">
                        <li onClick={handleOpenCardForm}>
                            Add card...
                        </li>
                        <li onClick={()=>{
                            handleOpenInput();
                            setOpenHiddenMenu(false);
                        }}>
                            Change list name
                        </li>
                        <li onClick={handleDeleteList}>
                            Delete list
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
ListHeader.defaultProps = {
    listName: ""
};

export default ListHeader;