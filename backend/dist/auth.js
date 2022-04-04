"use strict";
exports.__esModule = true;
exports.handleAuthentication = void 0;
var users_1 = require("./users");
var api_config_1 = require("./api-config");
var jwt = require("jsonwebtoken");
var handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos' });
    }
};
exports.handleAuthentication = handleAuthentication;
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    //Verifica se foi encontrado um usuário com o e-mail correspondente
    //Verifica se as informações "batem" com as informações gravadas no "database"
    return dbUser !== undefined && dbUser.matches(user);
}
