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

export const followUnfollowUser = async (req, res) =>{

    try{
        const {id} = req.params;
        const userToModify = await User.findById.(id)
        const currentUser = await User.findById.(req.user._id)

        if (id === req.user_id.toString()){
            return res.status(400).json({error:"You can't follow/Unfollow your self!"})
        }

        if (!userToModify || !currentUser){
            return res.status(404).json(error:"User Not Found!")
        }

        const iSFollowing = currentUser.following.Includes(id);

        if(iSFollowing){
            //unfollow
            await User.findByIdAndUpdate(id, { $pull: { followers : req.user._id }})
            await User.findByIdAndUpdate(req.user._id, { $pull: { following : id }})

            return res.status(200).json({message :"Unfollow Successfull!"})
        } else{
            //follow
            await User.findByIdAndUpdate(id, { $push: { followers : req.user._id}})
            await User.findByIdAndUpdate(req.user._id, { $push: { followers : id}})

            //set notificaton...

            return res.status(200).json({message:"User Followed Successfully!"})
        }

    } catch(err){
        console.log(`Error in followUnfollowUser controller: ${err.message}`)
        res.status(500).json({error: err.message})
    }
}

