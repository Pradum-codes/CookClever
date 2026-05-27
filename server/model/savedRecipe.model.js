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
    recipeData: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
});

savedRecipeSchema.index({ user: 1, recipeId: 1 }, { unique: true });

module.exports = mongoose.model('SavedRecipe', savedRecipeSchema);
