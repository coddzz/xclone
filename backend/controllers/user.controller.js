import User from "../models/user.model.js";


export const getUserProfile = async (req, res) =>{
    
    try{
        
        const {username} = req.params;
        const user = await User.findOne({username}).select("-password");
        
        if(!user){
            return res.status(404).json({error: " User Not Found!"});
        }

        res.status(200).json(user);

    }catch (error){
        console.log(`Error in getUserProfile controller: ${error.message}`);
        res.status(500).json({error: error.message});
    }
}