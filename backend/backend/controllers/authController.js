const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= LOGIN =================
exports.login = (req, res) => {
  const { identifier, password } = req.body;

  // 🔍 Validation
  if (!identifier || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 🔍 Find user by email OR teacher_uid
  db.query(
    "SELECT * FROM teachers WHERE email = ? OR teacher_uid = ?",
    [identifier, identifier],
    async (err, results) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // ❌ No user found
      if (results.length === 0) {
        console.log("User not found for:", identifier);
        return res.status(400).json({ message: "User not found" });
      }

      const user = results[0];

      try {
        // 🔐 Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Entered Password:", password);
        console.log("DB Hash:", user.password);
        console.log("Match Result:", isMatch);

        if (!isMatch) {
          return res.status(400).json({ message: "Invalid password" });
        }

        // 🎟 Generate JWT token
        const token = jwt.sign(
          { id: user.id, teacher_uid: user.teacher_uid },
          "secretkey",
          { expiresIn: "1d" }
        );

        // ✅ Send response
        res.json({
          message: "Login successful",
          token,
          user: {
            id: user.id,
            teacher_uid: user.teacher_uid,
            email: user.email
          }
        });

      } catch (error) {
        console.error("BCRYPT ERROR:", error);
        return res.status(500).json({ message: "Server error" });
      }
    }
  );
};