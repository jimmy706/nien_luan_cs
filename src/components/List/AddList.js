import React from 'react';
import {Icon} from "office-ui-fabric-react";;

function AddList(props) {
    return (
        <div className={"add-list-wrapper"}>
            <span className="toggle-form"><Icon iconName="Add"/> Add another list</span>
            <form>

            </form>
        </div>
    )
}

export default AddList;