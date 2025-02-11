 const User = require('../models/user-model');
 const Post = require('../models/post-model');
 const Comment = require('../models/comment-model');
const { default: mongoose } = require('mongoose');

 exports.addComment = async(req, res)=>{
  try {
    const {id} = req.params;
    const {text} = req.body;
    if(!id){
      return res.status(400).json({msg: "id required!"})
    }
    if(!text){
      return res.status(400).json({msg: "no comment !"})
    }
    const postExists = await Post.findById(id);
    if(!postExists){
      return res.status(400).json({message: "no such post"});
    }
    const comment = new Comment({
      text,
      admin: req.user._id,
      post: postExists._id,
    });
    const newComment = await comment.save();
    await Post.findByIdAndUpdate(
      id,
      {
        $push: {comments: newComment._id},
      },
      {new: true}
    );
    res.status(201).json({msg: "commented!!"});
  } catch (err) {
    res.status(400).json({
      message: "error in addComment",
      err: err.message,
    });
  }
 };

  exports.deleteComment = async(req, res)=>{
    try {
      const {id, postId} = req.params;
      if(!id || !postId){
        return res.status(400).json({msg: "id or postId required!!", 
          })
      }
      const post = await Post.findById(id);
      if(!post){
        return res.status(400).json({msg:"no such post"
          })
      }
      const commentExists = await Comment.findById(id); 
      if(!commentExists){
        return res.status(400).json({msg:"no such comment"
          })
      }
      const newId = new mongoose.Types.ObjectId(id);
      if(postExists.comments.includes(newId)){
        const id1 = commentExists.admin._id.toString();
        const id2 = req.user._id.toString();
        if(id1 !== id2){
          return res.status(400).json({msg: "you are not authorized to delete the comment"})
        }
        await Post.findByIdAndUpdate(
          postId,
          {
            $pull: {comments: id}, 
          },
          {new: true}
        );
        await User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: {replies: id}, 
          },
          {new: true}
        );
        await Comment.findByIdAndDelete(id);
        return res.status(201).json({msg:"comment deleted"});
      }
      res.status(400).json({msg:"this post doesnt include the comment"
      })
    } catch (err) {
      res.status(400).json({msg: "error in deletepost", 
      err: err.message,
      })
    }
  }