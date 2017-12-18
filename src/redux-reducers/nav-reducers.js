
import { AppNavigator } from '../App';
import { NavigationActions } from 'react-navigation';

const initialNavState = AppNavigator.router.getStateForAction({
    index: 0,
    actions: [
        NavigationActions.navigate({
            routeName: 'Main',
        })],
});

export default function navReducer(state = initialNavState, action) {

    let nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
}
