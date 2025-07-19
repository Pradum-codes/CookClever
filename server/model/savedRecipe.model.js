const mongoose = require('mongoose');

const savedRecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipeId: {
        type: String,
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SavedRecipe', savedRecipeSchema);
