import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String,
    win: Number,
    loss: Number,
    tie: Number,
    coin: Number
});
const User = mongoose.model('User', UserSchema);
export default User;