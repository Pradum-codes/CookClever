import { createContext, useState, useEffect, useContext } from "react";
import random from "@/api/random";
import dummy from "@/api/dummy.js";

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
    const [randomRecipes, setRandomRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRandomRecipes = async () => {
        setLoading(true);
        try {
            const data = await random();
            // const data = dummy;
            setRandomRecipes(data.recipes || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RecipesContext.Provider value={{ randomRecipes, loading, error, fetchRandomRecipes }}>
            {children}
        </RecipesContext.Provider>
    );
};
