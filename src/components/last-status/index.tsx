import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { getLastStatus } from '../../store/selectors';

type StateProps = ReturnType<typeof mapStateToProps>

const LastStatus = ({ lastStatus }: StateProps) => {
    console.log('rerender');
    return (
        <h2>Cтатус последней заметки: {lastStatus.toString()}</h2>
    )
}

function mapStateToProps(state: ApplicationState) {
    return {
        lastStatus: getLastStatus(state)
    };
}

export default connect(mapStateToProps)(LastStatus);
