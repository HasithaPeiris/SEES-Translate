const mongoose = require('mongoose')

const translationSchema = mongoose.Schema(
    {
        // each user associated with the translations
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        
        text: {
            type: String,
            required: [true, 'Please save a text value']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Translation', translationSchema)