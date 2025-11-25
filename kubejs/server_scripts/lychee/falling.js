ServerEvents.recipes(event => {
    let fallingWithBelow = (output, landing, below) =>
    {
        return {
            "type": "lychee:block_crushing",
            "landing_block": landing,
            "contextual": {
                "type": "location",
                "offsetY": -1,
                "predicate": {
                    "block": {
                        "blocks": [ below ]
                    }
                }
            },
            "post": [
                {
                    "type": "place",
                    "block": "*"
                },
                {
                    "type": "place",
                    "offsetY": -1,
                    "block": output
                }
            ],
            "comment": "make sure your " + below + " is underneath"
        }
    }
    let falling = (output, landing, extra_out) =>
    {
        return {
            "type": "lychee:block_crushing",
            "landing_block": landing,
            "post": [
                {
                    "type": "place",
                    "block": "*"
                },
                {
                    "type": "drop_item",
                    "item": "minecraft:brick",
                    "count": 3
                },
                {
                    "type": "place",
                    "offsetY": -1,
                    "block": output
                }
            ]
        }
    }
    // do ponderjs stuff with this since can't see the below thing without a tooltip
    // event.custom(falling("botania:pure_daisy", "candle", "moss_block"))
    // event.custom(falling("botania:pure_daisy", "turtle_egg", "moss_block"))
    // event.custom(falling("botania:pure_daisy", "cake", "moss_block"))
    // event.custom(fallingOn(falling("botania:pure_daisy", "flower_pot", "moss_block"), "pointed_dripstone"))
    // event.custom(falling("create:zinc_block", "kubejs:potted_twisting_vines")).id("playingwithfire:falling/zinc_block")
    event.custom({
        "type": "lychee:block_crushing",
        "landing_block": "botania:orange_petal_block",
        "post": [{"type": "place", "block": "minecraft:raw_copper_block"}]
    }).id("playingwithfire:falling/raw_copper_block")
    event.custom({
        "type": "lychee:block_crushing",
        "landing_block": "minecraft:brown_mushroom_block",
        "post": [{"type": "place", "block": "minecraft:raw_iron_block"}]
    }).id("playingwithfire:falling/raw_iron_block")
    event.custom({
        "type": "lychee:block_crushing",
        "landing_block": "minecraft:shroomlight",
        "post": [{"type": "place", "block": "minecraft:raw_gold_block"}]
    }).id("playingwithfire:falling/raw_gold_block")
    event.custom({
        "type": "lychee:block_crushing",
        "landing_block": "botania:light_gray_petal_block",
        "post": [{"type": "place", "block": "create:raw_zinc_block"}]
    }).id("playingwithfire:falling/raw_zinc_block")
    event.custom(
    {
        "type": "lychee:block_crushing",
        "item_in": [{"item": "gold_block"}],
        "landing_block": "netherrack",
        "post": [{"type": "place","block": "nether_gold_ore"}]
    }).id("playingwithfire:falling/nether_gold_ore")
    event.custom(
        {
            "type": "lychee:block_crushing",
            "item_in": [
            {
                "item": "gold_ingot"
            },
            ],
            "landing_block": "blackstone",
            "post": [
                {
                    "type": "place",
                    "block": "gilded_blackstone"
                }
            ]
        }).id("playingwithfire:falling/gilded_blackstone")
        event.custom(
            {
                "type": "lychee:block_crushing",
                "item_in": [
                {
                    "item": "chorus_fruit"
                },
                ],
                "landing_block": "black_glazed_terracotta",
                "post": [
                    {
                        "type": "place",
                        "block": "crying_obsidian"
                    }
                ]
            }).id("playingwithfire:falling/crying_obsidian")
    event.custom(
    {
        "type": "lychee:block_crushing",
        "falling_block": "gravel",
        "landing_block": "botania:white_petal_block",
        "post": [
            {
                "type": "place",
                "block": "botania:pure_daisy"
            }
        ]
    }).id("playingwithfire:falling/pure_daisy")
    event.custom(
    {
        "type": "lychee:block_crushing",
        "falling_block": "gravel",
        "item_in": [
        {
            "item": "kubejs:bomb",
        }
        ],
        "post": [
            {
                "type": "drop_item",
                "item": "potion",
                "nbt": {
                    "Potion": "minecraft:awkward"
                },
                "count":2
            }
        ]
    }).id("playingwithfire:falling/bomb_to_awkward")
    event.custom(
    {
        "type": "lychee:block_crushing",
        "item_in": [
        {
            "item": "ender_eye"
        },
        ],
        "landing_block": "create:shadow_steel_casing",
        "post": [
            {
                "type": "place",
                "block": "ender_chest"
            }
        ]
    }).id("playingwithfire:falling/shadow_steel_ender_chest")
    event.custom(
    {
        "type": "lychee:block_crushing",
        "landing_block": "minecraft:sculk",
        "post": [
            {
                "type": "place",
                "block": "*"
            },
            {
                "type": "drop_item",
                "item": "minecraft:sculk",
                "count": 1
            },
        ]
    }).id("playingwithfire:falling/sculk")
})