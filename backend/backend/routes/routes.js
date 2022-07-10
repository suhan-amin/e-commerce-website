const router = require('express').Router();
const {body} = require('express-validator');
const login=require("../users/login")
const signup=require("../users/signup")
const wishlist=require("../users/wishlist")
const getwishlist=require("../users/getwishlist")
const order_details=require("../users/orderdetails")
const getorderdetails=require("../users/getorderdetails");
const allproduct = require('../users/allproduct');
const getproduct = require('../users/getproduct');
const getUser = require('../users/getUser');
const removewishlist = require('../users/removewishlist');



router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of min 8 max 32 characters length").notEmpty().trim().isLength({ min: 8,max:32 }),
],login)


router.post('/signup',[
    body('name').notEmpty().trim(),
    body('address').notEmpty().trim(),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 8,max:32 }),
],signup)


router.post('/addwishlist',[body('productid').notEmpty().trim()],wishlist)
router.post('/removewishlist',[body('productid').notEmpty().trim()],removewishlist)



router.get('/getwishlist',getwishlist)

router.post('/orderdetails',[body('productid').notEmpty().trim()],order_details)

router.get('/getorderdetails',getorderdetails)

router.get('/allproduct',allproduct)

router.post('/getproduct',[body("productid").notEmpty().trim()],getproduct)

router.get('/getuser',getUser)
module.exports = router;
