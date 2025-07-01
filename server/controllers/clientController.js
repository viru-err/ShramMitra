import Client from "../models/Client.js";

// Register a new client
export const registerClient = async (req, res) => {
  try {
    const { name, phone, location, password, company } = req.body;

    // Validate required fields
    if (!name || !phone || !location || !password || !company) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Check for existing client
    const existing = await Client.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "Client already exists" });
    }

    // Create new client (password will be hashed by the model pre-save hook)
    const newClient = new Client({
      name: name.trim(),
      phone,
      company: company.trim(),
      location: location.trim(),
      password,
    });

    await newClient.save();

    // Remove password from response
    const clientResponse = newClient.toObject();
    delete clientResponse.password;

    res.status(201).json({
      message: "Client registered successfully",
      client: clientResponse,
    });
  } catch (err) {
    console.error("Client Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in client profile
export const getClientProfile = async (req, res) => {
  try {
    // req.user is set by verifyToken middleware
    const client = await Client.findById(req.user.id).select("-password");
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ client });
  } catch (error) {
    console.error("Get Client Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
