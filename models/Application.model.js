const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        },
        offer: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Offer',
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;