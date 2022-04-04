import { Request, Response } from 'express'
import { apiConfig } from './api-config'

import * as jwt from "jsonwebtoken"

export const handleAuthorization = (req: Request, resp: Response, next) => {
    const token = extractToken(req)

    if(!token){
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"') //Dica para o que deve ser informado ao backend
        resp.status(401).json({message: 'Você precisa se autenticar.' }) //Mensagem de erro requisitando autenticação
    }else{
        jwt.verify(token, apiConfig.secret, (error, decoded) => {
            if(decoded){
                next() //Prossegue para a próxima requisição com sucesso
            }else{
                resp.status(403).json({message: 'Não autorizado.' }) //Retorna erro caso o token informado seja inválido
            }
        })
    }
}

function extractToken(req: Request): string{
    let token = undefined
    
    if(req.headers && req.headers.authorization){ //Verifica se a requisição possui os headers
        // Authorization: Bearer ZZZ.ZZZ.ZZZ
        const parts: string[] = req.headers.authorization.split(' ') //Separa o header Authorization em duas partes: 1-Bearer; 2-ZZZ.ZZZ.ZZZ;
        if(parts.length === 2 && parts[0] === 'Bearer'){ //Verifica se o split foi feito corretamente
            token = parts[1] //Atribui o valor de token à variável token
        }
    }

    return token
}