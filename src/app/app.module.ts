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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot(fromApp.appReducer),
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
