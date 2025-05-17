// In client scripts

JEIAddedEvents.registerCategories(event => {
    let verifyRecipe = (r) => {
        return r.data != undefined && r.data.output != undefined;
    }

    let handleLookup = (builder, recipe) => {
        // Required because JEI doesn't seem to build a category if it has no slots
        builder.addSlot('input', 30, 5).addItemStack(recipe.data.input).setSlotName("input");
        builder.addSlot('render_only', 60, 5).addItemStack("minecraft:lightning_rod").setSlotName("rod");
        builder.addSlot('output', 90, 5).addItemStack(recipe.data.output).setSlotName("output");
    }

    let renderRecipe = (r, guiGraphics) => {
        
    }
    event.custom('kubejs:lightning_channeling', category => {
        let { jeiHelpers } = category;
        let { guiHelper } = jeiHelpers;
        category.width = recipeWidth
        category.height = smallRecipeHeight

        global.lightningRecipeType = category
        .title("Lightning Channeling")
        .background(guiHelper.createBlankDrawable(category.width, category.height))
        .icon(guiHelper.createDrawableItemStack('minecraft:lightning_rod'))
        .isRecipeHandled(r => verifyRecipe(r))
        .handleLookup((builder, r, focuses) => handleLookup(builder, r, focuses))
        .setDrawHandler((r, recipeSlotsView, guiGraphics, mouseX, mouseY) => renderRecipe(r, guiGraphics))
        .recipeType;
    })
})

JEIAddedEvents.registerRecipes(event => {
    let registerRecipe = (inputBlock, output) =>
    {
    
        event.custom('kubejs:lightning_channeling')
        .add({
            input: inputBlock,
            output: output
        });
    }
    registerRecipe("minecraft:calcite", "minecraft:budding_amethyst")
})

JEIAddedEvents.registerRecipeCatalysts(event => {
    event.data.addRecipeCatalyst('minecraft:lightning_rod', global.lightningRecipeType)
})