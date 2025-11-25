// In client scripts

JEIAddedEvents.registerCategories(event => {
    let verifyRecipe = (r) => {
        return r.data != undefined && r.data.output != undefined;
    }

    let handleLookup = (builder, recipe) => {
        // Required because JEI doesn't seem to build a category if it has no slots
        builder.addSlot('render_only', 5, 15).addItemStack("minecraft:iron_sword").setSlotName("sword");
        builder.addSlot('output', 100, 55).addFluidStack(recipe.data.output, recipe.data.outputAmount).setSlotName("output");
    }

    let renderRecipe = (r, guiGraphics) => {
        AllGuiTextures.JEI_ARROW.render(guiGraphics, 55, 55);
        AllGuiTextures.LEFT_CLICK.render(guiGraphics, 5, 25);

        let poseStack = guiGraphics.pose();
        poseStack.pushPose();
        let entity = r.data.entity(Client.level);

        // This part mostly comes from looking at how patchouli does it
        poseStack.translate(58, 60, 50);
        let scale = r.data.renderScale;
        poseStack.scale(scale, scale, scale)
        poseStack.translate(r.data.offset.x, r.data.offset.y, 0);
        poseStack.mulPose(new Quaternionf().rotationZ(KMath.PI)); // Whoever decided to bind Quaternionf thank you so much
        poseStack.mulPose(new Quaternionf().rotationY(KMath.PI / 3)); // Experiment with these values, find a value you like

        let entityRenderDispatcher = Client.entityRenderDispatcher;
        entityRenderDispatcher.setRenderShadow(false);
        entityRenderDispatcher.render(entity, 0, 0, 0, 0, 1, poseStack, guiGraphics.bufferSource(), 0xF000F0);
        entityRenderDispatcher.setRenderShadow(true);

        guiGraphics.bufferSource().endBatch();
        poseStack.popPose();

        GuiGameElement['of(net.minecraft.world.level.block.state.BlockState)'](Block.id("create:fluid_tank").getBlockState())
                .rotateBlock(12.5, 202.5, 0)
                .scale(20)
                .lighting(JEIREI.BLOCK_LIGHTING)
                .atLocal(0, 0.2, 0)
                .at(25, 62)
                .render(guiGraphics);
    }
    event.custom('kubejs:fluid_from_entity', category => {
        let { jeiHelpers } = category;
        let { guiHelper } = jeiHelpers;
        category.width = recipeWidth
        category.height = recipeHeight

        global.fluidEntityRecipeType = category
        .title("Fluid From Entity")
        .background(guiHelper.createBlankDrawable(category.width, category.height))
        .icon(guiHelper.createDrawableItemStack('create:fluid_tank'))
        .isRecipeHandled(r => verifyRecipe(r))
        .handleLookup((builder, r, focuses) => handleLookup(builder, r, focuses))
        .setDrawHandler((r, recipeSlotsView, guiGraphics, mouseX, mouseY) => renderRecipe(r, guiGraphics))
        .recipeType;
    })
})

JEIAddedEvents.registerRecipes(event => {
    let registerRecipe = (entityName, output, outputAmount, offset, scale) =>
    {
        let entity = Client.level.createEntity(entityName);
        entity.noCulling = true;
    
        event.custom('kubejs:fluid_from_entity')
        .add({
            entity: (level) => {
                if (entity.level != level) {
                    setLevelMethod.invoke(entity, level);
                }
                return entity;
            },
            output: output,
            outputAmount: outputAmount,
            offset: {x: offset.x, y: offset.y}, // Change to specification
            renderScale: scale, // Change to specification
        });
    }
    registerRecipe("minecraft:wither_skeleton", "minecraft:milk", 1, {x:-1, y:0}, 20)
    registerRecipe("minecraft:skeleton", "minecraft:milk", 1, {x:-1, y:0}, 20)
    registerRecipe("minecraft:magma_cube", "minecraft:lava", 1, {x:-1, y:0}, 20)
    // registerRecipe("minecraft:witch", "funkyfluids:redstone_suspension", 1, {x:-1, y:0}, 20)
})

// JEIAddedEvents.registerRecipeCatalysts(event => {
//     event.data.addRecipeCatalyst('create:fluid_tank', global.fluidEntityRecipeType)
// })