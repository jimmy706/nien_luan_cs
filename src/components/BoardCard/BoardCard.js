import React from 'react';
import Link from "next/link";

function BoardCard(props) {
    const {theme,boardName, _id} = props.board;
    return (
        <div className="board-card" style={{
            background: theme
        }}>
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

export default BoardCard;