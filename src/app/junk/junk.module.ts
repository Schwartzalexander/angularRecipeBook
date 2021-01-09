import {NgModule} from '@angular/core';
import {GameComponent} from './game/game.component';
import {GameControlComponent} from './game/game-control/game-control.component';
import {OddComponent} from './game/odd/odd.component';
import {EvenComponent} from './game/even/even.component';
import {BasicHighlightDirective} from './directives/basic-highlight.directive';
import {BetterHighlightDirective} from './directives/better-highlight.directive';
import {BestHighlightDirective} from './directives/best-highlight.directive';
import {UnlessDirective} from './directives/unless.directive';
import {OberservablesComponent} from './oberservables/oberservables.component';
import {UsersComponent} from './users/users.component';
import {UserItemComponent} from './users/user-list/user-item/user-item.component';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {NoUserShownComponent} from './users/no-user-shown/no-user-shown.component';
import {UserEditComponent} from './users/user-edit/user-edit.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {JunkRoutingModule} from './junk-routing.module';
import {ShortenPipe} from './pipes/shorten.pipe';
import {StarPipe} from './pipes/star.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { JunkComponent } from './junk.component';

@NgModule({
  declarations: [
    GameComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    BestHighlightDirective,
    UnlessDirective,
    OberservablesComponent,
    UsersComponent,
    UserListComponent,
    UserItemComponent,
    UserEditComponent,
    NoUserShownComponent,
    UserDetailComponent,
    ShortenPipe,
    StarPipe,
    JunkComponent,
  ],
  imports: [
    JunkRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class JunkModule {
}
