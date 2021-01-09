import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './dropdown.directive';
import {AlertComponent} from './components/alert/alert.component';
import {PlaceholderDirective} from './placeholder.directive';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    DropdownDirective,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective],
  imports: [
    CommonModule, // Only import BrowserModule once in AppModule. In all other modules import CommonModule instead.
  ],
  exports: [
    DropdownDirective,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    CommonModule
  ],

})
export class SharedModule {
}
