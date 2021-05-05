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
        const newUser = await User.create({name: register_name, email: register_email, phone, cpf, password: register_password});
        return res.redirect(`/users/${newUser.id}`);
    },

    auth: async (req, res) => {
        const { login_email, login_password } = req.body;

        const user = await User.findOne({where: { email: login_email }});

        if (user && bcrypt.compareSync(login_password, user.password)) {
            req.session.userLoged = user;
            return res.redirect('/'); 
        } else {
            return res.redirect('/users')
        }
    },

    showProfilePage: async (req,res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        return res.render('profile', {user})
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