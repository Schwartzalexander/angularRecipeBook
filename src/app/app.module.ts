import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {ErrorsModule} from './errors/errors.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {RecipesEffects} from './recipes/store/recipes.effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {localStorageSync} from 'ngrx-store-localstorage';

/**
 * Writes the specified store data into the local session storage and retrieves it on app start. Therefore, the state survives a browser refresh.
 * @see https://github.com/btroncone/ngrx-store-localstorage
 * @param reducer reducer
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  const keys = ['shoppingList', 'auth', 'recipes'];
  return localStorageSync({keys, rehydrate: true, storage: sessionStorage})(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    StoreModule.forRoot(fromApp.appReducer, {metaReducers}),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    StoreDevtoolsModule.instrument(({logOnly: environment.production})),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    ErrorsModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
