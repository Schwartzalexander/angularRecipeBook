import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  userForm: FormGroup

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
    this.userForm = new FormGroup({
      'name': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
      'gender': new FormControl('transsex man to female'),
    });

    this.activeRoute.params.subscribe(
      (params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null
        if (this.editMode)
          this.user = this.userService.users[this.id]
      }
    )
  }

  onSubmit() {
    console.log(this.userForm)
    let name = this.userForm?.value.name
    let email = this.userForm?.value.email
    let password = this.userForm?.value.password
    let gender = this.userForm?.value.gender
    let user = new User(name, email, password, gender)
    this.userService.users.push(user)
    this.userForm?.reset()
    let index = this.userService.users.length - 1
    this.router.navigate(["..", index], { relativeTo: this.route })
  }
}
