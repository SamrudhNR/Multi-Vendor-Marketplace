import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    role:{
        type: String,
        enum: ["customer", "vendor", "admin"],
        default: "customer"
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    },
    avatar:{
        url:String,
        key:String
    },
    addresses:[{
            type: {String,
            enum: ["home", "office", "other"],
            default: "home"
             },
            city:{
                type: String,
                required: [true, "City is required"],
            },
            state:{
                type: String,
                required: [true, "State is required"],
            },
            zipCode:{
                type: String,
                required: [true, "Zip code is required"]
            },
            country:{
                type: String,
                required: [true, "Country is required"],
                default: "India"
            },
            isDefault:{
                type: Boolean,
                default: false
            }
        }],
    //vendor specific fields
    vendorInfo:{
        businessName:String,
        businessType:{
            type: String,
            enum: ["individual", "company", "partnership"]
        },
        gstNumber:String,
        panNumber:String,
        bankDetails:{
            accountNumber:String,
            ifscCode:String,
            accountHolderName:String,
            bankName:String
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        verificationDocuments:[{
            type:String,
            url:String,
            key:String
        }],
        commissionRate:{
            type: Number,
            default: 10, // Default commission rate of 10%
            min: 0,
            max:50 // Maximum commission rate of 50%
        }
    },
    isActive: {
    type: Boolean,
    default: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date
    }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// // Virtual for user's default address
// userSchema.virtual('defaultAddress').get(function() {
//   return this.addresses.find(addr => addr.isDefault);
// });

// // Pre-save middleware to hash password
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// // Method to check password
// userSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

export default mongoose.model("User",userSchema);