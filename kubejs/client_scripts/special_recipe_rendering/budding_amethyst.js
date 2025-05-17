// In client scripts

// Some reflection to prevent the entity from being recreated every frame


JEIAddedEvents.registerCategories(event => {
    let verifyRecipe = (r) => {
        return r.data != undefined && r.data.output != undefined;
    }

    let handleLookup = (builder, recipe) => {
        // Required because JEI doesn't seem to build a category if it has no slots
        builder.addSlot('input', 0, 55).addItemStack(recipe.data.input).setSlotName("input");
        builder.addSlot('render_only', 62, 55).addItemStack(recipe.data.grown).setSlotName("grown");
        builder.addSlot('output', 120, 55).addItemStack(recipe.data.output).setSlotName("output");
    }

    let renderRecipe = (r, guiGraphics) => {
        AllGuiTextures.JEI_ARROW.render(guiGraphics, 20, 60);
        AllGuiTextures.JEI_ARROW.render(guiGraphics, 80, 60);
    }
    event.custom('kubejs:amethyst_growing', category => {
        let { jeiHelpers } = category;
        let { guiHelper } = jeiHelpers;
        category.width = recipeWidth
        category.height = smallRecipeHeight

        global.entityRecipeType = category
        .title("Amethyst growing")
        .background(guiHelper.createBlankDrawable(category.width, category.height))
        .icon(guiHelper.createDrawableItemStack('minecraft:amethyst_cluster'))
        .isRecipeHandled(r => verifyRecipe(r))
        .handleLookup((builder, r, focuses) => handleLookup(builder, r, focuses))
        .setDrawHandler((r, recipeSlotsView, guiGraphics, mouseX, mouseY) => renderRecipe(r, guiGraphics))
        .recipeType;
    })
})

JEIAddedEvents.registerRecipes(event => {
    let registerRecipe = (inputBlock, grown, drops) =>
    {
        event.custom('kubejs:amethyst_growing')
        .add({
            input: inputBlock,
            grown: grown,
            output: drops
        });
    }
    registerRecipe(Item.of("minecraft:budding_amethyst"), "minecraft:amethyst_cluster", "minecraft:amethyst_shard")
})