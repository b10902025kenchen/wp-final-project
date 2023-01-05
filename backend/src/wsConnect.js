import Game from './models/game.js';

const initArray = Array(9).fill(Array(9).fill(0));

const sendData = (data, ws) => {ws.send(JSON.stringify(data)); }
//const sendStatus = (payload, ws) => {sendData(["status", payload], ws); }

const broadcastMessage = (wss, data) => {
 wss.clients.forEach((client) => {
 sendData(data, client);
 //sendStatus(status, client);
 });
};

const createGame = async ( name ) => {
    let key;
    const existing = await Game.findOne({ name: name });
    if(existing) key = existing.player + 1;
    else key = 1;
    const newGame = {name: name, player: key, status: initArray};
    const record = await Game.updateOne({ name: name }, {
        $set: newGame
    }, { upsert: true });
    console.log(record);
    const updated = record.upsertedId === null;
    const s = (updated ? 'Updating ' : 'Adding ') + newGame.name + ' ' + newGame.player; 
    console.log(s);
    return newGame;
}

const changeBoard = async ( name, color, row, col) => {
    const existing = await Game.findOne({ name: name });
    let array = existing.status;
    if(color === 1) array[row][col] = 1;
    else if(color === 2) array[row][col] = 2;
    const newGame = {name: name, player: existing.player, status: array};
    const record = await Game.updateOne({ name: name }, {
        $set: newGame
    }, { upsert: true });
    console.log(record);
    const updated = record.upsertedId === null;
    const s = (updated ? 'Updating ' : 'Adding ') + newGame.name + ' ' + newGame.player; 
    console.log(s);
    return newGame;
}

export default {
    onMessage: (wss, ws) => (
        async (byteString) => {
            const { data } = byteString;
            const { type: task, payload } = JSON.parse(data)
            switch (task) {
                case 'CREATE': {
                    const {name} = payload;
                    let game = await createGame(name);
                    console.log(game);
                    broadcastMessage(
                        wss, 
                        ['CREATE', game]
                    )
                    break;
                }
                case 'CHANGE': {
                    const {name, color, row, col} = payload;
                    console.log(name, color, row, col);
                    let game = await changeBoard(name, color, row, col);
                    console.log(game);
                    broadcastMessage(
                        wss, 
                        ['CHANGE', game]
                    )
                    break;
                }
                default: break
            }
        }
    )
}