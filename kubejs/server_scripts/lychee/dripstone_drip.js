ServerEvents.recipes(event => {
    event.custom({
        type: "lychee:dripstone_dripping",
        source_block: "create:honey",
        target_block: "minecraft:blue_glazed_terracotta",
        post: [{type:"place", block: "minecraft:lapis_block"}]
    }).id("playingwithfire:dripstone/lapis");
    event.custom({
        type: "lychee:dripstone_dripping",
        source_block: "minecraft:lava",
        target_block: "minecraft:nether_wart_block",
        post: [{type:"place", block: "minecraft:netherrack"}]
    }).id("playingwithfire:dripstone/netherrack");
    event.custom({
        type: "lychee:dripstone_dripping",
        source_block: "minecraft:lava",
        target_block: "minecraft:netherrack",
        post: [{type:"place", block: "minecraft:magma_block"}]
    }).id("playingwithfire:dripstone/magma_block");
});