export class Ingredient {
    // public name:string
    // public amount: number

    // constructor(name: string, amount: number) {
    //     this.name = name
    //     this.amount = amount
    // }

    constructor(public name: string, public amount: number) { }

    toString() {
        return "Ingredient: " + this.name + " (" + this.amount + ")"
    }
}