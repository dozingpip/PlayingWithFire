global.potionFluid = (potionName, amount) =>
{
    return Fluid.of("create:potion", amount).withNBT({Potion: potionName})
}
ServerEvents.recipes(event => {
// Spawn eggs
event.recipes.create.mixing("minecraft:bee_spawn_egg", ["minecraft:turtle_egg", "minecraft:honeycomb", "minecraft:sugar", "create:experience_nugget"]).heated().id("playingwithfire:mixing/bee_spawn_egg");
event.recipes.create.mixing("minecraft:witch_spawn_egg", ["minecraft:turtle_egg", "minecraft:brewing_stand", global.potionFluid("minecraft:awkward", 1000), "create:experience_nugget"]).heated().id("playingwithfire:mixing/witch_spawn_egg");
event.recipes.create.mixing("minecraft:chicken_spawn_egg", ["minecraft:wheat_seeds", "minecraft:turtle_egg", "create:experience_nugget"]).heated().id("playingwithfire:mixing/chicken_spawn_egg");
event.recipes.create.mixing("minecraft:piglin_spawn_egg", ["minecraft:turtle_egg", "minecraft:gold_block", "create:experience_nugget"]).heated().id("playingwithfire:mixing/piglin_spawn_egg");

// fluid creation
event.recipes.create.mixing(Fluid.of("minecraft:milk", 1000), ["minecraft:bone_block", "minecraft:sugar", global.potionFluid("minecraft:awkward", 250)]).heated().id("playingwithfire:mixing/milk");
event.recipes.create.mixing(Fluid.of("funkyfluids:silly_putty", 1000), ["minecraft:slime_ball", Fluid.of("funkyfluids:magnetroleum", 1000), Fluid.of("create:honey", 250), "#minecraft:fishes"]).heated().id("playingwithfire:mixing/silly_putty");
event.recipes.create.mixing(Fluid.of("funkyfluids:magnetroleum", 1000), ["minecraft:lapis_lazuli", "botania:manasteel_ingot", Fluid.of("funkyfluids:redstone_suspension", 250)]).superheated().id("playingwithfire:mixing/magtroleum");
event.recipes.create.mixing(Fluid.of("funkyfluids:oobleck", 1000), [Item.of("minecraft:potato", 2), global.potionFluid("minecraft:awkward", 1000)]).heated().id("playingwithfire:mixing/oobleck");
event.recipes.create.mixing(Fluid.of("funkyfluids:redstone_suspension", 1000), [Item.of("minecraft:redstone", 2), "botania:rune_water", global.potionFluid("minecraft:awkward", 1000)]).heated().id("playingwithfire:mixing/redstone_suspension");
event.recipes.create.mixing(global.potionFluid("minecraft:awkward", 1000), [Item.of("minecraft:nether_wart"), Fluid.of("funkyfluids:melonade", 1000)]).heated().id("playingwithfire:mixing/awkward_potion");

// tea recipe, replace water with honey
event.remove({type:"create:mixing", output:Fluid.of("create:tea")});
event.recipes.create.mixing(Fluid.of("create:tea", 500), [Item.of("#botania:petals", 4), Fluid.of("create:honey", 250), global.potionFluid("minecraft:awkward", 250)]).heated().id("playingwithfire:mixing/petal_tea");
event.recipes.create.mixing(Fluid.of("create:tea", 250), ["#minecraft:leaves", Fluid.of("create:honey", 250), global.potionFluid("minecraft:awkward", 250)]).heated().id("playingwithfire:mixing/hot_leaf_juice");

// Other
event.recipes.create.mixing(Item.of("botania:overgrowth_seed"), [Fluid.of("create:tea", 250), "botania:cell_block", "minecraft:honey_block", "botania:black_lotus"]).heated().id("playingwithfire:mixing/overgrowth_seed");
event.recipes.create.mixing(Item.of("create:dough", 2), [Item.of("create:wheat_flour", 2),
    global.potionFluid("minecraft:awkward", 250)]).id("playingwithfire:mixing/dough");
event.recipes.create.mixing(Item.of("create:rose_quartz", 2), ["minecraft:quartz", "minecraft:redstone", "create:experience_nugget"]).id("playingwithfire:mixing/rose_quartz");
event.recipes.create.mixing(Item.of("botania:redstone_root", 2), ["minecraft:redstone", "#minecraft:leaves"]).id("playingwithfire:mixing/redstone_root");
event.recipes.create.mixing("minecraft:cake", [Item.of("minecraft:sugar", 2), Item.of("minecraft:wheat", 3), "minecraft:egg", Fluid.of("minecraft:milk", 1000)]).heated().id("playingwithfire:mixing/cake");
event.recipes.create.mixing("minecraft:cake", [Item.of("minecraft:sugar", 2), Item.of("create:dough"), "minecraft:egg", Fluid.of("minecraft:milk", 1000)]).heated().id("playingwithfire:mixing/cake_with_dough");
event.recipes.create.mixing("minecraft:poisonous_potato", [Item.of("minecraft:nether_wart", 4), Fluid.of("minecraft:milk", 1000),
    global.potionFluid("minecraft:poison", 250)]).heated().id("playingwithfire:mixing/poisonous_potato");
event.recipes.create.mixing(
    Item.of("create:chromatic_compound", 1),
    ["minecraft:pearlescent_froglight", "minecraft:netherite_scrap",
        "minecraft:sculk", Fluid.of("funkyfluids:magnetroleum", 1000)]).superheated().id("playingwithfire:mixing/chromatic_compound");
event.recipes.create.mixing(Item.of("minecraft:mud", 1), ["#minecraft:dirt", global.potionFluid("minecraft:awkward", 250)]).id("playingwithfire:mixing/mud");
// obsidian
event.recipes.create.mixing("minecraft:obsidian", ["minecraft:ice", Fluid.of("minecraft:lava", 1000)]).superheated().id("playingwithfire:mixing/obsidian");
});