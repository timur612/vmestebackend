const {Router} = require('express');
const router = Router();
const User = require('../models/User');

async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

router.get("/users", async (req, res) => {
    try{
        const users = await User.find({});
        res.json(users);
    }catch(e){
        res.status(500).json({message: e.message});
    }
});

router.get("/users/:id",getUser, async (req, res) => {
    res.json(res.user);
});

router.post("/users/login", async (req,res) => {
    const { email, password } = req.body;
    try{
        let user = await User.find({email,password});

        res.json(user[0]._id);
    }catch(e){
        res.status(404).json({msg:'user has not fined',msg2: req.body});
    }
});

router.post("/users", async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        lastName: req.body.lastName,
    });
    try{
        await user.save();
        res.status(201).json({user});
    }catch(e){
        res.status(400).json({message: e.message});
    }
});

router.put("/users/:id", getUser, async (req, res) => {
    try {
        const updatedUser = await res.user.set(req.body);
        res.json(updatedUser);
    }catch (e) {
        res.status(400).json({ message: e.message });
    }
});


router.delete("/users/:id", getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "Пользователь был удален" });
    }catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;