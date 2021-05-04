const { User, sequelize} = require('../models/');
const bcrypt = require('bcryptjs');

const usersController = {
    index: async (req, res) => {
        const users = await User.findAll();
        return res.json(users);
    },

    create: async (req, res) => {
        const { register_name, register_email, phone, cpf, register_password } = req.body;

        const passwordCrypt = bcrypt.hashSync(register_password, 10);

        const newUser = await User.create({register_name, register_email, phone, cpf, register_password:passwordCrypt});
        return res.render('/users');
    },

    showLoginPage: async (req, res) => {
        return res.render('cadastro-login');
    },

    update: async (req, res) => {
        const {id} = req.params;
        const { name, email, phone, cep, cpf, password } = req.body;

        const userUpdated = await User.update({name, email, phone, cep, cpf, password},{where: {id}});

        return res.json(userUpdated);
    },

    delete: async (req,res) => {
        const{id} = req.params;
        const userDeleted = await User.destroy({where: {id}});
        return res.json(userDeleted);
    }
}

module.exports = usersController;