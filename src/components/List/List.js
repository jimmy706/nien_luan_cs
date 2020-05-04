import React,{useState, useRef, useEffect} from 'react';
import ListHeader from "./ListHeader";
function List(props){
    const [listName,setListName] = useState(props.listInfo.listName);


    return (
        <div className="list-card">
            <ListHeader listName={listName} setListName={setListName}/>
            <div className="list-body">
            </div>
        </div>
    )
}

export default List;