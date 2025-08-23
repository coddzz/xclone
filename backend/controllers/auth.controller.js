import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

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
            generateToken(newUser._id, res)
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

export const login = async (req, res) =>{

    try{
        const {username, password} = req.body;

        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Username or Password!"})
        }

        generateToken(user._id, res);

        res.status(200).json({
            message : "Login Successfull!",
            _id : user._id,
            username : user.username,
            fullname : user.fullname,
            email : user.email,
            bio : user.bio
        })


    } catch (error){
        console.log(`Error in Login controller : ${error}`)
        res.status(500).json({error:"Internal Server Error!"})
    }

}

export const logout = async (req, res) =>{
    try{
        res.cookie("jwt", "", { maxAge: 0} )
        res.status(200).json({message: "Logout Successfull!"})
        
    }catch(error){
        console.log(`Error in Logout Controller : ${error}`);
        res.status(500).json({error:"Internal Server Error!"});
    }
}

export const getMe = async (req, res) =>{
    try{
        const user = await User.findOne({_id: req.user._id}).select("-password");
        res.status(200).json(user);
    } catch (error){
        console.log(`error in getMe Controller: ${error}`)
        res.status(500).json({error: "Internal server error!"})
    }
}