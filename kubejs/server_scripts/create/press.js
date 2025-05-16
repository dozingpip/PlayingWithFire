ServerEvents.recipes(event => {
    event.recipes.create.compacting("minecraft:red_sand", [Item.of("create:cinder_flour",  4), Fluid.of("minecraft:lava", 1000)]).id("playingwithfire:compacting/red_sand");
    event.recipes.create.compacting(Item.of("minecraft:lapis_lazuli", 18), ["minecraft:blue_glazed_terracotta", Fluid.of("create:honey", 500)]).heated().id("playingwithfire:compacting/lapis");
    event.recipes.create.compacting("minecraft:sculk_catalyst", ["minecraft:sculk", "minecraft:end_stone"]).heated().id("playingwithfire:compacting/sculk_catalyst");
    event.recipes.create.compacting("minecraft:nether_quartz_ore", "create:rose_quartz").heated().id("playingwithfire:compacting/nether_quartz_ore");
    event.recipes.create.compacting("minecraft:moss_block", ["botania:vine_ball", "minecraft:grass_block"]).id("playingwithfire:compacting/moss_block");
    event.recipes.create.compacting("minecraft:music_disc_13", ["create:turntable", "minecraft:black_carpet", Item.of("minecraft:gold_ingot", 13)]).heated().id("playingwithfire:compacting/disc_13");
})