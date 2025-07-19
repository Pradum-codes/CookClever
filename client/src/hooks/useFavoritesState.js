import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/context/UserContext';
import fetchFavorites from '@/services/fetchFavorites';

export const useFavoritesState = () => {
    const [savedRecipeIds, setSavedRecipeIds] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    // Load saved recipes when user changes
    useEffect(() => {
        const loadSavedRecipes = async () => {
            if (!user?.id) {
                setSavedRecipeIds(new Set());
                return;
            }

            try {
                setLoading(true);
                const data = await fetchFavorites(user.id);
                if (data?.recipes) {
                    const ids = new Set(data.recipes.map(recipe => recipe.id));
                    setSavedRecipeIds(ids);
                }
            } catch (error) {
                console.error('Error loading saved recipes:', error);
                setSavedRecipeIds(new Set());
            } finally {
                setLoading(false);
            }
        };

        loadSavedRecipes();
    }, [user?.id]);

    const isSaved = useCallback((recipeId) => {
        return savedRecipeIds.has(recipeId);
    }, [savedRecipeIds]);

    const toggleSavedState = useCallback((recipeId) => {
        setSavedRecipeIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(recipeId)) {
                newSet.delete(recipeId);
            } else {
                newSet.add(recipeId);
            }
            return newSet;
        });
    }, []);

    return {
        isSaved,
        toggleSavedState,
        loading
    };
};
