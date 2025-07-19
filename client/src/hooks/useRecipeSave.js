import { useCallback } from 'react';
import { useSaveRecipe } from './useSaveRecipe';
import { useFavoritesState } from './useFavoritesState';

export const useRecipeSave = () => {
    const { toggleSave, isSaving } = useSaveRecipe();
    const { isSaved, toggleSavedState, loading } = useFavoritesState();

    const handleToggleSave = useCallback(async (recipeId) => {
        const currentIsSaved = isSaved(recipeId);
        
        // Optimistically update the UI
        toggleSavedState(recipeId);
        
        // Try to sync with backend
        const success = await toggleSave(recipeId, currentIsSaved);
        
        // If backend call failed, revert the optimistic update
        if (!success) {
            toggleSavedState(recipeId); // Revert
        }
    }, [isSaved, toggleSavedState, toggleSave]);

    return {
        isSaved,
        handleToggleSave,
        isSaving,
        loading
    };
};
