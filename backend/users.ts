export class User{
    constructor(public email: string, 
                public name: string, 
                public password: string) {}

    matches(another: User): boolean{ //Compara os dados do User informado com o User salvo no "banco"
        return another !== undefined && another.email === this.email && another.password === this.password
    }
}

export const users: {[key: string]: User} = { //Array de User indexado pelo e-mail
    "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
    "amanda@gmail.com": new User('amanda@gmail.com', 'Amanda', 'amanda23')
}