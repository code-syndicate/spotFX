import mongoose from "mongoose";
import { hashPassword } from "../hashing";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    minLength: [2, "First name must be at least 2 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    minLength: [2, "Last name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password must be at least 8 characters long"],
  },

  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.comparePassword = function (password) {
  const match = hashPassword(password) === this.password;

  return match;
};

userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email }).exec();

  if (!user) {
    throw new Error("Invalid login");
  }

  const match = user.comparePassword(password);

  if (!match) {
    throw new Error("Invalid login");
  }

  user.lastLogin = Date.now();

  await user.save();

  return user;
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);