const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const cloudinary = require("../config/cloudinary");

exports.signin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required." });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User exists already. Please Login" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(400).json({ message: "Error in Password Hashing" });
    }
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const result = await user.save();
    if (!result) {
      return res.status(400).json({ message: "Error while saving user" });
    }

    const accessToken = jwt.sign(
      { token: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    if (!accessToken) {
      return res.status(400).json({ message: "Error in generating token" });
    }
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res
      .status(201)
      .json({
        message: `Hola ${result?.userName}!! You have signed in successfully`,
      });
  } catch (err) {
    res.status(400).json({ message: "Error in Siging in !", err: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required.",
      });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        message: "User not found. Kindly Login!",
        error: err.message,
      });
    }
    const passwordMatched = await bcrypt.compare(password, userExists.password);

    if (!passwordMatched) {
      return res.status(400).json({
        message: "Invalid credentials!",
      });
    }
    const accessToken = jwt.sign(
      { token: userExists._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    if (!accessToken) {
      return res.status(400).json({
        message: "Error in generating access token while login!",
      });
    }
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({
      message: "User logged in successfully !",
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error in logging up!", error: err.message });
  }
};

exports.userDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }
    const userExists = await User.findById(id)
      .select("-password")
      .populate("followers")
      .populate({
        path: "threads",
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      })
      .populate({
        path: "threads",
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      })
      .populate({ path: "replies", populate: { path: "admin" } })
      .populate({
        path: "reposts",
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      });
    res.status(200).json({ message: "user details fetched!!", user });
  } catch (err) {
    res.status(400).json({
      message: "user details not fetched",
      error: err.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id is required!",
      });
    }
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    if (userExists.followers.includes(req.user._id)) {
      await User.findByIdAndUpdate(
        userExists._id,
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      );
      return res.status(201).json({
        message: `unfollowed ${userExists.userName}`,
      });
    }
    await User.findByIdAndUpdate(
      userExists._id,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    );
    return res.status(201).json({
      message: `Following ${userExists.userName}`,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error in followUser!", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userExists = await User.findById(req.user._id);
    if (!userExists) {
      return res.status(400).json({
        message: "No such user exists!",
      });
    }

    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          message: "Error in formidable",
          error: err,
        });
      }

      try {
        if (fields.text) {
          await User.findByIdAndUpdate(
            req.user._id,
            { bio: fields.text },
            { new: true }
          );
        }

        if (files.media) {
          if (userExists.public_id) {
            await cloudinary.uploader.destroy(userExists.public_id);
          }

          const uploadedImage = await cloudinary.uploader.upload(
            files.media.filepath,
            { folder: "Threads/Profiles" }
          );

          if (!uploadedImage) {
            return res.status(400).json({
              message: "Error in uploading image",
            });
          }

          await User.findByIdAndUpdate(
            req.user._id,
            {
              profilePic: uploadedImage.secure_url,
              public_id: uploadedImage.public_id,
            },
            { new: true }
          );
        }

        res.status(201).json({ message: "Profile updated successfully" });
      } catch (uploadErr) {
        res.status(400).json({
          message: "Error in updating profile",
          error: uploadErr.message,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: "Error in updating profile",
      error: err.message,
    });
  }
};

exports.searchUser = async (req, res) =>{
  try {
    const {query} = req.params;
    const users = await User.find({
      $or:[
        {userName: {$regex: query, $options: "i"}},
        {email: {$regex: query, $options: "i"}},
      ]
    });
    res.status(200).json({
      message: "Searched", users
    })
  } catch (err) {
    res.status(400).json({
      message: "Error in searching user",
      error: err.message
    })
  }
};

exports.logout = async (req, res) =>{
  try {
    res.cookie('token', '',{
      maxAge: Date.now(),
      httpOnly: true,
      sameSite: "none",
      secure: true
    });
    res.status(400).json({message: "You Logged Out!!"})
  } catch (err) {
    res.status(400).json("error in logout");
  }
};

exports.myInfo = async(req, res) =>{
  try {
    res.status(200).json({me: req.user})
  } catch (err) {
    res.status(400).json({message: "Error in myInfo"})
  }
}