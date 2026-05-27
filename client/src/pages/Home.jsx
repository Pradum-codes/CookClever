import { useContext, useEffect } from "react";
import { RecipesContext } from "@/context/RecipeContext";
import RecipeCard from "@/components/RecipeCard";

const Home = () => {
  const { randomRecipes, loading, error, fetchRandomRecipes } = useContext(RecipesContext);

  useEffect(() => {
    fetchRandomRecipes();
  }, [fetchRandomRecipes]);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  const extractNutrients = (nutrients) => {
    const nutrientMap = {
      calories: "N/A",
      protein: "N/A",
      carbs: "N/A",
      fat: "N/A",
    };

    nutrients?.forEach((nutrient) => {
      const name = nutrient.name.toLowerCase();
      const amount = nutrient.amount;
      const unit = nutrient.unit;

      if (name === "calories") nutrientMap.calories = `${amount} ${unit}`;
      else if (name === "protein") nutrientMap.protein = `${amount} ${unit}`;
      else if (name === "carbohydrates") nutrientMap.carbs = `${amount} ${unit}`;
      else if (name === "fat") nutrientMap.fat = `${amount} ${unit}`;
    });

    return nutrientMap;
  };

  return (
    <div className="p-6">
      {randomRecipes.length === 0 ? (
        <div className="text-muted-foreground text-center py-10">No recipes found.</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {randomRecipes.map((recipe) => {
            const nutritionData = extractNutrients(recipe.nutrition?.nutrients);

            return (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                recipeData={recipe}
                title={recipe.title}
                image={recipe.image}
                likes={recipe.aggregateLikes || 0}
                dietaryTags={recipe.diets || []}
                vegetarian={recipe.vegetarian}
                isSaved={false}
                nutrition={nutritionData}
                usedIngredients={recipe.usedIngredients || []}
                missedIngredients={recipe.missedIngredients || []}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
