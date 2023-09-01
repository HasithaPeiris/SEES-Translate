const express = require('express')
const router = express.Router()
const {
    getTranslations,
    saveTranslation,
    updateTranslation,
    deleteTranslation
} = require('../controllers/translationController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getTranslations).post(protect, saveTranslation)

router.route('/:id').put(protect, updateTranslation).delete(protect, deleteTranslation)

module.exports = router