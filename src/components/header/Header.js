import React from 'react';
import Link from "next/link";
import {Icon} from "office-ui-fabric-react";

function Header() {
    return (
        <header id="header">
            <nav className="header__nav">
                <ul className="link-list">
                    <li>
                        <Link href="/">
                            <a title="Home"><Icon iconName="Home"  /></a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;