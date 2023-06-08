const express = require("express")
const z = require("zod")
const { findAllRecipes, saveRecipe, updateRecipe, deleteRecipe } = require("../database/recipe")
const { recipe } = require("../database/prisma")
const auth = require("../middleware/auth")
const router = express.Router()

const RecipeSchema = z.object({
    name_recipe: z.string(),
    description: z.string(),
    preparation_time: z.string()
})

router.get("/recipes", auth, async (req, res) => {
    const recipes = await findAllRecipes(req.userId)
    res.json({
        recipes
    })
})

router.post("/recipe", auth, async (req, res) => {
    try {
        console.log(req)
        const recipe = RecipeSchema.parse(req.body)
        const userId = req.body.userId
        console.log(userId)
        const savedRecipe = await saveRecipe(recipe, userId)
        res.status(201).json({
            recipe: savedRecipe,
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                message: error.errors,
            })
        }
        console.log(error)
        res.status(500).json({
            message: "server error",
        })
    }
})

router.put("/recipe/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const recipe = RecipeSchema.parse(req.body);
    const updatedRecipe = await updateRecipe(id, recipe);
    res.json({
        recipe: updatedRecipe,
    });
});

router.delete("/recipe/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    await deleteRecipe(id);
    res.status(204).send();
  });


module.exports = router;