import { useState, useCallback } from 'react';
import { useUser } from '@/context/UserContext';
import saveRecipes from '@/services/saveRecipes';
import unsaveRecipe from '@/services/unsaveRecipe';

export const useSaveRecipe = () => {
    const [savingRecipes, setSavingRecipes] = useState(new Set());
    const { user } = useUser();

    const toggleSave = useCallback(async (recipeId, currentIsSaved) => {
        console.log('toggleSave called with:', { recipeId, currentIsSaved, user });
        
        if (!user) {
            console.warn('User is null or undefined');
            return false;
        }

        if (!user.id) {
            console.warn('User object does not have an id property:', user);
            return false;
        }

        if (!recipeId) {
            console.warn('recipeId is missing or invalid:', recipeId);
            return false;
        }

        if (savingRecipes.has(recipeId)) {
            console.log('Recipe save/unsave already in progress');
            return false;
        }

        setSavingRecipes(prev => new Set(prev).add(recipeId));

        try {
            if (currentIsSaved) {
                // Unsave the recipe
                console.log('Attempting to unsave:', { userId: user.id, recipeId });
                await unsaveRecipe(user.id, recipeId);
                console.log(`Recipe ${recipeId} unsaved successfully`);
            } else {
                // Save the recipe
                console.log('Attempting to save:', { userId: user.id, recipeId });
                await saveRecipes(user.id, recipeId);
                console.log(`Recipe ${recipeId} saved successfully`);
            }
            return true; // Success
        } catch (error) {
            console.error('Error toggling recipe save:', error);
            // You could add a toast notification here
            return false; // Failed
        } finally {
            setSavingRecipes(prev => {
                const newSet = new Set(prev);
                newSet.delete(recipeId);
                return newSet;
            });
        }
    }, [user, savingRecipes]);

    const isSaving = useCallback((recipeId) => {
        return savingRecipes.has(recipeId);
    }, [savingRecipes]);

    return {
        toggleSave,
        isSaving
    };
};
