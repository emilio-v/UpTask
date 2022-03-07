import User from "../models/User.js";
import generateId from "../helpers/generateId.js";

const signUp = async (req, res) => {
  // avoid duplicate registers
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("User already exists");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (e) {
    console.log(e);
  }
};

const auth = async (req, res) => {
  const { email, password } = req.body;

  // Verify if user exists
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User does not exist");
    return res.status(400).json({ msg: error.message });
  }

  // Verify if user is confirm
  if (!user.confirm) {
    const error = new Error("Your account has not been confirmed");
    return res.status(403).json({ msg: error.message });
  }

  // Verify password
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    const error = new Error("Password is incorrect");
    return res.status(403).json({ msg: error.message });
  }
};

export { signUp, auth };
