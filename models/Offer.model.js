const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'a title is required'],
        },
        description: {
            type: String,
            required: [true, 'a description is required'],
        },
        author: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: [true, 'the job offer must have an author']
        },
        images: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;