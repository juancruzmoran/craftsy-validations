const {check, body} = require('express-validator')
const {loadUsers} = require('../data/db_Module')
module.exports = [
    check('firstName')
    .notEmpty().withMessage('El nombre es obigatorio').bail()
    .isLength({
        min : 2
    }).withMessage('Mínimo 2 caracteres').bail()
    .isAlpha().withMessage('Sólo caracteres alfabéticos'),


    check('lastName')
    .notEmpty().withMessage('El Apellido es obigatorio').bail()
    .isLength({
        min : 2
    }).withMessage('Mínimo 2 caracteres').bail()
    .isAlpha().withMessage('Sólo caracteres alfabéticos'),


     body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email válido').bail()
    .custom((value, {req}) =>{
        const user = loadUsers().find(user => user.email === value);
        if(user) {
            return false
        } else {
            return true
        }
    }).withMessage('El email ya se encuentra en uso'),
    check('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({
        min : 6,
        max : 12,
    }).withMessage('La contraseña debe contener entre 6 y 12 caracteres'),

    body('password2')
    .notEmpty().withMessage('Debes confirmar tú contraseña')
    .custom((value,{req}) => {
        if(value !== req.body.passowrd){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden')
    ,
    check('terms')
    .isString('on').withMessage('Debes aceptar los términos y condiciones')
]