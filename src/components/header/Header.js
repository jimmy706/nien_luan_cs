import React,{useState} from 'react';
import Link from "next/link";
import {Icon} from "office-ui-fabric-react";
import {connect} from "react-redux";
import {logoutAction} from "../../redux/actions/user.action";

function Header(props) {
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleOpen = () => {
        setOpenDropdown(!openDropdown);
    };

    function handleLogout(e) {
        e.preventDefault();
        props.logoutAction();
    }

    return (
        <header id="header">
            <div className="container-fluid">
                <nav className="header__nav">
                    <ul className="link-list">
                        <li className="list-item">
                            <Link href="/boards">
                                <a title="Home" className="nav-link icon-wrapper"><Icon iconName="Home" /></a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="user-interact">
                    <div className="avatar-wrapper">
                        <img src={props.user.avatar  ? props.user.avatar : "https://api.adorable.io/avatars/40/abott@adorable.png"}
                             onClick={handleOpen}
                             alt="avatar"
                             className="avatar"/>
                        <ul className={`dropdown-menu-content ${openDropdown ? 'open' : ''}`}>
                            <li>
                                Signed in as <strong className="username">{props.user.username}</strong>
                            </li>
                            <li>
                                {props.user.email}
                            </li>
                            <li>
                                <Link href={"/info"}>
                                    <a>My Account</a>
                                </Link>
                            </li>
                            <li>
                                <a href="javascript:void(0)" onClick={handleLogout}>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
};
export default connect(mapStateToProps,{
    logoutAction
})(Header);