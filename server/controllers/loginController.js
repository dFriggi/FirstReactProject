const Login = require('../models/Login')
const bcryptjs = require('bcryptjs')
const Joi = require('joi')

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()
    })
    return schema.validate(data)
}

exports.register = async(req, res) => {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    try {
        const loginExists = await Login.findOne({ email: req.body.email })
        if(loginExists) return res.status(400).json({ message: 'Email já cadastrado' })

        const salt = bcryptjs.genSaltSync()
        const hashedPassword = bcryptjs.hashSync(req.body.password, salt)

        const login = new Login({
            email: req.body.email,
            password: hashedPassword
        })
        await login.save()

        return res.status(201)
    } catch(err) {
        res.status(500).json({ message: err })
    }
}

exports.login = async(req, res) => {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    try {
        const login = await Login.findOne({ email: req.body.email })
        if(!login) return res.status(400).json({ message: 'Email ou senha inválidos' })

        const passwordCompare = bcryptjs.compareSync(req.body.password, login.password)
        if(!passwordCompare) return res.status(400).json({ message: 'Email ou senha inválidos' })

        return res.status(200)
    } catch(err) {
        res.status(500).json({ message: err })
    }
}