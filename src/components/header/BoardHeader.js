import React, {useState} from 'react';
import {Icon} from 'office-ui-fabric-react';
import * as boardAPIs from "../../API/board.api";
import {getAuth} from "../../helpers/auth";
import { PersonaSize, Facepile} from "office-ui-fabric-react";
import Button from "../Button/Button";


function BoardHeader(props) {

    const [boardName, setBoardName] = useState(props.boardDetail.boardName);
    const facepilePersonas = props.boardDetail.members.map(mem => {
        return {
            imageUrl: mem.avatar,
            data: "",
            personaName: mem.email
        }
    });

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
            <div className="board-name-wrapp wrap-box">
                <div className="board-name">
                    <input value={boardName} onChange={changeName} type="text" onBlur={handleSubmit}/>
                    <span className="line"/>
                </div>
                <div className="add-to-fav icon-wrapper" title="Add to favorite">
                    <Icon iconName="FavoriteStar" />
                </div>
            </div>
            <div className="member-wrap wrap-box">
                <Facepile personas={facepilePersonas} personaSize={PersonaSize.size24} />
                <Button>
                    Invite
                </Button>
            </div>
        </div>
    </nav>
}

export default BoardHeader;