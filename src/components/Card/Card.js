import React from 'react';

function Card(props) {
    const { cardTitle,handleOpenCardModal } = props.card;

    function handleOpenModal() {
        props.handleOpenCardModal(props.card._id);
    }

    return <div className="card-single" onClick={handleOpenModal}>
        <div className="card-labels">

        </div>
        <div className="card-name" >
            {cardTitle}
        </div>
        <div className="card-content-icons">

        </div>
    </div>
}

export default Card;