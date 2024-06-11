import { Model, Schema, model } from "mongoose";

interface IUser {
  username: string;
  password: string;
}

interface IUserMethods {
  verifyPassword(password: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.verifyPassword = function (password: string) {
  if (password !== this.password) return false;
  return true;
};

const User = model<IUser, UserModel>("User", UserSchema);

export { User };
