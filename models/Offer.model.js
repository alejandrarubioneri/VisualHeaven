const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'a title is required'],
    },
    description: {
        type: String,
        required: [true, 'a description is required'],
    },
    categories: {
        type: [String],
        enum: [
            'Producer',
            'Video Editor',
            'Studio Engineers',
            'TV',
            'Cinema',
            'Director',
            'Camera',
            'Grip And Electric',
            'Hair And Makeup',
            'Locations',
            'Music',
            'Post Production',
            'Sound',
            'VFX',
            'Special FX',
            'Screenwriting',
            'Stunts',
            'Photographer',
            'Other'
        ]
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'the job offer must have an author']
    },
    image: {
        type: String,
        default: 'https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/36952/article_full%401x.jpg'
    }
}, {
    timestamps: true
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;