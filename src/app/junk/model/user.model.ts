export class User {
  constructor(public id: string,
              public name: string,
              public email: string,
              public password: string,
              public gender: string,
              public roles: string[],
              public coronaAttitude: string,
              private Token: string,
              private tokenExpirationDate?: Date
  ) {
  }

  get token(): string {
    if (!this.tokenExpirationDate || this.tokenExpirationDate.getTime() < new Date().getTime())
      return '';
    return this.Token;
  }
}
