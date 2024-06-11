import { connect } from "mongoose";

export const connectDatabase = async () => {
  return await connect("mongodb://127.0.0.1:27017/passport_ecommerce");
};
