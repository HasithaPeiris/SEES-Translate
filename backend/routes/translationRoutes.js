const express = require('express')
const router = express.Router()
const {
    getTranslations,
    saveTranslation,
    updateTranslation,
    deleteTranslation
} = require('../controllers/translationController')

router.route('/').get(getTranslations).post(saveTranslation)

router.route('/:id').put(updateTranslation).delete(deleteTranslation)

module.exports = router