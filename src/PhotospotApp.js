import React, { Component } from "react";
import { connect } from "react-redux";

class AppWithNavigationState extends Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch,
})

const mapStateToProps = (state) => ({
    nav: state.nav,
})

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);