import {createAction, props} from '@ngrx/store';

export const loginStart = createAction('[Auth] Login start', props<{ email: string, password: string }>());
export const login = createAction('[Auth] Logging in', props<{ email: string, userId: string, token: string, expirationTimestamp: number }>());
export const logout = createAction('[Auth] Logging out');
export const loginFailed = createAction('[Auth] Logging in failed', props<{ error: string }>());
