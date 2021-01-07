import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from 'src/app/model/user.model';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number | undefined;
  editMode = false;
  user: User | undefined;

  // radio options
  genderOptions = ['male', 'female', 'transsex', 'transgender', 'söder', 'transsex man to female', 'guy with small dick'];
  coronaOptions = [{value: 'against', name: 'Against corona'}, {value: 'for', name: 'For corona'}];

  // Default values
  defaultName = 'Hansi';
  defaultEmail = 'hansi@vogelpark.de';
  defaultPassword = 'quietschpfiff';
  defaultGender = this.genderOptions[3];
  defaultRoles = ['admin', 'boss'];
  defaultCorona = [this.coronaOptions[0].value];

  userForm: FormGroup = this.createForm();

  constructor(private activeRoute: ActivatedRoute, private userService: UserService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        if (this.editMode)
          this.user = this.userService.users[this.id];
      }
    );
    // this.userForm?.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )
    // this.userForm?.statusChanges.subscribe(
    //   (status) => console.log(status)
    // )

    // this.userForm?.setValue( {
    //   'name' : 'Werner',
    //   'email' : 'werner@siemens.de',
    //   'password' : '3h9c78438974',
    //   'gender' : 'transsex man to female',
    //   'roles' : ['spack', 'fanboy']
    // })

    // this.userForm?.patchValue( {
    //   'name' : 'Wernherr'
    // })

    // this.userForm.reset()
  }

  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.defaultName, [Validators.required, this.forbiddenNames]),
      email: new FormControl(this.defaultEmail, [Validators.required, Validators.email], [this.forbiddenEmails]),
      password: new FormControl(this.defaultPassword, [Validators.required, Validators.minLength(8)]),
      gender: new FormControl(this.defaultGender, Validators.required),
      roles: new FormArray([]),
      corona: new FormControl(this.defaultCorona)
    });
  }

  getRoles(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  onAddRole(): void {
    const control: FormControl = new FormControl('admin', Validators.required);
    this.getRoles().push(control);
  }

  onDeleteRole(i: number): void {
    this.getRoles().removeAt(i);
  }

  onSubmit(): void {
    const name = this.userForm?.value.name;
    const email = this.userForm?.value.email;
    const password = this.userForm?.value.password;
    const gender = this.userForm?.value.gender;
    const roles = this.userForm?.value.roles;
    const coronaAttitude = this.userForm?.value.corona;
    const user = new User(name, email, password, gender, roles, coronaAttitude);
    this.userService.users.push(user);
    this.userForm?.reset();
    const index = this.userService.users.length - 1;
    this.router.navigate(['..', index], {relativeTo: this.route});
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    const forbiddenUsernames = ['ersch', 'admin'];

    if (forbiddenUsernames.indexOf((control.value as string)?.toLowerCase()) !== -1) {
      return {nameIsForbidden: true};
    }
    return null;
  }

  forbiddenEmails(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const forbiddenUsernames = ['test@test.de', 'test3@test.de'];

    return new Promise<any>((resolve) => {
      setTimeout(
        () => {
          if (forbiddenUsernames.indexOf((control.value as string)?.toLowerCase()) !== -1) {
            resolve({emailIsForbidden: true});
          } else {
            resolve(null);
          }
        }, 1500);
    });
  }
}
