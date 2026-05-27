import { createContext, useCallback, useState } from "react";
import random from "@/api/random";

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
    const [randomRecipes, setRandomRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRandomRecipes = useCallback(async () => {
        setLoading(true);
        try {
            const data = await random();
            setRandomRecipes(data.recipes || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <RecipesContext.Provider value={{ randomRecipes, loading, error, fetchRandomRecipes }}>
            {children}
        </RecipesContext.Provider>
    );
};
