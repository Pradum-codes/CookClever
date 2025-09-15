import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Heart, ThumbsUp, Leaf, Loader2 } from "lucide-react";

export function RecipeCard({
    id,
    title,
    image,
    likes,
    dietaryTags,
    vegetarian,
    isSaved,
    onSave,
    nutrition,
    usedIngredients,
    missedIngredients,
    isLoading = false, // New prop for loading state
}) {
    const navigate = useNavigate();
    
    const handleCardClick = () => {
        navigate(`/recipe/${id}`, {
            state: {
                usedIngredients: usedIngredients || [],
                missedIngredients: missedIngredients || []
            }
        });
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card 
                        onClick={handleCardClick}
                        className="bg-amber-50 max-w-5xl group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                        <CardContent className="p-0">
                        <div className="relative h-72 bg-gray-100 rounded-t-lg overflow-hidden">
                            <img
                            src={image || "/placeholder.svg"}
                            alt={title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                            />
                            {vegetarian && (
                            <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="bg-green-100 text-green-800 gap-1">
                                <Leaf className="h-3 w-3" />
                                Vegetarian
                                </Badge>
                            </div>
                            )}
                        </div>

                        <div className="p-4 space-y-3">
                            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {title}
                            </h3>

                            <div className="flex flex-wrap gap-1">
                            {dietaryTags.map((diet) => (
                                <Badge key={diet} variant="outline" className="text-xs">
                                {diet}
                                </Badge>
                            ))}
                            </div>

                            <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <ThumbsUp className="h-4 w-4" />
                                {likes} likes
                            </div>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSave();
                                    
                                }}
                                variant={isSaved ? "default" : "outline"}
                                size="sm"
                                disabled={isLoading}
                                className={`gap-1 transition-all ${
                                isSaved
                                    ? "bg-red-500 hover:bg-red-600 text-white"
                                    : "hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                                        {isSaved ? "Saved" : "Save"}
                                    </>
                                )}
                            </Button>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                {nutrition && (
                <TooltipContent side="top" className="p-3">
                    <div className="space-y-1">
                    <h4 className="font-semibold">Nutritional Info</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Calories: {nutrition.calories}</div>
                        <div>Protein: {nutrition.protein}</div>
                        <div>Carbs: {nutrition.carbs}</div>
                        <div>Fat: {nutrition.fat}</div>
                    </div>
                    </div>
                </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
}

export default RecipeCard;