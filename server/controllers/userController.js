const User = require('../models/User')
const Joi = require('joi')

const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required()
    })
    return schema.validate(data)
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({createdAt: -1})
        res.json(users)
    } catch(err) {
        res.status(500).json({ message: "Erro ao buscar usuários." })
    }
}

exports.createUser = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    try {
        const user = new User(req.body)
        await user.save()

        return res.status(201).json(user)
    } catch(err) {
        err.code === 11000 ? res.status(400).json({ message: "E-mail já cadastrado." }) :
        res.status(500).json({ message: "Erro ao salvar." })
    }
}

exports.updateUser = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: "true" })
        if(!user) return res.status(404).json({ message: "Usuário não encontrado." })
        
        res.json(user);       
    } catch(err) {
        res.status(500).json({ message: "Erro ao atualizar." })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).json({ message: "Usuário não encontrado." })
        
        res.json({ message: "Usuário deletado." });       
    } catch(err) {
        res.status(500).json({ message: "Erro ao deletar." })
    }
}