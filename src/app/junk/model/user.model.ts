export class User {
  constructor(public id: string,
              public name: string,
              public email: string,
              public password: string,
              public gender: string,
              public roles: string[],
              public coronaAttitude: string,
              private Token: string,
              private tokenExpirationTimestamp?: number
  ) {
  }

  get token(): string {
    if (!this.tokenExpirationTimestamp || this.tokenExpirationTimestamp < new Date().getTime())
      return '';
    return this.Token;
  }
}
