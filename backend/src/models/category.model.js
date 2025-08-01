import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        maxlength: [50, "Category name cannot exceed 50 characters"]
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true
    },
    description:{
        type: String,
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    image:{
        url:String,
        key:String
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    subCategories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }],
    isActive:{
        type: Boolean,
        default: true
    },
    sortOrder:{
        type: Number,
        default: 0
    },
    seo:{
        metaTitle:String,
        metaDescription:String,
        keywords:[String]
    }
},{timestamps: true});

// // Virtual for products count
// categorySchema.virtual('productsCount', {
//   ref: 'Product',
//   localField: '_id',
//   foreignField: 'category',
//   count: true
// });

// // Pre-save middleware to generate slug
// categorySchema.pre('save', function(next) {
//   if (this.isModified('name')) {
//     this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
//   }
//   next();
// });

export default mongoose.model("Category", categorySchema);