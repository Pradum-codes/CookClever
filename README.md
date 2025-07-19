# 🍽️ CookClever

CookClever is a full-stack MERN application that helps users discover delicious recipes, generate meals based on available ingredients, and build smart grocery lists — all from an intuitive, dashboard-style interface.

“Cook smart. Eat clever.”

---

## 🚀 Features

### 🧑‍🍳 User Experience
- 🔐 User Authentication (JWT)
- 🏠 Dashboard with random recipe inspiration
- 🥗 Ingredient-based recipe generator
- ❤️ Save & rate favorite recipes
- 🛒 Smart grocery list generation
- 🌙 Dark mode toggle
- 📱 Mobile-first responsive design

### 🧠 Technical Stack
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Backend**: Node.js + Express + MongoDB
- **API Integration**: [Spoonacular API](https://spoonacular.com/food-api)
- **Auth**: JWT + bcrypt
- **State Management**: React Context (for Auth, Theme)

## Login and Register
![Login Screenshot](./screenshots/login.png) 
![Regiser Screenshot](./screenshots/register.png)

## Home Screen
![Home Screenshot](./screenshots/home.png)

## Explore Recipe
![Recipe Screenshot](./screenshots/explore.png)

## Search By Ingrideints
![Search Screenshot](./screenshots/search_result.png)

## Save Your recipes in Favorites
![Favorites Screenshot](./screenshots/saved.png)

## Get Clear instruction on each Recipe
![Instruction Screenshot](./screenshots/instruction.png)

## Get your shooping list ready with Missing Ingredients
![Missing ingredints Sceenshot](./screenshots/missing_ingredients.png)

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/recipe-app.git
cd recipe-app
```

2. **Install Backend Dependencies**

```bash
cd server
npm install
```
3. **Set Environment Variables**
Create a .env file in the server/ directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=yourSecretKey
SPOONACULAR_API_KEY=yourSpoonacularAPIKey
```

4. **Run Backend**

```bash
npm start
```

5. **Install Frontend Dependencies**

```bash
cd ../client
npm install
```

6. **Run Frontend**

```bash
npm start
```

## API Overview

### Auth Routes
- POST /api/auth/register – Register new user
- POST /api/auth/login – Login and receive JWT

### Recipe Routes
- GET /api/recipes/api/recipes/random – Get Random recipes
- GET /api/recipes/:id – Get full recipe info by ID
- POST /api/recipes/save – Save a recipe
- POST /api/recipes/favorites – Fetch user's saved recipes
- POST /api/recipes/search - Fetch Recipes based on Ingredients

## Respective Screenshots of the Routes

### Register and Login
![](./screenshots/api.register.png)
![](./screenshots/api.login.png)

### Random Recipe
![](./screenshots/api.random.png)

### Full Recipe
![](./screenshots/api.recipe.png)

### Save Recipe
![](./screenshots/api.save.png)

### Favorite Recipe
![](./screenshots/api.favorite.png)

### Search Recipe
![](./screenshots/api.register.png)