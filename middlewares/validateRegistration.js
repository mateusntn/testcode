const { User } = require('../models')

module.exports = async (request, response, next) => {
    let error = document.querySelector("#error");

    let { register_name, register_email, phone, cpf, register_password, register_confirmation } = request.body;

    const emailDefault = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;
    
    if(register_name && register_email && phone && cpf && register_password) {
        let users = await User.findAll({ where: {email: register_email} });
        if (!users.length) {
            if( register_password.length >= 6 && register_password.length <= 12){
                if (nameValue.length >= 2) {
                    if(phoneValue.length >= 11) {
                        if (register_password == register_confirmation) {
                            if (emailDefault.test(register_email)) {
                                next();  
                            } else {
                                error.innerHTML = ' Verifique se o e-mail está correto. ';
                            }                   
                        } else {
                            error.innerHTML = ' Senhas não coincidem. ';
                        }
                    } else {
                        error.innerHTML = ' O número de telefone deve seguir o padrão DDD+número. Exemplo: 81999999999. ';
                    }
                } else {
                    error.innerHTML = ' O nome deve ter 2 letras ou mais. ';
                }
            } else {
                error.innerHTML = "A senha deve ter entre 6 e 12 caracteres.";
            }
            
        } else {
            error.innerHTML = "Email já cadastrado.";
        }
    } else {
        error.innerHTML = "Preencha todos os campos.";
    }
}