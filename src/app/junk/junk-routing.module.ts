import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './game/game.component';
import {OberservablesComponent} from './oberservables/oberservables.component';
import {UsersComponent} from './users/users.component';
import {NoUserShownComponent} from './users/no-user-shown/no-user-shown.component';
import {UserEditComponent} from './users/user-edit/user-edit.component';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {JunkComponent} from './junk.component';

const junkRoutes: Routes = [
  {
    path: '', component: JunkComponent, children: [
      {path: 'stupid-game', component: GameComponent},
      {path: 'oberservables', component: OberservablesComponent},
      {
        path: 'users', component: UsersComponent, children: [
          {path: '', component: NoUserShownComponent},
          {path: 'new', component: UserEditComponent},
          {path: ':id', component: UserDetailComponent},
          {path: ':id/edit', component: UserEditComponent}
        ]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(junkRoutes)],
  exports: [RouterModule]
})
export class JunkRoutingModule {
}
