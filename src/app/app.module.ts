import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoggingInterceptorService} from './shared/interceptors/logging-interceptor.service';
import {ErrorMessageConverterPipe} from './auth/pipes/error-message-converter.pipe';
import {AuthInterceptorService} from './auth/interceptors/auth-interceptor.service';
import {RecipesModule} from './recipes/recipes.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {ErrorsModule} from './errors/errors.module';
import {JunkModule} from './junk/junk.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JunkModule,
    AuthModule,
    SharedModule,
    ShoppingListModule,
    RecipesModule,
    AppRoutingModule,
    ErrorsModule
  ],
  exports: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true},
    ErrorMessageConverterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
