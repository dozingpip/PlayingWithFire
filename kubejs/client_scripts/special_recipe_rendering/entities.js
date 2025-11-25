// In client scripts

// Some reflection to prevent the entity from being recreated every frame
// const Entity = Java.loadClass('net.minecraft.world.entity.Entity');
const Level = Java.loadClass('net.minecraft.world.level.Level');
const Entity = Java.loadClass('net.minecraft.world.entity.Entity');
const AllGuiTextures = Java.loadClass('snownee.lychee.client.gui.AllGuiTextures');
const GuiGameElement = Java.loadClass('snownee.lychee.client.gui.GuiGameElement');
const recipeWidth = 150
const recipeHeight = 80
const smallRecipeHeight = 20
// const Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks');
// const ItemAndBlockBaseCategory = Java.loadClass('snownee.lychee.compat.jei.category.ItemAndBlockBaseCategory');
const JEIREI = Java.loadClass('snownee.lychee.compat.JEIREI');
const setLevelMethod = Entity.__javaObject__.getDeclaredMethod('m_284535_', Level);
setLevelMethod.setAccessible(true);
JEIAddedEvents.registerCategories(event => {
    let verifyRecipe = (r) => {
        return r.data != undefined && r.data.entity != undefined && r.data.description != undefined && r.data.offset != undefined && r.data.renderScale != undefined && r.data.output != undefined;
    }

    let handleLookup = (builder, recipe) => {
        // Required because JEI doesn't seem to build a category if it has no slots
        builder.addSlot('input', 0, 0).addItemStack(recipe.data.input).setSlotName("input");
        recipe.data.output.forEach((outputItem) => 
        {
            builder.addInvisibleIngredients('OUTPUT').addItemStack(outputItem)
        })
    }

    let renderRecipe = (r, guiGraphics) => {
        AllGuiTextures.JEI_ARROW.render(guiGraphics, 32, 55);
        guiGraphics.drawWordWrap(Client.font, Text.translatable(r.data.description), 16, 3, 150, 0);

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
        
        GuiGameElement['of(net.minecraft.world.level.block.state.BlockState)'](Block.id(r.data.fire).getBlockState())
                .rotateBlock(12.5, 202.5, 0)
                .scale(20)
                .lighting(JEIREI.BLOCK_LIGHTING)
                .atLocal(0, 0.2, 0)
                .at(0, 30)
                .render(guiGraphics);
        GuiGameElement['of(net.minecraft.world.level.block.state.BlockState)'](Block.id(r.data.input).getBlockState())
                .rotateBlock(12.5, 202.5, 0)
                .scale(20)
                .lighting(JEIREI.BLOCK_LIGHTING)
                .atLocal(0, 0.2, 0)
                .at(0, 50)
                .render(guiGraphics);
    }

    event.custom('kubejs:fire_entity', category => {
        let { jeiHelpers } = category;
        let { guiHelper } = jeiHelpers;
        category.width = recipeWidth
        category.height = recipeHeight

        global.fireEntityRecipeType = category
        .title("Mob spawning")
        .background(guiHelper.createBlankDrawable(category.width, category.height))
        .icon(guiHelper.createDrawableItemStack('minecraft:flint_and_steel'))
        .isRecipeHandled(r => verifyRecipe(r))
        .handleLookup((builder, r, focuses) => handleLookup(builder, r, focuses))
        .setDrawHandler((r, recipeSlotsView, guiGraphics, mouseX, mouseY) => renderRecipe(r, guiGraphics))
        .recipeType;
    })
    event.custom('kubejs:other_entity', category => {
        let { jeiHelpers } = category;
        let { guiHelper } = jeiHelpers;
        category.width = recipeWidth
        category.height = recipeHeight

        global.entityRecipeType = category
        .title("Mob spawning")
        .background(guiHelper.createBlankDrawable(category.width, category.height))
        .icon(guiHelper.createDrawableItemStack('minecraft:clock'))
        .isRecipeHandled(r => verifyRecipe(r))
        .handleLookup((builder, r, focuses) => handleLookup(builder, r, focuses))
        .setDrawHandler((r, recipeSlotsView, guiGraphics, mouseX, mouseY) => renderRecipe(r, guiGraphics))
        .recipeType;
    })
})

JEIAddedEvents.registerRecipes(event => {
    let registerRecipe = (entityName, inputBlock, drops, scale, offset, fire_type) =>
    {
        let entity = Client.level.createEntity(entityName);
        entity.noCulling = true;
    
        event.custom('kubejs:fire_entity')
        .add({
            entity: (level) => {
                if (entity.level != level) {
                    setLevelMethod.invoke(entity, level);
                }
                return entity;
            },
            description: 'set on fire and wait for it...',
            offset: {x: offset.x, y: offset.y}, // Change to specification
            renderScale: scale, // Change to specification
            input: inputBlock,
            output: drops,
            fire: fire_type
        });
    }
    
    let registerRecipe2 = (entityName, inputBlock, drops, scale, offset) =>
        {
            let entity = Client.level.createEntity(entityName);
            entity.noCulling = true;
            if(entityName == "minecraft:magma_cube")
                entity.mergeNbt('{Size:2}');
        
            event.custom('kubejs:other_entity')
            .add({
                entity: (level) => {
                    if (entity.level != level) {
                        setLevelMethod.invoke(entity, level);
                    }
                    return entity;
                },
                description: 'leave exposed to air',
                offset: {x: offset.x, y: offset.y}, // Change to specification
                renderScale: scale, // Change to specification
                input: inputBlock,
                output: drops
            });
        }
    registerRecipe('minecraft:ghast', "minecraft:white_wool", ["minecraft:ghast_tear", "minecraft:gunpowder"], 10, {x:5, y:-0.2}, 'minecraft:fire')
    registerRecipe('minecraft:enderman', "minecraft:soul_sand", ["minecraft:ender_pearl"], 25, {x:1.2, y:1}, 'minecraft:soul_fire')
    registerRecipe('minecraft:blaze', "minecraft:quartz_block", ["minecraft:blaze_rod"], 30, {x:1.2, y:0.8}, 'minecraft:fire')
    registerRecipe('minecraft:wither_skeleton', "minecraft:nether_bricks", ["minecraft:coal", "minecraft:bone", "minecraft:wither_skeleton_skull"], 28, {x:1.2, y:0.8}, 'minecraft:fire')
    registerRecipe2('minecraft:magma_cube', "minecraft:magma_block", ["minecraft:magma_cream"], 30, {x:1.7, y:0.5})
    registerRecipe2('minecraft:zombified_piglin', "minecraft:stripped_warped_stem", ["minecraft:rotten_flesh", "minecraft:gold_nugget", "minecraft:gold_ingot"], 30, {x:1.3, y:0.5})
})

// JEIAddedEvents.registerRecipeCatalysts(event => {
//     event.data.addRecipeCatalyst("minecraft:flint_and_steel", global.fireEntityRecipeType)
// })