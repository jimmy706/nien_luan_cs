import React, {Component} from 'react';
import Router from "next/router";
import {isAuth} from "../helpers/auth";
import Header from "../components/header/Header";


class Boards extends Component {
    componentDidMount() {
        if(!isAuth()){
            Router.push("/");
        }
    }

    render() {
        return (
            <div className='boards-page'>
                <Header/>
            </div>
        );
    }
}

export default Boards;
