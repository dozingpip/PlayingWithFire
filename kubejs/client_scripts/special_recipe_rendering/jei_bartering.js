// const $ScreenOpener = Java.loadClass('com.simibubi.create.foundation.gui.ScreenOpener')
// const $PonderTagScreen = Java.loadClass('com.simibubi.create.foundation.ponder.ui.PonderUI')
// This function will be used by JEI to verify if a custom recipe is apart of this category.
let verifyRecipe = (recipe) => {
    // The data we give later on in the recipes will be stored in the `data` field.
    // Whatever you pass in, is whatever you'll get out.
    // The possibilities are endless, as you are only restricted to what you can store on
    // the KubeJS client side.

    // IMPORTANT: Always return true or false. If you do not, it could crash the game or cause
    // JEI to not work properly.
    if (!recipe) return false;
    if (!recipe.data) return false;
    if (!recipe.data.name) return false;
    
    return !!recipe.data.name;
}

// JEI needs to understand what sort of information is held within
// the recipe. This is where you can define different types of slots,
// where they should go, if they are input, output, catalysts, or neither.
// Depending on the slot type, it will effect if the recipe appears in
// in the recipe lookup.
// Refer to the JEI API for more information on how to use this.
let handleLookup = (builder, recipe, focuses) => {
    builder.addInvisibleIngredients('INPUT').addItemStack('minecraft:gold_ingot')
    builder.addSlot("OUTPUT", 2, 2).addItemStack(recipe.data.item).setSlotName("loot");
}

// We tap into the Minecraft GuiGraphics class to draw the text description above the input slot.
let renderBarterLoot = (recipe, guiGraphics) => {
    // By using the Client binding we can get the Minecraft font.
    // Next we can draw the description of the recipe above the input slot.
    // (Font, FormattedText, xPos, yPos, textWidth, and I have no clue what the last argument does)
    // Probably z-index if I had to guess.
    guiGraphics.drawWordWrap(Client.font, Text.of(recipe.data.description), 25, 2, 150, 0);
}

JEIAddedEvents.registerCategories((event) => {
    event.custom("kubejs:bartering", (category) => {
        let { jeiHelpers } = category;
        let { guiHelper } = jeiHelpers;
        category.width = recipeWidth
        category.height = smallRecipeHeight
        global.barteringRecipeType = category
                .title("Piglin Bartering")
                // Set the background of the category to a blank 100x50 drawable canvas.
                .background(guiHelper.createBlankDrawable(category.width, category.height))
                .icon(guiHelper.createDrawableItemStack(Item.of('minecraft:gold_ingot')))
                // Set the callback function that will verify if a recipe is a valid recipe for this category.
                .isRecipeHandled((recipe) => verifyRecipe(recipe))
                // Set the callback function that will allow JEI to index this recipe and determine
                // what the inputs and outputs of each recipe are.
                .handleLookup((builder, recipe, focuses) => handleLookup(builder, recipe, focuses))
                // Set the callback function for rendering additional detials to the screen.
                .setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => renderBarterLoot(recipe, guiGraphics))
                .recipeType;
    });
});

// Here we can hook into the JEI recipe registration event to add some recipes to our
// newly created category.
JEIAddedEvents.registerRecipes((event) => {
    // This utilized the new recipe category you made above here.
    // All that's left is to add as many different recipes as your heart desires.
    // There are no limitations to what you can store as a "recipe". Nothing that you don't control
    // cares about the format of the data.
    // If you want it to be an object, an array, a string, a number, a boolean, or even a function,
    // It does not matter. It's all up to you. Go wild.
    // Just make sure to update how you render it in the category definition.
    var blah = event.custom("kubejs:bartering");
    var json = JsonIO.read("kubejs/data/minecraft/loot_tables/gameplay/piglin_bartering.json")
    var chance = (1.0 / json.pools[0].entries.length) * 100;
    json.pools[0].entries.forEach(element => {
        var name = element.name;
        var nameNoMod = name.substring(name.indexOf(":")+1).replaceAll("_", " ");
        var item = Item.of(name);
        var count = "";
        // console.log("element " + element);
        element.functions.forEach(func => {
            if (func.function == "minecraft:set_count")
            {
                count = func.count;
                if ("min" in func.count)
                {
                    count = func.count.min + "-" + func.count.max;
                }
            }
            else if (func.function == "set_nbt")
            {
                item = Item.of(name, "\"" + func.tag.toString().replaceAll("\"", "\\\"") + "\"");
                var tagValue = JsonIO.parse(func.tag.toString()).toString();
                tagValue = tagValue.substring(tagValue.lastIndexOf(":")+1).replaceAll("_", " ").replace("}", "").replace("\"", "")
                nameNoMod = tagValue + " " + nameNoMod;
            }
        });
        blah.add({item: item, name: name, description: nameNoMod + "\n" + chance + "% chance, count " + count});
    });
});

// JEIAddedEvents.registerRecipeCatalysts(event => {
//     event.data.addRecipeCatalyst('minecraft:gold_ingot', global.barteringRecipeType)
// })