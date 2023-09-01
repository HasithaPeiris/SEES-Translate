const asyncHandler = require('express-async-handler')

const Translation = require('../models/translationModel')
const User = require('../models/userModel')

// @desc    Get Translations
// @route   GET /api/translations
// @access  Private 
const getTranslations = asyncHandler (async (req, res) => {
    const translations = await Translation.find({user: req.user.id})

    res.status(200).json(translations)
})

// @desc    Save Translation
// @route   POST /api/translations
// @access  Private 
const saveTranslation = asyncHandler (async (req, res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error('Please save a text field')
    }

    const translation = await Translation.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(translation)
})

// @desc    Update Translation
// @route   PUT /api/translations/:id
// @access  Private 
const updateTranslation = asyncHandler (async (req, res) => {
    const translation = await Translation.findById(req.params.id)

    if(!translation){
        res.status(400)
        throw new Error('Translation not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the translation
    if(translation.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedTranslation = await Translation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedTranslation)
})

// @desc    Delete Translation
// @route   DELETE /api/translations/:id
// @access  Private 
const deleteTranslation = asyncHandler (async (req, res) => {
    const translation = await Translation.findById(req.params.id)

    if(!translation){
        res.status(400)
        throw new Error('Translation not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the translation
    if(translation.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await translation.deleteOne()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTranslations,
    saveTranslation,
    updateTranslation,
    deleteTranslation
}