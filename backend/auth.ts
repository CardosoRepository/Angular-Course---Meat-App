import { Request, Response } from 'express'
import { users, User } from './users'

export const handleAuthentication = (req: Request, resp: Response) => {
    const user: User = req.body

    if(isValid(user)){
        const dbUser: User = users[user.email]
        resp.json({name: dbUser.name, email: dbUser.email})
    }else{
        resp.status(403).json({message: 'Dados inválidos'})
    }
}

function isValid(user: User): boolean{
    if(!user){ return false }

    const dbUser = users[user.email]

    //Verifica se foi encontrado um usuário com o e-mail correspondente
    //Verifica se as informações "batem" com as informações gravadas no "database"
    return dbUser !== undefined && dbUser.matches(user)
}