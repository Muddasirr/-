const express= require('express');
const router=express.Router();
const authRouter=require('./auth');
const orderRouter=require('./order');
const recipeRouter=require('./recipe')


router.use('/auth',authRouter);
router.use('/order',orderRouter);
router.use('/recipe',recipeRouter)


module.exports=router;