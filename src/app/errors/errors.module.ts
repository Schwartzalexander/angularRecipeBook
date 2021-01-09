import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Error404Component} from './error-pages/error404/error404.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    Error404Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '**', component: Error404Component, data: {message: 'Page not found!'}},
    ]),
  ]
})
export class ErrorsModule {
}
