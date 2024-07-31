const crypto = require("crypto");  // crypto is rendomly installed
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide firstname"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide lastname"],
    },
    email: {
        type: String,
        required: [true, "Please must be provivded email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide valid email address"],
    },
    role: {
        type: String,
        enum: ["company", "admin"],
        default: "company"
    },

    image: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        }
    },

    
    password: {
        type: String,
        // required: [true, "Please Provide Password"],
        minlength: 5,
        select: false
    },

    confrimPassword: {
        type: String,
        // required: [true, "Please Provide confrimPassword"],
        validate: {
            //  "this" only work on save not on find , findOne
            validator: function (el) {
                return el === this.password
            },
            message: "Password are NOT the Same",
        },
    },


    passwordChangedAt: Date,
    passwordRestToken: String,
    passwordRestExpries: Date,
    refreshToken: String,


}, { timestamps: true });

userSchema.pre("save", function (next) {
    // we want execute this Only changing time  NOT Creating Time

    if (!this.isModified("password") || this.isNew) return next();
    // Before save on DB we set the "passwordChangedAt" 
    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.pre(/^find/, function (next) {
    //  in this pre Hook we will get On Request of GetAllUser 
    // we seen only "active: true" users  other all users we can't see
    // But still Save on our DB
    // here we use Moongoose oprators "$ne"
    this.find({ active: { $ne: false } });
    next();
})

userSchema.pre("save", async function (next) {
    // PASSWORD MODIFIED
    if (!this.isModified("password")) return next();

    // Rub this cod
    this.password = await bcrypt.hash(this.password, 12);
    this.confrimPassword = undefined;
    next();
})

userSchema.methods.correctPassword = async function (candidattePassword, userPassword) {
    return await bcrypt.compare(candidattePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        console.log("changedTimestamp=>", changedTimestamp, "JWTTimestamp=>", JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }
    // By default we are going to return false
    return false
}

userSchema.methods.createPasswordRestToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordRestToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordRestExpries = Date.now() + 5 * 60 * 1000; // "5" means Expiry 10 Minutes
    return resetToken;
}



const User = mongoose.model("User", userSchema);
module.exports = User;