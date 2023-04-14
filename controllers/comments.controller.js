const {Comment , Replay } = require('../models/comment.model');


async function addComment(req,res){



    try{

        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json({success:true, data: comment});

    }
    catch(error){

        res.status(400).json({"message":error.message});
    }

}

async function getComment(req , res){

    const id = req.params;

    try{

        const comment = await Comment.findById(id);
        res.status(200).json({success:true, data: comment});

    }
    catch(error){

        res.status(400).json({"message":error.message});
    }
}

async function getAllComments(req , res){
    try{

        const comments = await Comment.find();
        res.status(200).json({success:true, data: comments});


    }catch(error){

        res.status(400).json({"message":error.message});

    }
}

async function deleteComment(req , res){

    const id = req.params;

    try{

        await Comment.findByIdAndDelete(id);
        res.status(200).json({"message":"comment deleted"});

    }
    catch(error){

        res.status(400).json({"message":error.message});

    }
}

async function updateComment(req , res){

    const id = req.params;

    try{

        const comment = await Comment.findByIdAndUpdate(id , req.body);
        res.status(200).json({success:true, data: comment});


    }catch(error){

        res.status(400).json({"message":error.message});

    }
    
}


module.exports={

    addComment,
    getAllComments,
    getComment,
    deleteComment,
    updateComment
}