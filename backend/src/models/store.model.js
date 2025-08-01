import mongoose from "mongoose";

const storeSchema= new mongoose.Schema({
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
        unique:true
    },
    storeName:{
        type: String,
        required:[true, "Store name is required"],
        maxlength: [100, "Store name cannot exceed 100 characters"]
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true
    },
    description:{
        type:String,
        maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    logo:{
        url: String,
        key: String
    },
    address:{
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    contactInfo:{
        phone: String,
        email: String,
        website: String
    },
    socialLinks: {
        facebook: String,
        instagram: String,
        twitter: String
    },
    businessHours: [{
        day: {
            type: String,
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        },
        openTime: String,
        closeTime: String,
        isClosed: {
            type: Boolean,
            default: false
        }
    }],
    policies: {
        returnPolicy: String,
        shippingPolicy: String,
        privacyPolicy: String
    },
    ratings:{
        average:{
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count:{
            type: Number,
            default: 0
        }
    },
    stats:{
        totalProducts:{
            type: Number,
            default: 0
        },
        totalOrders:{
            type: Number,
            default: 0
        },
        totalRevenue:{
            type: Number,
            default: 0
        }
    },
    isActive:{
        type: Boolean,
        default: true
    },
    isApproved:{
        type: Boolean,
        default: false
    },
    approvedAt: Date,
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps: true});


// // Pre-save middleware to generate slug
// storeSchema.pre('save', function(next) {
//   if (this.isModified('storeName')) {
//     this.slug = this.storeName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
//   }
//   next();
// });

export default mongoose.model("Store", storeSchema);