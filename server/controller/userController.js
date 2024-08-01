const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const APIFeatures = require("../Utils/apiFeatures");
dotenv.config({ path: "../config.env" });
const contactEmail = require("../Utils/contactMail");
const userEmail = require("../Utils/userMail");
const crypto = require("crypto");  // crypto is rendomly installed
const { promisify } = require("util");
const sendEmail = require("../Utils/email"); 
const  cloudinary  = require("../Utils/cloudinaryConfig");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const cloudinary = require("../Utils/cloudinaryConfig");
const upload = require("../Utils/upload");


exports.uploadImage = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err });
      }
  
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file selected!' });
      }
  
      const { userId } = req.body; // userId should be in the body as JSON
  
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }
  
      try {
        const user = await User.findById(userId);
  
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
  
        // Upload the file directly to Cloudinary
        cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return res.status(500).json({ success: false, message: 'Cloudinary upload error', error });
          }
  
          // Update the user with the image URL
          user.image = {
            url: result.secure_url,
            public_id: result.public_id,
          };
  
          user.save()
            .then(() => res.status(200).json({ success: true, user }))
            .catch(err => res.status(500).json({ success: false, message: 'Database update error', err }));
        }).end(req.file.buffer); // Pass the file buffer to Cloudinary
  
      } catch (err) {
        res.status(500).json({ success: false, message: 'Database query error', err });
      }
    });
  };


// CREATING TOKENA
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY, });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookiesOtions = {
        expires: new Date(
            Date.now() + process.env.COOKIES_EXPIRY_DATE * 24 * 60 * 60 * 1000 // we give te Date miliSeconds
        ),
        // secure:true,
        httpOnly: true,
    }

    // if(process.env.NODE_ENV == "production") cookiesOtions.secure = true;
    res.cookie("jwt", token, cookiesOtions);
    user.password = undefined;

    res.status(statusCode).json({
        success:'succesfuly Redister/LogedIn',
        token,
        user
    })
}


//  SINGUP
exports.singup = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);

    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     confrimPassword: req.body.confrimPassword,
    // });

    createSendToken(newUser, 200, res);
})


//  LOGIN
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(402).json({
            Error: "Please Provid Proper Email and password"
        });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email and password", 401))
    }
    createSendToken(user, 201, res);
})
// GoogleUser
exports.googleLogin = catchAsync(async (req, res, next) => {
    const { email, name } = req.body;
    if (!email || !name) {
        res.status(402).json({
            Error: "Please Provid Proper Email and password"
        });
    }

    const user = await User.findOne({ email });
    if (user) {
        return createSendToken(user, 201, res);
        // return next(new AppError("Incorrect email and password", 401))
    }
    const newUser = new User({
        email,
        name
    });

    const googleUser = await newUser.save();

    createSendToken(googleUser, 201, res);
})

//PROTECTON DATA
exports.protect = catchAsync(async (req, res, next) => {
    // CHECK TOKEN
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new AppError("You are not Logged In in to get Access! ", 403));
    }

    // Validate Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // // user Eixst
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError("the User Belonging to this token no longer Exist ", 405))
    }

    // // // change password
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError("User Resently chang the password", 401));
    }

    // // // USER WILL HAVE THE PRODUCTVE DATA
    req.user = currentUser;
    next();
})
exports.admin = catchAsync(async (req, res, next) => {
    // CHECK TOKEN
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new AppError("You are not Logged In in to get Access! ", 403));
    }

    // Validate Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // // user Eixst
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError("the User Belonging to this token no longer Exist ", 405))
    }

   
    if (!currentUser || currentUser.role !== 'admin') {
     return next(new AppError("Allow only Admin Not for all ", 409))
    }

    // // // USER WILL HAVE THE PRODUCTVE DATA
    req.user = currentUser;
    next();
})


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You have not access to delete NFT", 403))
        }
        next();
    }
}


// ----------  CHANGING PASSWORD   -------------------------------

// ---- FORGET PASSWORD
exports.forGetPassword = catchAsync(async (req, res, next) => {

    // Get the user based on given Email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("there is NO User with this Email ID ", 404));
    }
    
    // Create a rendom Token
    const resetToken = user.createPasswordRestToken();
    await user.save({ validateBeforeSave: false });
    
    // Send Email back to User
    // "protocol" works on all envirments
    // const resetURL = `${req.protocol}://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;
    const resetURL = `Hi ,Pleace follow this link to reset Your Password . This link is valid till 5 minutes from now . <a href=http://localhost:5173/resetpassword/${resetToken}>Click Here</a>`

   
    try {
        await sendEmail({
            email: user.email,
            subject: "Your Password Reset Token",
            message: "Forgot Your Password ? Submit The PATCH Request with your new Password & confrimPassword to : Below",
            html: resetURL
        })


        res.status(200).json({success:"token send to your email address"});


    } catch (error) {
        user.passwordRestToken = undefined;
        user.passwordRestExpries = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError("there was no error sending the email , try Again later", 502))
    }

})

