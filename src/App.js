import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Routes from './config/routes';

export const AppNavigator = StackNavigator(Routes);

const AppWithNavigationState = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

function mapStateToProps (state) {
    return {
        nav: state.navReducer
    };
}

export default connect(mapStateToProps)(AppWithNavigationState);