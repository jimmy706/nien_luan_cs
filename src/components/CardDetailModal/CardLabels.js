import React, {useState} from 'react';
import {IconButton} from "office-ui-fabric-react";

function CardLabels(props) {
    const [labels, setLabels] = useState([]);

    return (
        <div className="card-labels section-wrapper">
            <h4 className="section-title">Labels: </h4>
            <IconButton iconProps={{iconName: "Add"}}/>
        </div>
    )
}

export default CardLabels;