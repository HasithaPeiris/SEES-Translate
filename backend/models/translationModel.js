const mongoose = require('mongoose')

const translationSchema = mongoose.Schema(
    {
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