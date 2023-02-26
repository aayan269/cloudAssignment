const {Schema,model} = require("mongoose");
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  telgram_user_id: { type: String },
});

const UserModel = model("user", UserSchema);

module.exports = UserModel

