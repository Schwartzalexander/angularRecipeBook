import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @ViewChild('userForm') userForm: NgForm | undefined

  // radio options
  genderOptions = ['male','female','transsex','transgender','söder']


  // Default values
  defaultName = "Krautknödel"
  defaultEmail = "Nur für echte Deutsche. Alle anderen furzen vom Kraut."
  defaultPassword = "https://ais.kochbar.de/kbrezept/109581_1009663/1200x1200/rumaenische-krautwickel-sarmale-rezept-bild-nr-2.jpg"
  defaultGender = this.genderOptions[4]

  //Two-way-bound values
  emailValue: string | undefined = this.defaultEmail

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

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.userForm)
    let name = this.userForm?.value.name
    let email = this.userForm?.value.email
    let password = this.userForm?.value.password
    let poisonLevel = this.userForm?.value.poisonLevel
    let gender = this.userForm?.value.gender
    let user = new User(name, email, password, gender)
    this.userService.users.push(user)
    this.userForm?.reset()
    let index = this.userService.users.length - 1
    this.router.navigate(["..", index], { relativeTo: this.route })
  }
}
