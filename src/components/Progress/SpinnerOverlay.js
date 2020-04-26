import React from 'react';
import {Spinner, SpinnerSize} from 'office-ui-fabric-react';
import {connect} from "react-redux";

function SpinnerOverlay(props) {
    const {isLoading, label} = props.progress;
    return (
        <div className={`spinner-overlay ${isLoading ? "loading": ""}`}>
            <Spinner size={SpinnerSize.large}
                     label={label}
                     ariaLive="assertive"
                     labelPosition="top"
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        progress: state.progress
    }
};

export default connect(mapStateToProps, null)(SpinnerOverlay);