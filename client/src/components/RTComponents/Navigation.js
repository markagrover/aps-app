import React from 'react';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import { Link } from 'react-router-dom';
import LinkWrap from 'react-toolbox/lib/link/Link';
import { withRouter } from 'react-router-dom';

const actions = [
    { label: 'Alarm', raised: true, icon: 'access_alarm'},
    { label: 'Location', raised: true, accent: true, icon: 'room'}
];



const MGNavigation = ({location, history}) => {
    return (
        <div>
            <Navigation type='horizontal' actions={actions} />
            <Navigation type='vertical'>
                <LinkWrap label={'HOME'} onClick={(location) => history.push('/')}></LinkWrap>
                <LinkWrap label={'TODOS'} onClick={(location) => history.push('/todos')}></LinkWrap>
                <LinkWrap label={'TEST'} onClick={(location) => history.push('/test')}></LinkWrap>
            </Navigation>
        </div>
    );
};

export default withRouter(MGNavigation);
