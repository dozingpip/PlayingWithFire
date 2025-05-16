ServerEvents.recipes(event => {
    event.recipes.create.filling(Item.of('minecraft:magma_block', 8), [
        'minecraft:netherrack',
        Fluid.of('minecraft:lava', 500)
    ]).id("playingwithfire:filling/magma");
    event.recipes.create.filling(Item.of('minecraft:netherrack', 32), [
        'minecraft:nether_wart_block',
        Fluid.of('minecraft:lava', 1000)
    ]).id("playingwithfire:filling/netherrack");
    event.recipes.create.filling(Item.of('botania:ender_air_bottle', 8), [
        'botania:phantom_ink',
        Fluid.of('funkyfluids:magnetroleum', 1000)
    ]).id("playingwithfire:filling/ender_air");
    event.recipes.create.filling(Item.of('minecraft:cherry_sapling', 1), [
        'minecraft:spore_blossom',
        Fluid.of('funkyfluids:melonade', 1000)
    ]).id("playingwithfire:filling/cherry_sapling");
    event.recipes.create.filling(Item.of('minecraft:ancient_debris', 1), [
        'minecraft:ochre_froglight',
        Fluid.of('create:chocolate', 1000)
    ]).id("playingwithfire:filling/ancient_debris");
    event.recipes.create.filling(Item.of('minecraft:redstone_block', 1), [
        'minecraft:netherrack',
        Fluid.of('funkyfluids:redstone_suspension', 1000)
    ]).id("playingwithfire:filling/redstone_block");
})