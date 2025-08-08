import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) =>{
    try{
        const { username, fullname, email, password } = req.body;
        //app.use(express.json());

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //email validation
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format!"})
        }

        // checking if email and username already exists
        const existingEmail= await User.findOne({email});
        const existingUsername = await User.findOne({username});
        if(existingEmail||existingUsername){
            return res.status(400).json({error:"Email or Username Already Exists!"})
        }

        //cheking password atleast 6
        if(password.length < 6 ){
            return res.status(400).json({error:"Password Must Have 6 Letters!"});
        }

        // password hashing using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // creating new user data
        const newUser = new User({
            username : username,
            fullname : fullname,
            email : email,
            password : hashedPassword
        })

        if (newUser){
            await newUser.save();
            res.status(200).json({Status:"User Created Successfully!"})
        } else {
            res.status(400).json({error:"Invalid User Data..!"})
        }

    } catch (error) {
       console.log(`Error in signup controller ${error}`);
       res.status(500).json({message: "Internal Server Error!"});
    }
}

export const login = (req, res) =>{
    res.send("login..")
}

export const logout = (req, res) =>{
    res.send("logout..")
}