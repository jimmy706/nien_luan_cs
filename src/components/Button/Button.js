import React from 'react';

function Button(props) {
    return <button className={`custom-btn`} {...props}>
        {props.children}
    </button>
}

export default Button;