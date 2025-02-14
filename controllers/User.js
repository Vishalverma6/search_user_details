const User = require("../models/User");

// searching user Details
exports.userSearch = async(req, res) => {
    try{
        // fetch the data from query 
        const query  = req.query.query;

        // validation
        if (!query) {
            return res.status(400).json({
                success:false,
                message:"Query parameter is required",
            });
        }

        if (typeof query !== "string" || query.trim().length === 0) {
            return res.status(400).json({
                success:false,
                message:"Invalid query parameter",
            });
        }

        const user = await User.findOne({$or: [{userName:query}]})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found with th given userName",
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully fecthed the User Data",
            data:user,
        });

        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occured while searching the user details",
        })
    }
}