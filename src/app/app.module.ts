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
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {RecipesEffects} from './recipes/store/recipes.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    StoreDevtoolsModule.instrument(({logOnly: environment.production})),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    ErrorsModule,
    CoreModule
  ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
