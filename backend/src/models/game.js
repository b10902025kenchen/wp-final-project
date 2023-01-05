import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const GameSchema = new Schema({
    name: String,
    status: [[Number]],
    player: Number
});
const Game = mongoose.model('Game', GameSchema);
export default Game;