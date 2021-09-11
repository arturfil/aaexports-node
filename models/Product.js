const {model, Schema} = require('mongoose');

const ProductSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'The name field is required'],
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category field is required']
    },
    description: {
      type: String,
    },
    img: {type: String}
  }
)

module.exports = model("Product", ProductSchema)