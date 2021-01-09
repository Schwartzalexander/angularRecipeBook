import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from 'src/app/junk/model/user.model';
import {UserService} from 'src/app/junk/services/user.service';

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
  defaultCorona = this.coronaOptions[0].value;

  userForm: FormGroup | undefined;

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
        this.userForm = this.createForm();
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
    let name = this.defaultName;
    let email = this.defaultEmail;
    let password = this.defaultPassword;
    let gender = this.defaultGender;
    let corona = this.defaultCorona;
    const rolesFormArray = new FormArray([]);

    if (this.editMode && this.id !== undefined && this.user !== undefined) {
      name = this.user.name;
      email = this.user.email;
      password = this.user.password;
      gender = this.user.gender;
      corona = this.user.coronaAttitude;

      if (this.user?.roles)
        for (const role of this.user.roles) {
          rolesFormArray.push(new FormControl(role, Validators.required));
        }
    }
    return new FormGroup({
      name: new FormControl(name, [Validators.required, this.forbiddenNames]),
      email: new FormControl(email, [Validators.required, Validators.email], [this.forbiddenEmails]),
      password: new FormControl(password, [Validators.required, Validators.minLength(8)]),
      gender: new FormControl(gender, Validators.required),
      roles: rolesFormArray,
      corona: new FormControl(corona)
    });
  }

  getRoles(): FormArray {
    return this.userForm?.get('roles') as FormArray;
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
    const index = this.userService.users.length - 1;
    const user = new User(index + '', name, email, password, gender, roles, coronaAttitude, '');
    if (this.editMode && this.id !== undefined) {
      this.userService.users[this.id] = user;
      this.router.navigate(['..'], {relativeTo: this.route});
    } else {
      this.userService.users.push(user);
      this.router.navigate(['..', index + 1], {relativeTo: this.activeRoute});
    }

    this.userForm?.reset();
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
