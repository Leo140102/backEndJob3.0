const prisma = require("./prisma")

const findAllRecipes = (userId) => {
    return prisma.recipe.findMany({
        where: {
            userId
        }
    })
}

const saveRecipe = (recipe, userId) => {
    return prisma.recipe.create({
        data: {
            name_recipe: recipe.name_recipe,
            description: recipe.description,
            preparation_time: recipe.preparation_time,
            user:{
                connect:{
                    id: userId
                }
            }
        }
    })
}

const updateRecipe = (id, recipe) => {
    return prisma.recipe.update({
      where: {
        id: id,
      },
      data: recipe,
    });
  };

  const deleteRecipe = (id) => {
    return prisma.recipe.delete({
      where: {
        id: id,
      },
    });
  };
module.exports = {
    findAllRecipes,
    saveRecipe,
    updateRecipe,
    deleteRecipe
}