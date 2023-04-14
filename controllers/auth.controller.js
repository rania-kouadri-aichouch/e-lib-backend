
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const mail = require('../utils/mail')


// this creates a JWT token for a given user id
const createToken =(_id) => {


    return jwt.sign({_id},process.env.SECRET , {expiresIn: '3d'})

}


//login function

async function login(req,res){

    const {email , password} = req.body
    try{
        //using the static method login defined in the model
        const user = await User.login(email , password)

        //create token
        const token  = createToken(user._id)
        
        res.status(200).json({
            email , token

        });

    }
    catch(error){

        res.status(400).json({error : error.message})

    }

}



//register function
async function register(req , res){
    const { email , password , role } = req.body
  
    try {
      // register the user using the static method signup
      const user = await User.signup(email , password , role)
  
      //create token to login with it
      const token  = createToken(user._id)
      
      //send email to the new user
      const from = "no-reply@e-lib.com"
      const subject = "welcome"
      const text = "thank you for register in our library"
      mail.sendEmail(from , email , subject , text)
  
      res.status(200).json({
        email,
        token
      });
    } catch(error) {
      res.status(400).json({error : error.message})
    }
  }

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

//get all users

async function getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


//delete user  

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        
        await User.findByIdAndDelete(id)
        
        res.send(`user has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
  


module.exports={

    register,
    getAllUsers,
    login,
    deleteUser
}