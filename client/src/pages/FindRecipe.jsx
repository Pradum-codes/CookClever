import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import RecipeCard from "../components/RecipeCard"
import fetchByIngredients from "@/services/fetchByIngredients"
import { Search, X } from "lucide-react"
import { useRecipeSave } from '@/hooks/useRecipeSave'


function FindRecipe() {
    const [ingredients, setIngredients] = useState([])
    const [currentIngredient, setCurrentIngredient] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    // Use the custom hook for save functionality
    const { isSaved, handleToggleSave, isSaving } = useRecipeSave();

    const addIngredient = () => {
        if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
            setIngredients([...ingredients, currentIngredient.trim()])
            setCurrentIngredient("")
        }
    }

    const removeIngredient = (ingredient) => {
        setIngredients(ingredients.filter((i) => i !== ingredient))
    }

    const searchRecipes = async () => {
        if (ingredients.length === 0) return

        const ingredientsString = ingredients.join(',');
        await fetchByIngredients(ingredientsString, setLoading, setError, setSearchResults);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addIngredient()
        }
    }
    return(
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    🔍 Find Recipes by Ingredients
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Enter ingredients you have and discover amazing recipes you can make right now
                </p>
            </div>

            {/* Search Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-gray-800">🥘 Search by Ingredients</CardTitle>
                    <CardDescription className="text-gray-600">
                        Add ingredients you have available and we'll find matching recipes
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <Label htmlFor="ingredient" className="text-sm font-medium text-gray-700">Add Ingredient</Label>
                            <Input
                                id="ingredient"
                                placeholder="e.g., chicken, tomatoes, basil..."
                                value={currentIngredient}
                                onChange={(e) => setCurrentIngredient(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        <Button 
                            onClick={addIngredient} 
                            className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6"
                            disabled={!currentIngredient.trim()}
                        >
                            Add
                        </Button>
                    </div>

                    {ingredients.length > 0 && (
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700">Your Ingredients ({ingredients.length}):</Label>
                            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border">
                                {ingredients.map((ingredient) => (
                                    <Badge key={ingredient} variant="secondary" className="gap-2 py-1 px-3 bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors">
                                        {ingredient}
                                        <X 
                                            className="h-3 w-3 cursor-pointer hover:text-red-600 transition-colors" 
                                            onClick={() => removeIngredient(ingredient)} 
                                        />
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button 
                        onClick={searchRecipes} 
                        disabled={ingredients.length === 0 || loading} 
                        className="w-full gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-3 text-lg font-medium"
                    >
                        <Search className="h-5 w-5" />
                        {loading ? "Searching..." : "Find Recipes"}
                    </Button>
                </CardContent>
            </Card>

            {/* Error Display */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-red-500">⚠️</span>
                        {error}
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">🔍 Searching for recipes...</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-md p-4 animate-pulse border border-gray-100"
                            >
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-3"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Search Results */}
            {!loading && searchResults.length > 0 && (
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">
                            🎉 Found {searchResults.length} amazing recipes!
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Click on any recipe card to view detailed instructions
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((recipe) => (
                            <div key={recipe.id} className="transform transition-all duration-300 hover:scale-105">
                                <RecipeCard
                                    id={recipe.id}
                                    image={recipe.image}
                                    title={recipe.title}
                                    likes={recipe.aggregateLikes}
                                    isSaved={isSaved(recipe.id)}
                                    onSave={() => handleToggleSave(recipe.id)}
                                    isLoading={isSaving(recipe.id)}
                                    dietaryTags={recipe.diets || []}
                                    vegetarian={recipe.vegetarian}
                                    usedIngredients={recipe.usedIngredients}
                                    missedIngredients={recipe.missedIngredients}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results State */}
            {!loading && searchResults.length === 0 && ingredients.length > 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🤔</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes found</h3>
                    <p className="text-gray-500">
                        Try adding different ingredients or removing some to get more results
                    </p>
                </div>
            )}
        </div>
    </div>
    )
}

export default FindRecipe;