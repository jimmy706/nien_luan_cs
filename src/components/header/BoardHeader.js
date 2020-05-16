import React, {useState} from 'react';
import {Icon} from 'office-ui-fabric-react';
import * as boardAPIs from "../../API/board.api";
import {getAuth} from "../../helpers/auth";

function BoardHeader(props) {
    const [boardName, setBoardName] = useState(props.boardName);

    function changeName(e) {
        setBoardName(e.target.value);
    }

    async function handleSubmit() {
       try {
           const result = await boardAPIs.changeBoardName(props.boardId, boardName, {
               headers: {
                   'Authorization': `${getAuth().token}`
               }
           });
       }
       catch (e) {
           console.log(e);
       }
    }
    
    return <nav className="board-header">
        <div className="container-fluid">
            <div className="board-name-wrapp">
                <div className="board-name">
                    <input defaultValue={props.boardName} onChange={changeName} type="text" onBlur={handleSubmit}/>
                    <span className="line"/>
                </div>
                <div className="add-to-fav icon-wrapper" title="Add to favorite">
                    <Icon iconName="FavoriteStar" />
                </div>
            </div>
        </div>
    </nav>
}

export default BoardHeader;