import { useContext } from "react";
import { RecipesContext } from "@/context/RecipeContext";
import RecipeCard from "@/components/RecipeCard";

const Home = () => {
    const { randomRecipes, loading, error } = useContext(RecipesContext);

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6">
            {randomRecipes.length === 0 ? (
                <div className="text-gray-500 text-center py-10">No recipes found.</div>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {randomRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            image={recipe.image}
                            likes={recipe.aggregateLikes || 0}
                            dietaryTags={recipe.diets || []}
                            vegetarian={recipe.vegetarian}
                            isSaved={false}
                            onSave={() => console.log("Save handler for:", recipe.id)}
                            nutrition={{
                                calories: recipe.nutrition?.calories || "N/A",
                                protein: recipe.nutrition?.protein || "N/A",
                                carbs: recipe.nutrition?.carbs || "N/A",
                                fat: recipe.nutrition?.fat || "N/A",
                            }}
                            usedIngredients={recipe.usedIngredients || []}
                            missedIngredients={recipe.missedIngredients || []}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;