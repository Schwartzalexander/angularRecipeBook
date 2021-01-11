import {createAction, props} from '@ngrx/store';

export const signUpStart = createAction('[Auth] Signing up start', props<{
  email: string, password: string,
  redirectUrl: string
}>());
export const loginStart = createAction('[Auth] Logging in start', props<{
  email: string, password: string,
  redirectUrl: string
}>());
export const login = createAction('[Auth] Logging in', props<{
  email: string, userId: string, token: string, expirationTimestamp: number,
  redirectUrl: string
}>());
export const logout = createAction('[Auth] Logging out', props<{ redirectUrl: string }>());
export const loginFailed = createAction('[Auth] Logging in failed', props<{ error: string }>());
export const autoLogin = createAction('[Auth] Auto Login');

