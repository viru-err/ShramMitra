const Labor = require("../models/Labor");

exports.registerLabor = async (req, res) => {
  try {
    const { name, phone, skill, location, experience } = req.body;

    const newLabor = new Labor({ name, phone, skill, location, experience });
    await newLabor.save();

    res.status(201).json({ message: "Labor registered successfully" });
  } catch (error) {
    console.error("Error registering labor:", error);
    res.status(500).json({ error: "Server error" });
  }
};
