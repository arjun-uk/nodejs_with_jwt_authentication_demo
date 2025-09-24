const db = require("../model/index");
const jwtHelper = require("../helpers/jwt_helper");
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.User.findOne({ where: { name: username } });
    if (!user || !user.checkPassword(password)) {
      return HELPERS.errorResponse(res, null, "Invalid credentials", 401);
    }

    // Create JWT
    const token = jwtHelper.signToken({ id: user.id, name: user.name, role: user.role });

    return HELPERS.successResponse(res, { token }, "Login successful", 0);
  } catch (error) {
    return HELPERS.errorResponse(res, error, ""+error, 500);
  }
};

const register = async (req, res) => {
  const { username, password, email } = req.body;

  const user = await db.User.create({
    name: username,
    email: email,
    password: password,
    role: "user",
    created_at: new Date(),
    updated_at: new Date(),
  });

  HELPERS.successResponse(res, null, "Registration successful", 0);
};
module.exports = {
  loginUser,
  register,
};
