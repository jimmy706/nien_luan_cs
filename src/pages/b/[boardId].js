import React, { useState } from 'react';
import  {useRouter} from "next/router";
import Header from "../../components/header/Header";
import BoardHeader from "../../components/header/BoardHeader";
import axios from 'axios';
import {GET_BOARD_DETAIL_URL} from "../../constants/APIs";
import AddList from "../../components/List/AddList";
import {ADD_NEW_LIST_URL} from "../../constants/APIs";

function BoardDetail(props) {
    const router = useRouter();
    const [boardState,setBoardState] = useState(props.boardDetail);

    async function addNewList(listName) {
        try {
            const result = axios.post(`${ADD_NEW_LIST_URL}/${boardState._id}`);
            console.log(result.data);
        }
        catch (e) {
            console.log(e.response);
        }
    }


    return (
        <div className={"board-detail-page"} style={{minHeight:"100vh", backgroundColor: boardState.theme}}>
            <Header/>
            <BoardHeader boardName={boardState.boardName}/>
            <div className="board-content">
                <div className="container-fluid">
                    <AddList/>
                </div>
            </div>
        </div>
    )
}

BoardDetail.getInitialProps = async context => {
    const {boardId} = context.query;
    const boardDetail = await axios(`${GET_BOARD_DETAIL_URL}/${boardId}`);
    return {
        boardDetail: boardDetail.data
    }
};


export default BoardDetail;