const User = require("../models/user-model");
const Post = require("../models/post-model");
const Comment = require("../models/comment-model");
const cloudinary = require("../config/cloudinary");
const formidable = require("formidable");
const mongoose = require("mongoose")

exports.addPost = async (req, res) => {
  try {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          message: "error in form post",
        });
      }
      const post = new Post();
      if (fields.text) {
        post.text = fields.text;
      }
      if (files.media) {
        const uploadedImage = await cloudinary.uploader.upload(
          files.media.filepath,
          { folder: "Threads/Posts" }
        );
        if (!uploadedImage) {
          return res.status(400).json({
            message: "error in uploading image",
          });
        }
        post.media = uploadedImage.secure_url;
        post.public_id = uploadedImage.public_id;
      }
      post.admin = req.user._id;
      const newPost = await post.save();
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { threads: newPost._id },
        },
        { new: true }
      );
      res.status(201).json({ message: "post created", newPost });
    });
  } catch (err) {
    res.status(400).json({
      message: "Error in adding post",
      err: err.message,
    });
  }
};

exports.allPost = async (req, res) => {
  try {
    const { page } = req.query;
    let pageNumber = page;
    if (!page || page === undefined) {
      pageNumber = 1;
    }
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * 3)
      .limit(3)
      .populate({path: 'admin', select: '-password'})
      .populate({path: 'likes', select: '-password'})
      .populate({
        path: "comments",
        populate: {
          path: "admin",
          model: "user",
        },
      });
    res.status(201).json({
      message: "post fetched",
      posts,
    });
  } catch (err) {
    res.status(400).json({
      message: "error in all post",
      err: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }
    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.status(400).json({ message: "Post not found!" });
    }
    const userId = req.user._id.toString();
    const adminId = postExists.admin._id.toString();
    if (userId !== adminId) {
      return res
        .status(400)
        .json({ msg: "you are not authorized to delete this post!" });
    }
    if (postExists.media) {
      await cloudinary.uploader.destroy(
        postExists.public_id,
        (error, result) => {
          console.log(error, result);
        }
      );
    }
    await Comment.deleteMany({ _id: { $in: postExists.comments } });

    await User.updateMany(
      {
        $or: [{ threads: id }, { repost: id }, { replies: id }],
      },
      {
        $pull: {
          threads: id,
          reposts: id,
          replies: id,
        },
      },
      { new: true }
    );
    await Post.findByIdAndDelete(id);
    res.status(400).json({ msg: "post deleted" });
  } catch (err) {
    res.status(400).json({
      message: "error in deletePost",
      err: err.message,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({
        message: "No post found",
      });
    }
    if (post.likes.includes(req.user._id)) {
      await Post.findByIdAndUpdate(id, {
        $pull: { likes: req.user._id },
      }, {new: true});
      return res.status(201).json({msg: "Post disliked!!!"})
    }
      await Post.findByIdAndUpdate(id, {
        $push: { likes: req.user._id },
      }, {new: true});
      return res.status(201).json({msg: "Post liked!!!"})
    
  } catch (err) {
    res.status(400).json({
      msg: "Error in likePost!",
      err: err.message,
    });
  }
};

exports.repost = async(req, res) =>{
  try {
    const {id} = req.params;
     if(!id){
       return res.status(400).json({msg: "id is required"})  
     }
     const post = await Post.findById(id);
     if(!post){
      return res.status(400).json({msg: "Post doesn't exists"})
     }
     const newId = new mongoose.Types.ObjectId(id);
     if(req.user.reposts.includes(newId)){
      return res.status(400).json({msg:"already reposted!"})
     }
     await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {repost: post._id},
      },
      {new: true}
     );
     res.status(201).json({msg: "reposted"});
  } catch (err) {
    res.status(400).json({msg: "Error in repost",
      err: err.message,
    })
  }
}

exports.singlePost = async(req, res)=>{
  try {
    const {id} = req.params;
    if(!id){
      return res.status(400).json({msg: "id is required"})  
    }
    const post = await Post.findById(id).populate({
      path: 'admin',
      select: "-password",
    })
    .populate({path: "likes", select: "-password"})
    .populate({
      path: "comments",
      populate: {
        path: "admin",
      },
    });
    res.status(200).json({
      message: "Post Fetched", post
    })
  } catch (err) {
    res.status(400).json({msg: "error in singlePost",
      err: err.message
    })
  }
}