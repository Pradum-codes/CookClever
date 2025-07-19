import React, { createContext, useState, useContext } from 'react';

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchByIngredients = async (ingredients) => {
        setLoading(true);
        try {
        const res = await fetch(`/api/recipes/by-ingredients?ingredients=${ingredients}`);
        const data = await res.json();
        setRecipes(data);
        } catch (err) {
        console.error('Error fetching recipes:', err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <RecipesContext.Provider value={{ recipes, loading, fetchByIngredients }}>
        {children}
        </RecipesContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRecipes = () => useContext(RecipesContext);
