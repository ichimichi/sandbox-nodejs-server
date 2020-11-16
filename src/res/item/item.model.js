import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const itemSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

itemSchema.plugin(mongoosePaginate);

export const Item = mongoose.model('item', itemSchema);
