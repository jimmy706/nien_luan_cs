import React from 'react';
import {Icon} from 'office-ui-fabric-react';

function BoardHeader(props) {
    const { boardName } = props;

    function changeName(e) {

    }
    
    return <nav className="board-header">
        <div className="container-fluid">
            <div className="board-name-wrapp">
                <div className="board-name">
                    <input value={boardName} onChange={changeName} type="text"/>
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