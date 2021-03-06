const User = require('../models/user.model');
const Sub = require('../models/sub.model');
const { validationResult } = require('express-validator');

exports.getUserSubs = (req, res, next) => {
    const userParam = req.params.username;
    User.findOne({ username: userParam }).populate('subs')
        .exec((err, user) => {
            if (err) res.status(400).json(err);
            else res.status(200).json(user.subs);
        });
}

exports.addUserSub = (req, res, next) => {
    try {
        validationResult(req).throw();
    }
    catch (err) {
        res.status(422).json(err.array());
    }

    const userQuery = req.params.username;
    const newSub = new Sub({
        name: req.body.name,
        desc: req.body.desc,
        url: req.body.url,
        price: req.body.price,
        billingCycle: req.body.billingCycle,
        billingDate: req.body.billingDate,
        lastUsed: req.body.lastUsed,
    });
    User.findOne({ username: userQuery })
        .exec((err, user) => {
            if (err) res.status(404).json({ error: err,  msg: "User not found." });
            else {
                newSub.user = user
                newSub.save();
                user.subs.map((oldSub) => {
                    if (oldSub === null || oldSub === undefined)
                        user.subs.remove(oldSub);
                })
                user.subs.push(newSub);
                user.save();
                res.status(201).json({ msg: "New sub created and added to User!" })
            }
        });
}