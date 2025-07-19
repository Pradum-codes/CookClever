import { useState, useEffect } from "react"
import RecipeCard from "../components/RecipeCard"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import fetchFavorites from "@/services/fetchFavorites"
import { useUser } from "@/context/UserContext"

function Favorites() {
    const [savedRecipes, setSavedRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useUser();
    
    useEffect(() => {
        const getFavorites = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                const data = await fetchFavorites(user.id);
                console.log('Fetched favorites:', data);
                
                // The server returns { recipes: [...] }
                if (data && data.recipes) {
                    setSavedRecipes(data.recipes);
                } else {
                    setSavedRecipes([]);
                }
            } catch (err) {
                console.error('Error fetching favorites:', err);
                setError('Failed to load favorite recipes');
                setSavedRecipes([]);
            } finally {
                setLoading(false);
            }
        };

        getFavorites();
    }, [user?.id])

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-6">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mb-4"></div>
                        <h2 className="text-xl font-semibold mb-2">Loading Favorites...</h2>
                        <p className="text-muted-foreground">Please wait while we fetch your saved recipes</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center p-6">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <Heart className="h-12 w-12 text-red-500 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Error Loading Favorites</h2>
                        <p className="text-muted-foreground">{error}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (savedRecipes.length === 0) {
        return (
        <div className="flex-1 flex items-center justify-center p-6">
            <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Saved Recipes Yet</h2>
                <p className="text-muted-foreground">Start exploring recipes and save your favorites to see them here!</p>
            </CardContent>
            </Card>
        </div>
        )
    }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">❤️ Your Saved Recipes</h1>
        <p className="text-muted-foreground">
          {savedRecipes.length} recipe{savedRecipes.length !== 1 ? "s" : ""} saved for later
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedRecipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            id={recipe.id}
            image={recipe.image}
            title={recipe.title}
            likes={recipe.aggregateLikes || 0}
            isSaved={true}
            onSave={() => {}} // Handle unsaving if needed
            dietaryTags={[]}
            vegetarian={recipe.vegetarian}
            readyInMinutes={recipe.readyInMinutes}
            servings={recipe.servings}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites;