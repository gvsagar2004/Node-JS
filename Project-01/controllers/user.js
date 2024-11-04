const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  try {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handlePatchUserById(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleDeleteUserById(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ status: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handlePostUser(req, res) {
  try {
    const { firstName, lastName, email, gender, jobTitle } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      gender,
      jobTitle
    });

    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleDeleteUserById,
  handlePatchUserById,
  handlePostUser,
  handleGetAllUsers,
  handleGetUserById,
};