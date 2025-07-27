import User from "../models/user.model.js"

export const signup = async (req, res) =>{
    try {
        const {username, fullname, email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //email validation
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format"})
        }

        const existingUser = await User.findOne({email})// or check with username also
        const existingUsername = await User.findOne({username})
        if ( existingUser || existingUsername){
            return res.status(400).json({error: "Already Existing Username or Email"})
        }

    } catch (error){
        console.log(`Error in signup controller: ${error}`)
        res.status(500).json({error:"Internal Server Error"})
    }
    
}

export const login = (req, res) =>{
    res.send("Login Page..")
}

export const logout = (req, res) =>{
    res.send("logout")
}