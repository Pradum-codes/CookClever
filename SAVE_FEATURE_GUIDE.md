# Recipe Save Feature Implementation

## Overview
The save feature allows users to save/unsave recipes to their favorites. It integrates with backend APIs and provides optimistic UI updates with loading states.

## Components

### 1. Services
- **`saveRecipes.js`**: API call to save a recipe
- **`unsaveRecipe.js`**: API call to unsave a recipe
- **`fetchFavorites.js`**: API call to get user's saved recipes

### 2. Custom Hooks

#### `useRecipeSave()`
The main hook that provides all save functionality:
```jsx
import { useRecipeSave } from '@/hooks/useRecipeSave';

const { isSaved, handleToggleSave, isSaving, loading } = useRecipeSave();
```

**Returns:**
- `isSaved(recipeId)` - Function to check if a recipe is saved
- `handleToggleSave(recipeId)` - Function to toggle save state
- `isSaving(recipeId)` - Function to check if a recipe is currently being saved
- `loading` - Boolean indicating if favorites are being loaded

### 3. RecipeCard Component

The `RecipeCard` component now accepts:
- `isSaved`: Boolean indicating if the recipe is saved
- `onSave`: Function to call when save button is clicked
- `isLoading`: Boolean to show loading state on save button

## Usage Example

```jsx
import { useRecipeSave } from '@/hooks/useRecipeSave';
import RecipeCard from '@/components/RecipeCard';

function MyComponent() {
  const { isSaved, handleToggleSave, isSaving } = useRecipeSave();
  
  return (
    <div>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          likes={recipe.aggregateLikes}
          isSaved={isSaved(recipe.id)}
          onSave={() => handleToggleSave(recipe.id)}
          isLoading={isSaving(recipe.id)}
          // ... other props
        />
      ))}
    </div>
  );
}
```

## Features

1. **Optimistic Updates**: UI updates immediately, reverts if backend fails
2. **Loading States**: Shows spinner while saving/unsaving
3. **Error Handling**: Gracefully handles API failures
4. **User Authentication**: Only works for logged-in users
5. **State Persistence**: Loads saved recipes on app start

## Backend Integration

The hooks expect these API endpoints:
- `POST /api/recipes/save` - Save a recipe
- `DELETE /api/recipes/unsave` - Unsave a recipe  
- `POST /api/recipes/favorites` - Get user's saved recipes

## Implementation Status

✅ **Completed:**
- Custom hooks created
- RecipeCard component updated
- Home page integrated
- FindRecipe page integrated
- Loading states implemented
- Error handling added

✅ **Working Features:**
- Save/unsave recipes
- Optimistic UI updates
- Loading indicators
- State persistence across page reloads
