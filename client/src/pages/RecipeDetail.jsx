import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Users } from "lucide-react";
import fetchById from "@/services/fetchById";

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get ingredient data from navigation state if available
    const location = useLocation();
    const usedIngredients = location.state?.usedIngredients || [];
    const missedIngredients = location.state?.missedIngredients || [];

    useEffect(() => {
        const fetchData = async () => {
            if (location.state?.recipe) {
                setRecipe(location.state.recipe);
                setLoading(false);
            } else {
                setLoading(true);
                const data = await fetchById(id);
                setRecipe(data);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, location.state]);

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-64 bg-gray-200 rounded-lg"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            <div className="space-y-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            <div className="space-y-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        {recipe.title}
                    </h1>
                    <div className="flex justify-center items-center gap-6 text-gray-600">
                        {recipe.readyInMinutes && (
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span>{recipe.readyInMinutes} minutes</span>
                            </div>
                        )}
                        {recipe.servings && (
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <span>{recipe.servings} servings</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Image and Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-full h-80 object-cover rounded-xl shadow-lg"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">About this recipe</h2>
                        <div 
                            className="text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                                __html: recipe.summary?.replace(/<\/?b>/g, '').replace(/<\/?a[^>]*>/g, '') || 'No summary available.' 
                            }}
                        />
                    </div>
                </div>

                {/* Ingredients Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Available Ingredients */}
                    {usedIngredients.length > 0 && (
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl text-green-700 flex items-center gap-2">
                                    <CheckCircle className="h-6 w-6" />
                                    Ingredients You Have ({usedIngredients.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {usedIngredients.map((ingredient, idx) => (
                                        <li key={idx} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            <span className="text-gray-700">{ingredient.original}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Missing Ingredients */}
                    {missedIngredients.length > 0 && (
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl text-red-700 flex items-center gap-2">
                                    <XCircle className="h-6 w-6" />
                                    Missing Ingredients ({missedIngredients.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {missedIngredients.map((ingredient, idx) => (
                                        <li key={idx} className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
                                            <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                            <span className="text-gray-700">{ingredient.original}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* All Ingredients (fallback for random recipes) */}
                    {usedIngredients.length === 0 && missedIngredients.length === 0 && (
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur lg:col-span-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl text-gray-700">All Ingredients</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {recipe.extendedIngredients?.map((ingredient, idx) => (
                                        <li key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">{ingredient.original}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Instructions */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl text-gray-800">Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="space-y-4">
                            {recipe.analyzedInstructions?.[0]?.steps?.map((step, idx) => (
                                <li key={idx} className="flex gap-4">
                                    <Badge variant="outline" className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                                        {idx + 1}
                                    </Badge>
                                    <p className="text-gray-700 leading-relaxed pt-1">{step.step}</p>
                                </li>
                            ))}
                        </ol>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RecipeDetail;
