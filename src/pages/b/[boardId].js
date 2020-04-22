import React, { useState } from 'react';
import  {useRouter} from "next/router";
import Header from "../../components/header/Header";
import BoardHeader from "../../components/header/BoardHeader";
import axios from 'axios';
import {GET_BOARD_DETAIL_URL} from "../../constants/APIs";
import AddList from "../../components/List/AddList";

function BoardDetail(props) {
    const router = useRouter();
    const [boardState,setBoardState] = useState(props.boardDetail);


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