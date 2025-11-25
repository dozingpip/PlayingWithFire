ServerEvents.recipes(event => {
    event.custom({
        type: "lychee:item_exploding",
        item_in: [{item:"minecraft:wheat_seeds"}],
        post: [{type:"drop_item", item: "minecraft:wheat", count:2}]
    }).id("playingwithfire:explosion/item/wheat");
    event.custom({
        type: "lychee:item_exploding",
        item_in: [{item:"minecraft:melon_seeds"}],
        post: [{type:"drop_item", item: "minecraft:melon_slice", count:3}]
    }).id("playingwithfire:explosion/item/melon");
    event.custom({
        type: "lychee:item_exploding",
        item_in: [{item:"minecraft:pumpkin_seeds"}],
        post: [{type:"drop_item", item: "minecraft:pumpkin", count:1}]
    }).id("playingwithfire:explosion/item/pumpkin");
    event.custom({
        type: "lychee:item_exploding",
        item_in: [{item:"minecraft:beetroot_seeds"}],
        post: [{type:"drop_item", item: "minecraft:beetroot", count:3}]
    }).id("playingwithfire:explosion/item/beetroot");
    event.custom({
        type: "lychee:item_exploding",
        item_in: [{item:"botania:turntable"}],
        post: [{type:"drop_item", item: "kubejs:teatable"}]
    }).id("playingwithfire:explosion/item/teatable");
    event.custom({
        type: "lychee:block_exploding",
        block_in: {blocks:["botania:turntable"]},
        post: [{type:"place", block: "kubejs:teatable"}, {type: "prevent_default"}]
    }).id("playingwithfire:explosion/block/teatable");
    event.custom({
        type: "lychee:item_exploding",
        item_in: [{item:"create:experience_block"}],
        post: [{type:"drop_xp", xp: "27"}]
    }).id("playingwithfire:explosion/item/experience");
    event.custom({
        type: "lychee:block_exploding",
        block_in: {blocks:["create:experience_block"]},
        post: [{type:"drop_xp", xp: "27"}, {type: "prevent_default"}]
    }).id("playingwithfire:explosion/block/experience");
    event.custom({
        type: "lychee:item_exploding",
        item_in: [{item:"minecraft:ender_pearl"}],
        post: [{type:"drop_item", item: "botania:black_lotus"}]
    }).id("playingwithfire:explosion/item/lotus");
    event.custom({
        type: "lychee:item_exploding",
        item_in: [{item:"minecraft:ghast_tear"}],
        post: [{type:"drop_item", item: "minecraft:iron_ingot", count: 2}]
    }).id("playingwithfire:explosion/item/iron_ingot");
    event.custom({
        type: "lychee:item_exploding",
        hide_in_viewer: true,
        item_in: [
            {item:"minecraft:turtle_egg"},
            {item: "minecraft:honeycomb"},
            {item: "minecraft:sugar"},
            {item: "create:experience_nugget"}],
        post:
        [{
                type:"execute",
                command: "summon minecraft:bee ~ ~2 ~",
                hide: false
        }]
    }).id("playingwithfire:explosion/item/bee_spawn");
    event.custom({
        type: "lychee:item_exploding",
        ghost: true,
        item_in: [
            {item: "minecraft:turtle_egg"},
            {item: "minecraft:honeycomb"},
            {item: "minecraft:sugar"}],
        post:
        [{
            type:"drop_item",
            item: "minecraft:bee_spawn_egg",
            hide: false
        }]
    }).id("playingwithfire:explosion/item/bee_spawn_egg");
});

ServerEvents.tags("item", event => {
    event.add("lychee:item_exploding_catalysts", "minecraft:white_bed");
    event.add("lychee:item_exploding_catalysts", "kubejs:bomb");
    event.add("lychee:item_exploding_catalysts", "minecraft:ghast_spawn_egg");
})