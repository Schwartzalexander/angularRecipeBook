import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {User} from '../../junk/model/user.model';
import {login, loginFailed, loginStart, logout} from './auth.actions';

export interface State {
  user: User | undefined;
  error: string | undefined;
  loading: boolean;
}

export const initialState: State = {
  user: undefined,
  error: undefined,
  loading: false
};

const reducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(loginStart, (state, {email, password}) => {
    // Make an immutable copy. State changes must always be immutable by convention.
    const newState = {...state, error: undefined, loading: true};
    console.log('loginStart:');
    console.log(state);
    console.log(newState);
    return newState;
  })
  , on(login, (state, {email, expirationTimestamp, token, userId}) => {
    // Make an immutable copy. State changes must always be immutable by convention.
    const user = new User(userId, '', email, '', '', [], '', token, expirationTimestamp);
    const newState = {...state, user, error: undefined, loading: false};
    console.log('login:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(loginFailed, (state, {error}) => {
    // Make an immutable copy. State changes must always be immutable by convention.
    const newState = {...state, user: undefined, error, loading: false};
    console.log('loginFailed:');
    console.log(state);
    console.log(newState);
    return newState;
  }),
  on(logout, (state) => {
    const newState = {...state, user: undefined, loading: false};
    console.log('logout:');
    console.log(state);
    console.log(newState);
    return newState;
  })
  )
;

export function authReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
