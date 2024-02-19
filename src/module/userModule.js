// Import the Mongoose module
import mongoose from "mongoose";

// Import crypto for password hashing
import { createHmac, randomBytes } from "crypto";

// Define the user schema
const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    // salt: { type: String, required: true },
    password: { type: String, required: true, minLength: 8, maxLength: 16 },
    profile_image: {
      type: String,
      default: "../assets/images/defaultImage.png",
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Define a pre-save hook to hash the password and generate salt
// userSchema.pre("save", function (next) {
//   const user = this;

//   if (!user.isModified("password")) return next();

//   const salt = randomBytes(16).toString();
//   const hashPassword = createHmac("sha256", salt)
//     .update(user.password)
//     .digest("hex");
//   user.password = hashPassword;
//   user.salt = salt;
//   next();
// });

// Create and export the User model
export default mongoose.model("User", userSchema);