// ---- RESET PASSWORD  
exports.reSetPassword = catchAsync(async (req, res, next) => {

    // Get user based on the token
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        passwordRestToken: hashedToken,
        passwordRestExpries: { $gt: Date.now() }
    })
    // If token has not expried , and there is user , set the new password
    if (!user) {
        return next(new AppError("Token is invalid or is Expire", 404))
    }

    // Update changedpassword for the user

    user.password = req.body.password;
    user.confrimPassword = req.body.confrimPassword;
    user.passwordRestToken = undefined;
    user.passwordRestExpries = undefined;
    await user.save();

    res.status(200).json({success:"password reset success"});
    // Log the user in , send JWT
    // createSendToken(user , 200 , res);
})

// ----------  UPDATING PASSWORD   -------------------------------
exports.updatingPassword = catchAsync(async (req, res, next) => {

    // Get user from collection of data
    const user = await User.findById(req.user._id).select("+password");
    // Check if the Posted current password is correct
    if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
        return next(new AppError("Your current Password is Wrong ", 402));
    }
    // if So< Update The Password
    user.password = req.body.password;
    user.confrimPassword = req.body.confrimPassword;
    await user.save();
    // Log user after password change
    createSendToken(user, 203, res);
})



const filterObj = (obj, ...allowFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowFields.includes(el)) {
            newObj[el] = obj[el]
        };
    })
    return newObj;
}


exports.updateMe = catchAsync(async (req, res, next) => {

    // Create Error While user updating password
    if (req.body.password || req.body.confrimPassword) {
        return next(new AppError("this route Not for password Update please use /updatingpassword", 400));
    }
    
    // Update User Data
    // user can Only Change name , email , photo , discription Not for all
    const filtereBody = filterObj(req.body, "firstName", "lastName"  , "email");
    const updateUser = await User.findByIdAndUpdate(req.user.id, filtereBody, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
console.log(updateUser)
    res.status(200).json({
        success: "Profile Updated Successfuly",
        user:updateUser
    })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(202).json({
        statas: "success",
        message: "De-Active"
    })
})

exports.getAllUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        status: "success",
        result: users.length,
        data: { users }
    })
    return next(new AppError("Internal Server Error", 500));
})




exports.createUsers = (req, res) => {
    res.status(501).json({
        status: "error",
        message: "Internal Server Error"
    })
}

exports.getSingalUser = catchAsync(async(req, res) => {
    const user = await User.findById(req.params.id).populate("whislist").populate("following").populate("followors");
      if(!user){
        return next(new AppError("User Doesn't Exist in DB", 500));
      }
    res.status(200).json(user);
})

// exports.updateUser = async (req, res, next) => {
//     try {
//       const { userId } = req.params;
//       const { firstName, lastName, email } = req.body;
  
//       if (!firstName && !lastName && !email) {
//         return next(new AppError("No fields to update", 400));
//       }
  
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return next(new AppError("User not found", 404));
//       }
  
//       if (firstName) user.firstName = firstName;
//       if (lastName) user.lastName = lastName;
//       if (email) user.email = email;
  
//       await user.save();
  
//       res.status(200).json({
//         status: "success",
//         message: "User updated successfully",
//         user
//       });
//     } catch (error) {
//       next(new AppError("Internal Server Error", 500));
//     }
//   };

exports.deleteUsers = (req, res) => {
    res.status(503).json({
        status: "error",
        message: "Internal Server Error"
    })
}


exports.createContactMail = catchAsync(async(req , res)=>{
    
    const { discreption ,email , name } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError("Uset Dosn't Exist with This Email", 400));
    }

    // const resetURL = `Hi ,Pleace follow this link to reset Your Password . This link is valid till 5 minutes from now . <a href=http://localhost:3000/resetpassword/${resetToken}>Click Here</a>`

    try {
        await contactEmail({
            email: email,
            subject: `User ${name} Need SomeThings`,
            message: "This is Contatact Us Mail",
            html:discreption
        })

        res.status(200).json("message send successfly");


    } catch (error) {
        return next(new AppError("there was an error , try Again later", 502))
    }

})

exports.createUserMail = catchAsync(async(req , res)=>{

    const { discreption ,email , name } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError("Uset Dosn't Exist with This Email", 400));
    }

    try {
        await userEmail({
            email: email,
            subject: `Hey  ${name} `,
            message: `${name} regarding your query` ,
            html:`we are here gor your help this is your query ${discreption} Our team Contant with you Thanks ${name} for reached Us`
        })

        res.status(200).json("message send successfly");


    } catch (error) {
        return next(new AppError("there was an error , try Again later", 502))
    }


})


// LOGOUT
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success', message: 'You have been logged out successfully' });
};
