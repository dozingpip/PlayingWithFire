ServerEvents.recipes(event => {
    event.recipes.create.emptying([
        'minecraft:netherrack',
        Fluid.of('minecraft:lava', 1500)
    ], 'minecraft:magma_cream').id("playingwithfire:emptying/lava")

    //crushing
    event.recipes.create.crushing(Item.of("minecraft:bone_meal", 3), "minecraft:shroomlight")
    event.recipes.create.crushing(['minecraft:gold_ingot', Item.of('minecraft:gold_ingot', 1).withChance(0.25)], 'minecraft:golden_sword').id("playingwithfire:crushing/golden_sword")
    event.recipes.create.crushing('minecraft:red_mushroom', 'minecraft:crimson_fungus').id("playingwithfire:crushing/red_mushroom")
    event.recipes.create.crushing('minecraft:brown_mushroom', 'minecraft:warped_fungus').id("playingwithfire:crushing/brown_mushroom")
    event.recipes.create.crushing(Item.of('minecraft:warped_fungus').withChance(0.25), 'minecraft:warped_wart_block').id("playingwithfire:crushing/warped_fungus")
    event.recipes.create.crushing('create:powdered_obsidian', '#forge:obsidian').id("playingwithfire:crushing/powdered_obsidian")
    event.remove({id: 'create:crushing/nether_wart_block'})
    event.recipes.create.crushing([Item.of('minecraft:crimson_fungus').withChance(0.5), Item.of('minecraft:nether_wart', 1).withChance(0.25)], 'minecraft:nether_wart_block').id("playingwithfire:crushing/wart_block_crush")
    event.recipes.create.milling(["minecraft:quartz"], "minecraft:quartz_block").id("playingwithfire:milling/quartz");
    event.remove({id: 'create:milling/wheat'})
    event.recipes.create.milling([Item.of("minecraft:wheat_seeds").withChance(0.4), "create:wheat_flour", Item.of("create:wheat_flour").withChance("0.5")], "minecraft:wheat").id("playingwithfire:milling/wheat");
    event.recipes.create.milling(["minecraft:andesite"], "minecraft:polished_andesite").id("playingwithfire:milling/unpolish_andesite");
    event.recipes.create.milling(["create:cinder_flour"], "minecraft:netherrack").id("playingwithfire:milling/cinder_flour");
    event.recipes.create.milling([Item.of("minecraft:dead_bush").withChance(0.25), Item.of('minecraft:gold_nugget', 3)], "minecraft:red_sand").id("playingwithfire:milling/dead_bush");
})