import User from "../module/userModule.js";

const login = async (req, res) => {
  res.status(200).json({ message: "this is login function" });
  //   const { email, password } = req.body;
};

const register = async (req, res) => {
  const { fullName, email, password, phone, profile_image, role } = req.body;
  try {
    await User.create({
      fullName,
      email,
      password,
      phone,
      profile_image,
      role,
    });
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { login, register };
