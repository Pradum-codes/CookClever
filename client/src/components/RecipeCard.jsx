import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Heart, ThumbsUp, Leaf, Loader2 } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import saveRecipe from "@/api/saveRecipe";
import removeRecipe from "@/api/removeRecipe";

export function RecipeCard({
    id,
    title,
    image,
    likes,
    dietaryTags = [],
    vegetarian,
    isSaved,
    onSave,
    onRemoved,
    nutrition,
    usedIngredients,
    missedIngredients,
    isLoading = false,
}) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [saving, setSaving] = useState(false);

    const handleCardClick = () => {
        navigate(`/recipe/${id}`, {
            state: {
                usedIngredients: usedIngredients || [],
                missedIngredients: missedIngredients || [],
            },
        });
    };

    const handleSaveClick = async (e) => {
        e.stopPropagation();
        if (!user?.id) {
            console.warn("User not logged in");
            return;
        }

        try {
            setSaving(true);
            await saveRecipe(user.id, id);
            if (onSave) onSave(id);
        } catch (err) {
            console.error("Failed to save recipe:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleRemoveClick = async (e) => {
        e.stopPropagation();
        if (!user?.id) {
            console.warn("User not logged in");
            return;
        }

        try {
            setSaving(true);
            await removeRecipe(id, user.id);
            if (onRemoved) onRemoved(id);
        } catch (err) {
            console.error("Failed to remove recipe:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card
                        onClick={handleCardClick}
                        className="bg-card w-full max-w-5xl group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border"
                    >
                        <CardContent className="p-0">
                            <div className="relative h-72 bg-muted rounded-t-lg overflow-hidden">
                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />
                                {vegetarian && (
                                    <div className="absolute top-2 left-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-100 text-green-800 gap-1 dark:bg-green-900 dark:text-green-100"
                                        >
                                            <Leaf className="h-3 w-3" />
                                            Vegetarian
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 space-y-3">
                                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors text-card-foreground">
                                    {title}
                                </h3>

                                <div className="flex flex-wrap gap-1">
                                    {dietaryTags.map((diet) => (
                                        <Badge key={diet} variant="outline" className="text-xs border-border text-muted-foreground">
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
                                        onClick={isSaved ? handleRemoveClick : handleSaveClick}
                                        variant={isSaved ? "default" : "outline"}
                                        size="sm"
                                        disabled={saving || isLoading}
                                        className={`gap-1 transition-all ${isSaved
                                                ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                                : "hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                                            }`}
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                {isSaved ? "Removing..." : "Saving..."}
                                            </>
                                        ) : (
                                            <>
                                                <Heart
                                                    className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                                                />
                                                {isSaved ? "Remove" : "Save"}
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
