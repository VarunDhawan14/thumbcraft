import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  isVerified: boolean;

  verificationCode?: string | null;
  verificationCodeExpires?: Date | null;

  resetPasswordCode?: string | null;
  resetPasswordCodeExpires?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationCode: {
      type: String,
      default: null,
    },

    verificationCodeExpires: {
      type: Date,
      default: null,
    },

    resetPasswordCode: {
      type: String,
      default: null,
    },

    resetPasswordCodeExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;