import React from 'react';
import Link from "next/link";
import {CommandBar} from "office-ui-fabric-react";
import {deleteBoardAction} from "../../redux/actions/boards.action";
import {connect} from "react-redux";
function BoardCard(props) {
    const {theme,boardName, _id} = props.board;
    const overflowItem = [
        { key: 'view', text: 'View detail', onClick: () => console.log('Move to'), iconProps: { iconName: 'RedEye' } },
        { key: 'delete', text: 'Delete board', onClick: () => props.deleteBoardAction(_id), iconProps: { iconName: 'RemoveFromTrash' } },
    ];
    return (
        <div className="board-card" style={{
            background: theme
        }}>
            <div className={"dropdown-container"}>
                <CommandBar
                    overflowItems={overflowItem}
                />
            </div>
            <Link href={"/boards/detail/" + _id}>
                <a className="board-name">
                    <h3>
                        {boardName}
                    </h3>
                </a>
            </Link>
        </div>
    )
}

export default connect(null,{deleteBoardAction})(BoardCard);