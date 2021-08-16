const express = require('express');
const router = new express.Router();

const userModel = require("../models/userModel");
const marksModel = require("../models/marks");


router.get("/v1/test", (req, res) => {
    res.json("working user router")
})

// api1 for adding user
router.post("/v1/user", (req, res) => {
    const User = new userModel(req.body);
    User.save((err, data) => {
        if (data) {
            res.json({ statusCode: 201, msg: "User successfully resgistered" })
        }
        else {
            res.json({ statusCode: 400, msg: "User not resgistered" })
        }
    })
})

//api 2 for adding marks per round
router.post("/v1/marks", (req, res) => {
    const marks = new marksModel(req.body);
    marksModel.find({ $and: [{ user_id: marks.user_id, attempt_round: marks.attempt_round }] }).exec((err, result) => {
        if (result) {
            if (result == "") {
                marks.save((err, data) => {
                    if (data) {
                        res.json({ statusCode: 201, msg: "User marks successfully added" })
                    }
                    else {
                        res.json({ statusCode: 400, msg: "User marks not added" })
                    }
                })
            }
            else {
                res.json({ statusCode: 404, msg: "This round marks already added" })
            }
        }
        else {
            res.json({ statusCode: 404, msg: "User marks not added" })
        }
    })

})

// api3 fetching heighest marks and average marks per round
router.get("/v1/marks/:name", (req, res) => {
    const name = req.params.name;
    marksModel.findOne({ attempt_round: name }).sort({ marks: -1 }).populate("user_id").exec((err, result) => {
        if (result) {
            marksModel.aggregate(
                [
                    { $match: { attempt_round: name } },
                    {
                        $group:
                        {
                            _id: "$attempt_round",
                            avg: { $avg: "$marks" }
                        }
                    }
                ]
            ).exec((err, data) => {
                if (data) {
                    res.json({ statusCode: 200, Round: name, Highest_Score: result, Average_Score: data })
                }
                else {
                    res.json({ statusCode: 400, msg: "Data not fetched" })
                }
            })
        }
        else {
            console.log(err)
        }
    })
})


module.exports = router;