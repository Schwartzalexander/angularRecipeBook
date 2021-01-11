import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {User} from '../../junk/model/user.model';
import {login, logout} from './auth.actions';

export interface State {
  user: User | undefined;
}

export const initialState: State = {
  user: undefined
};

const reducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(login, (state, {email, expirationTimestamp, token, userId}) => {
    // Make an immutable copy. State changes must always be immutable by convention.
    const user = new User(userId, '', email, '', '', [], '', token, expirationTimestamp);
    const newState = {...state, user};
    console.log('login:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(logout, (state) => {
    const newState = {...state, user: undefined};
    console.log('logout:');
    console.log(state);
    console.log(newState);
    return newState;
  })
);

export function authReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
