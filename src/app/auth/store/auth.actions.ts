import {createAction, props} from '@ngrx/store';

export const login = createAction('Logging in', props<{ email: string, userId: string, token: string, expirationTimestamp: number }>());
export const logout = createAction('Logging out');
