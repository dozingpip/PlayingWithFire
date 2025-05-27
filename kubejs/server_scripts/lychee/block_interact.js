ServerEvents.recipes(event => {
    event.custom({
        "type": "lychee:block_interacting",
        "block_in": "minecraft:gold_block",
        "item_in": {"item":"minecraft:rotten_flesh"},
        "post":
        [
            {
                "type": "place",
                "block": "*"
            },
            {
                "type":"execute",
                "command": "summon minecraft:piglin ~ ~ ~ {CustomName:'{\"text\":\"Bob\"}'}",
                "hide": false
            }
        ]
    }).id("playingwithfire:block_interact/piglin");
    event.custom({
        "type": "lychee:block_interacting",
        "block_in": "minecraft:potted_cherry_sapling",
        "hide_in_viewer": true,
        "item_in": {"item":"create:tree_fertilizer"},
        "contextual":
        {
            "type":"execute",
            "command": "place feature minecraft:azalea_tree ~ ~1 ~"
        },
        "post":
        [
            {
                "type": "drop_item",
                "item": "brick"
            },
            {
                "type": "place",
                "block": "*"
            },
            {
                "type":"execute",
                "command": "place feature minecraft:azalea_tree ~ ~1 ~"
            },
            {
                "type":"execute",
                "command": "playsound minecraft:item.trident.thunder block @s"
            }
        ]
    }).id("playingwithfire:block_interact/azalea_tree_hidden");
    event.custom({
        "type": "lychee:block_interacting",
        "block_in": "minecraft:potted_cherry_sapling",
        "ghost": "true",
        "item_in": {"item":"create:tree_fertilizer"},
        "post":
        [
            {
                "type": "drop_item",
                "item": "brick"
            },
            {
                "type": "drop_item",
                "item": "azalea"
            },
        ]
    }).id("playingwithfire:block_interact/azalea_tree");
});