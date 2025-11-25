ServerEvents.recipes(event => {
    event.custom({
        type: "lychee:block_interacting",
        block_in: "minecraft:gold_block",
        hide_in_viewer: true,
        item_in: {item:"minecraft:rotten_flesh"},
        post:
        [
            {type: "place", block: "*"},
            {
                type:"execute",
                command: "summon minecraft:piglin ~ ~ ~ {CustomName:'{\"text\":\"Bob\"}'}",
                hide: false
            }
        ]
    }).id("playingwithfire:block_interact/piglin");
    event.custom({
        type: "lychee:block_interacting",
        block_in: "minecraft:gold_block",
        ghost: true,
        item_in: {item:"minecraft:rotten_flesh"},
        post: [{type: "drop_item", item: "minecraft:piglin_spawn_egg"}]
    }).id("playingwithfire:block_interact/piglin_spawn");
    event.custom({
        type: "lychee:block_interacting",
        block_in: "minecraft:potted_cherry_sapling",
        hide_in_viewer: true,
        item_in: {item:"create:tree_fertilizer"},
        contextual:
        {
            type:"execute",
            command: "place feature minecraft:azalea_tree ~ ~1 ~"
        },
        post:
        [
            {type: "drop_item", item: "brick"},
            {type: "place", block: "*"},
            {
                type:"execute",
                command: "place feature minecraft:azalea_tree ~ ~1 ~"
            },
            {
                type:"execute",
                command: "playsound minecraft:item.trident.thunder block @s"
            }
        ]
    }).id("playingwithfire:block_interact/azalea_tree_hidden");
    event.custom({
        type: "lychee:block_interacting",
        block_in: "minecraft:potted_cherry_sapling",
        ghost: true,
        item_in: {item:"create:tree_fertilizer"},
        post:
        [
            {type: "drop_item", item: "brick"},
            {type: "drop_item", item: "azalea"},
            {type: "drop_item", item: "flowering_azalea"},
            {type: "drop_item", item: "azalea_leaves"},
            {type: "drop_item", item: "flowering_azalea_leaves"},
        ]
    }).id("playingwithfire:block_interact/azalea_tree");
    event.custom({
        type: "lychee:block_interacting",
        hide_in_viewer: true,
        block_in: "minecraft:bamboo_sapling",
        item_in: {item:"minecraft:gravel"},
        post:
        [
            {type: "place", block: "minecraft:pointed_dripstone"},
            {type:"execute", command: "playsound minecraft:block.gravel.place block @s"}
        ]
    }).id("playingwithfire:block_interact/dripstone_hide");
    event.custom({
        type: "lychee:block_interacting",
        ghost: true,
        block_in: "minecraft:bamboo_sapling",
        item_in: [{item:"minecraft:gravel"}, {item:"minecraft:bamboo", "lychee:tag":{display:{Name: "{\"text\":\"Place me\"}"}}}],
        post: [{type: "place", block: "minecraft:pointed_dripstone"}]
    }).id("playingwithfire:block_interact/dripstone");
});