export class User {
    constructor(public name: string, public email: string, public password: string, public gender: string, public roles : string[], public coronaAttitude : string) {
        this.name = name
        this.email = email
        this.password = password
        this.gender = gender
        this.roles = roles
        this.coronaAttitude = coronaAttitude
    }
}