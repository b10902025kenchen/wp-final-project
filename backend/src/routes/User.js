import { Router } from "express";
import User from "../models/user";
const router = Router();

router.post("/add", async (req, res) => {
    try{
        // console.log(req);
        const record = await User.find({ username: req.body.name});
        console.log(record);
        if(record.length > 0)
        {
            res.json({response: 'fail'});
        }
        else
        {
            const newUser = new User({username:req.body.name, password:req.body.password, win: 0, loss: 0, tie: 0, coin: 0});
            console.log("Create User", newUser);
            res.json({response: 'success'});
            newUser.save();
        }
        // res.json({card: newScoreCard});
    } catch(e) { throw new Error("User creation error: " + e); }
}); 

router.get("/check", async (req, res) => {
    {
        console.log(req.query.name, req.query.password);
        const record = await User.find({ username: req.query.name, password:req.query.password });
        console.log(record.length);
        if(record.length > 0)
        {
            console.log(record);
            try{
                res.json({response: 'success'});
            }
            catch(e) {throw new Error("User query error: " + e); }
        }
        else
        {
            console.log("fail");
            try{
                res.json({response: 'fail'});
            }
            catch(e) {throw new Error("User query error: " + e); }
        }
    }
}); 

router.post("/standings", async (req, res) => {
    try{
        const currUser = await User.findOne({ username: req.body.name});
        console.log(req.body.name);
        console.log(req.body.val);
        //console.log(currUser);
        let newUser;
        if(req.body.val === 1)
        {
            console.log("win");
            newUser = {username: currUser.username, password: currUser.password, win: currUser.win + 1, loss: currUser.loss, tie: currUser.tie, coin: currUser.coin + 50};
        }
        else if(req.body.val === 2)
        {
            console.log("loss");
            newUser = {username: currUser.username, password: currUser.password, win: currUser.win, loss: currUser.loss + 1, tie: currUser.tie, coin: currUser.coin + 10};
        }
        else if(req.body.val === 3)
        {
            console.log("tie");
            newUser = {username: currUser.username, password: currUser.password, win: currUser.win, loss: currUser.loss, tie: currUser.tie + 1, coin: currUser.coin + 20};
        }
        console.log(newUser);
        const record = await User.updateOne({ username: req.body.name }, {
            $set: newUser
        }, { upsert: true });
        const s = 'Update' + newUser.username + ' ' + newUser.win + ' ' + newUser.loss + ' ' + newUser.tie + ' ' + newUser.coin; 
        res.json({
            message: s
        });
    } catch(e) { throw new Error("User upsertion error: " + e); }
}); 
//bug: go in twice (frontend problem)

router.get("/fetch", async (req, res) => {
    console.log(req.query.name);
    const record = await User.findOne({ username: req.query.name });
    console.log(record);
    try{
        res.json({user: record});
    }
    catch(e) {throw new Error("ScoreCard query error: " + e); }
});


router.post("/battle", async (req, res) => {
    try{
        const currUser = await User.findOne({ username: req.body.name});
        console.log(req.body.name);
        console.log(req.body.val);
        console.log(currUser);
        let x = currUser.coin + req.body.val;
        if(x < 0) x = 0;
        let newUser;
        newUser = {username: currUser.username, password: currUser.password, win: currUser.win, loss: currUser.loss, tie: currUser.tie, coin: x};
        console.log(newUser);
        const record = await User.updateOne({ username: req.body.name }, {
            $set: newUser
        }, { upsert: true });
        const s = 'Update' + newUser.username + ' ' + newUser.win + ' ' + newUser.loss + ' ' + newUser.tie + ' ' + newUser.coin; 
        res.json({
            message: s
        });
    } catch(e) { throw new Error("User upsertion error: " + e); }
}); 

export default router;