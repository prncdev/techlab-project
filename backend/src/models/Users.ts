import { Schema, model } from "mongoose";


const UserSchema = new Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  // session:     { type: String },
  // expiresOn:   { type: Date }
}, {
  timestamps: true,
});

const Users = model('Users', UserSchema);

export default Users;