import React, {useEffect, useRef, useState} from 'react';
import {Icon} from "office-ui-fabric-react";
import * as listAPIs from "../../API/list.api";

function ListHeader(props) {

    function handleOpenInput() {
        setOpenInput(true);
    }
    const inputNameRef = useRef(null);
    const [openInput, setOpenInput] = useState(false);
    const [openHiddenMenu, setOpenHiddenMenu] = useState(false);

    useEffect(()=>{
        if(openInput){
            inputNameRef.current.focus();
        }
    },[openInput]);

    function handleChangeListName(e){
        props.setListName(e.target.value);
        setOpenInput(false);
    }

    return (
        <div className="list-header">
            <div className="list-name-wrapper" onClick={handleOpenInput}>
                <input className="list-name" defaultValue={props.listName} disabled={!openInput ? 'disabled' : ''}
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
                        <li>
                            Add card...
                        </li>
                        <li onClick={handleOpenInput}>
                            Change list name
                        </li>
                        <li>
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