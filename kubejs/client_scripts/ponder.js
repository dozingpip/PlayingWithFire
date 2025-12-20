// i would do this except jsonio doesn't allow array jsons
//var config = JsonIO.read('config/incontrol/spawn.json')
//console.log(config)
Ponder.tags((event) => {
    /**
     * "kubejs:getting_started" -> the tag name
     * "minecraft:paper"        -> the icon
     * "Getting Started"        -> the title
     * "This is a description"  -> the description
     * [...items]               -> default items
     */
    event.createTag("kubejs:tea_tabling",
        "kubejs:teatable",
        "The Tea Table", "Drink tea and manifest flowers?",
        ["minecraft:sugar_cane", "minecraft:music_disc_pigstep", "botania:endoflame"]);
    event.createTag("kubejs:lava_dip",
        "minecraft:lava_bucket",
        "Lava Dipping", "Drop things in lava and they come out... different?",
        ["minecraft:netherrack", "minecraft:quartz", "minecraft:bone_meal", "minecraft:magma_block"]);
    event.createTag("kubejs:explosions", "minecraft:tnt", "Explosions!", "Explosions cause transformations as well!",
        ["minecraft:wheat_seeds", "minecraft:melon_seeds", "minecraft:pumpkin_seeds"]);
    event.createTag("kubejs:falling", "minecraft:anvil", "Falling!", "Blocks falling onto other blocks causes transformations as well!",
        ["minecraft:anvil", "minecraft:pointed_dripstone", "minecraft:sand", "minecraft:gravel"]);
});

Ponder.registry((event) => {
    var text_delay = 40
    var idle_time = text_delay + 10
    var short_idle = 15
    event.create("botania:endoflame").scene("growing_endoflame", "growing an endoflame", (scene, util) =>
    {
        scene.showStructure();
        scene.addKeyframe();
        scene.world.setBlock([2, 1, 2], "custommachinery:custom_machine_block", false);
        scene.world.modifyBlockEntityNBT([2, 1, 2], (nbt) => {
            nbt.machineID = "playingwithfire:teatable"
        });
        scene.addKeyframe();
        scene.idle(short_idle);
        scene.text(text_delay, "bury the petals around the table", [2.0, 2.5, 2.5]);
        scene.idle(short_idle);
        var petal1 = scene.world.setBlock([1, 1, 2], "botania:brown_mushroom", true);
        var petal2 = scene.world.setBlock([1, 1, 3], "botania:brown_mushroom", true);
        var petal3 = scene.world.setBlock([2, 1, 1], "botania:light_gray_mushroom", true);
        var petal4 = scene.world.setBlock([3, 1, 2], "botania:red_mushroom", true);
        scene.addKeyframe();
        scene.idle(idle_time);
        scene.particles.item(10, "botania:brown_mushroom", [2.0, 2.5, 2.5]).area([2, 2, 3]);
        scene.world.destroyBlock([1, 1, 2]);
        scene.world.destroyBlock([1, 1, 3]);
        scene.world.destroyBlock([2, 1, 1]);
        scene.world.destroyBlock([3, 1, 2]);
        scene.addKeyframe();
        scene.idle(10);
        scene.text(text_delay, "endoflame will be planted on top of the table", [2.0, 2.5, 2.5]);
        scene.particles.simple(20, "glow", [2.5, 2.2, 2.5]);
        scene.idle(10);
        scene.world.setBlock([2, 2, 2], "botania:endoflame", true);
    })
    
    event.create("minecraft:sugar_cane").scene("growing_sugar_cane", "growing sugar cane", (scene, util) =>
    {
        scene.showStructure();
        scene.addKeyframe();
        scene.world.setBlock([2, 1, 2], "custommachinery:custom_machine_block", false);
        scene.world.modifyBlockEntityNBT([2, 1, 2], (nbt) => {
            nbt.machineID = "playingwithfire:teatable"
        });
        scene.world.setBlock([2, 2, 2], "minecraft:flower_pot", false);
        scene.addKeyframe();
        scene.idle(short_idle);
        scene.text(text_delay, "put a twisting vine in the flower pot", [2.0, 2.5, 2.5]);
        scene.world.setBlock([2, 2, 2], "kubejs:potted_twisting_vines", true);
        scene.idle(idle_time);
        scene.addKeyframe();
        scene.text(text_delay, "drop 3 sugar near the table", [2.0, 2.5, 2.5]);
        scene.idle(short_idle);
        var sugar1 = scene.world.createItemEntity([1.5, 2, 2.5], [0, 0.2, 0], "minecraft:sugar");
        var sugar2 = scene.world.createItemEntity([2, 2, 1.5], [0, 0.2, 0], "minecraft:sugar");
        var sugar3 = scene.world.createItemEntity([3.5, 2, 2.5], [0, 0.2, 0], "minecraft:sugar");
        scene.idle(idle_time);
        scene.world.removeEntity(sugar1);
        scene.world.removeEntity(sugar2);
        scene.world.removeEntity(sugar3);
        scene.addKeyframe();
        scene.text(text_delay, "The weeping vines will get replaced by sugar cane", [2.0, 2.5, 2.5]);
        scene.idle(short_idle);
        scene.world.setBlock([2, 2, 2], "kubejs:potted_sugar_cane", true);
    })

    event.create("minecraft:music_disc_pigstep").scene("music_disc_pigstep", "making music (pigstep)", (scene, util) =>
    {
        scene.showStructure();
        scene.addKeyframe();
        scene.world.setBlock([2, 1, 2], "custommachinery:custom_machine_block", false);
        scene.world.modifyBlockEntityNBT([2, 1, 2], (nbt) => {
            nbt.machineID = "playingwithfire:teatable"
        });
        // scene.particles
        // .fluid(20, "create:tea", [2, 1.5, 2])
        // .delta([0.3, 0.3, 0.3])
        // .density(2);
        scene.text(text_delay, "add some tea", [2.0, 2.5, 2.5]);
        scene.addKeyframe();
        scene.idle(idle_time);
        scene.world.setBlock([2, 2, 2], "minecraft:jukebox", true);
        scene.world.setBlock([1, 1, 2], "minecraft:nether_gold_ore", true);
        scene.text(text_delay, "and a jukebox and nether gold ore within 1 block", [2.0, 2.5, 2.5]);
        scene.addKeyframe();
        scene.idle(idle_time);
        scene.text(text_delay, "make sure a piglin is nearby", [2.0, 2.5, 2.5]);
        const piglinLink = scene.world.createEntity("piglin", [1.5, 1, 3.5]);
        scene.idle(idle_time);
        scene.text(text_delay, "pigstep disc gets inserted into the jukebox (right-click to remove, as normal)", [2.0, 2.5, 2.5]);
        scene.idle(idle_time);
        // scene.world.setBlock([2, 2, 2], "botania:endoflame", true);
        scene.world.createItemEntity([2.5, 3.5, 2.5], [0, 0.2, 0], "minecraft:music_disc_pigstep");
    })
})