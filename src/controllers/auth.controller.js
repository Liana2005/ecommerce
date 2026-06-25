const authService = require("../services/auth.service");

const register = async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json(user);
};

const login = async (req, res) => {
  const data = await authService.login(req.body);

  res.json(data);
};

const me = async (req, res) => {
  const user = await authService.me(req.user.id);

  res.json(user);
};

module.exports = {
  register,
  login,
  me,
};