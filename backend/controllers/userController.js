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

export { signUp };
