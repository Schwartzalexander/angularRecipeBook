import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number | undefined
  editMode = false;
  user: User | undefined
  userForm: FormGroup = this.createForm()
  public forbiddenUsernames = ['erSch', 'Admin']

  // radio options
  genderOptions = ['male', 'female', 'transsex', 'transgender', 'söder', 'transsex man to female', 'guy with small dick']


  // Default values
  defaultName = "Hansi"
  defaultEmail = "hansi@vogelpark.de"
  defaultPassword = "quietschpfiff"
  defaultGender = this.genderOptions[3]


  constructor(private activeRoute: ActivatedRoute, private userService: UserService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null
        if (this.editMode)
          this.user = this.userService.users[this.id]
      }
    )
  }

  createForm(): FormGroup {
    return new FormGroup({
      'name': new FormControl("Anna", [Validators.required, this.forbiddenNames]),
      'email': new FormControl("anna@aSchwartz.de", [Validators.required, Validators.email]),
      'password': new FormControl("456456456654", [Validators.required, Validators.minLength(8)]),
      'gender': new FormControl("female", Validators.required),
      'roles': new FormArray([])
    });
  }

  getRoles(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  onAddRole() {
    const control: FormControl = new FormControl('admin', Validators.required);
    this.getRoles().push(control)
  }

  onDeleteRole(i: number) {
    this.getRoles().removeAt(i)
  }

  onSubmit() {
    console.log(this.userForm)
    let name = this.userForm?.value.name
    let email = this.userForm?.value.email
    let password = this.userForm?.value.password
    let gender = this.userForm?.value.gender
    let roles = this.userForm?.value.roles
    let user = new User(name, email, password, gender, roles)
    this.userService.users.push(user)
    this.userForm?.reset()
    let index = this.userService.users.length - 1
    this.router.navigate(["..", index], { relativeTo: this.route })
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    const forbiddenUsernames = ['ersch', 'admin']

    if (forbiddenUsernames.indexOf((control.value as string).toLowerCase()) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }
}
