import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/getuser', (req,res) => {
    User.find((error,result) => {
        if(error) throw error;
        res.json(result)
    })
})

router.get('/getuser/:id',(req,res) => {
    User.findById(req.params.id,(error,result) => {
        if(error) throw error;
        res.json(result)
    })
})

router.post('/adduser', (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    user.save((error,result) => {
        if(error) throw error;
        res.json({message: 'New user added',result})
    })
})

router.put('/updateuser', (req,res) => {
    const id = req.body._id;
    let updateData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }
    User.findByIdAndUpdate(id, updateData, {new: true},(error,result) => {
        if(error) throw error;
        res.json({message: 'User is updated',result})
    })
})

router.delete('/deleteuser', (req,res) => {
    const id = req.body._id;
    User.findByIdAndRemove(id, {new: true}, (error,result) => {
        if(error) throw error;
        res.json({message: 'User deleted',result})
    })
})


export default router;