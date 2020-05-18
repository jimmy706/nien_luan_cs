import React from 'react';

function Card(props) {
    const { cardTitle } = props.card;

    return <div className="card-single">
        <div className="card-labels">

        </div>
        <div className="card-name">
            {cardTitle}
        </div>
        <div className="card-content-icons">

        </div>
    </div>
}

export default Card;