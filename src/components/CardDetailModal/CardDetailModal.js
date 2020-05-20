import React, {useState} from 'react';
import {connect} from 'react-redux';
import { Spinner, SpinnerSize, IconButton,  } from 'office-ui-fabric-react';
import CardLabels from "./CardLabels";
import CardDescription from "./CardDescription";


function CardDetailModal(props) {
    const {cardState} = props;
    const {cardDetail, isPending} = cardState;
    const [allowChangeTitle, setAllowChangeTitle] = useState(false);


    return (
        <div className="card-detail">
            {
                isPending ? <Spinner label="Pending card..." size={SpinnerSize.large}/> : (
                    <div className="content">
                        <div className={`window-header ${allowChangeTitle ? 'input-active' : ''}`}>
                        <span className="toggle-close">
                            <IconButton
                                onClick={props.handleCloseCardModal}
                                iconProps={{ iconName: 'Cancel' }}
                            />
                        </span>
                            <input className={`card-name form-control`} value={ cardDetail.cardTitle}/>
                        </div>
                        <CardLabels/>
                        <CardDescription cardDetail={cardState.cardDetail}/>
                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cardState: state.cardState
    }
};

export default connect(mapStateToProps, null)(CardDetailModal);