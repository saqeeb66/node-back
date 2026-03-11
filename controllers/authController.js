const authService = require("../services/authService");

exports.signup = async (req, res) => {
    try {
        const response = await authService.signup(req.body);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const response = await authService.login(req.body);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};