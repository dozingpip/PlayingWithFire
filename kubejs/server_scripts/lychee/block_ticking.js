ServerEvents.recipes(event => {
    event.custom({
        "type": "lychee:random_block_ticking",
        "block_in": "minecraft:magma_block",
        "contextual": {
            "type": "location",
            "offsetY": 1,
            "predicate": {
                "block": {
                    "blocks": [ "minecraft:air", "minecraft:lava" ]
                }
            }
        },
        "post":
        [
            {
                "type": "place",
                "block": "*"
            },
            {
                "type":"execute",
                "command": "summon minecraft:magma_cube ~ ~ ~",
                "hide": false
            }
        ]
    }).id("playingwithfire:block_tick/magma_cube");
    event.custom({
        "type": "lychee:random_block_ticking",
        "block_in": "minecraft:stripped_warped_stem",
        "contextual": {
            "type": "location",
            "offsetY": 1,
            "predicate": {
                "block": {
                    "blocks": [ "minecraft:air" ]
                }
            }
        },
        "post":
        [
            {
                "type": "place",
                "block": "minecraft:warped_stem"
            },
            {
                "type":"execute",
                "command": "summon minecraft:zombified_piglin ~ ~1 ~",
                "hide": false
            }
        ]
    }).id("playingwithfire:block_tick/zombie_piglin");
    event.custom({
        "type": "lychee:random_block_ticking",
        "block_in": "minecraft:quartz_block",
        "contextual": {
            "type": "location",
            "offsetY": 1,
            "predicate": {
                "block": {
                    "blocks": [ "minecraft:fire" ]
                }
            }
        },
        "post":
        [
            {
                "type": "place",
                "offsetY": 1,
                "block": "minecraft:air"
            },
            {
                "type":"execute",
                "command": "summon minecraft:blaze ~ ~1 ~",
                "hide": false
            }
        ]
    }).id("playingwithfire:block_tick/blaze");
    event.custom({
        "type": "lychee:random_block_ticking",
        "block_in": "minecraft:nether_bricks",
        "contextual": {
            "type": "location",
            "offsetY": 1,
            "predicate": {
                "block": {
                    "blocks": [ "minecraft:fire" ]
                }
            }
        },
        "post":
        [
            {
                "type": "place",
                "offsetY": 1,
                "block": "minecraft:air"
            },
            {
                "type":"execute",
                "command": "summon minecraft:wither_skeleton ~ ~1 ~",
                "hide": false
            }
        ]
    }).id("playingwithfire:block_tick/wither_skeleton");
    event.custom({
        "type": "lychee:random_block_ticking",
        "block_in": "minecraft:white_wool",
        "contextual": {
            "type": "location",
            "offsetY": 1,
            "predicate": {
                "block": {
                    "blocks": [ "minecraft:air" ]
                }
            }
        },
        "post":
        [
            {
                "type": "place",
                "block": "minecraft:fire",
                "offsetY": 1
            },
            {
                "type":"execute",
                "command": "summon minecraft:ghast ~ ~1 ~",
                "hide": false
            }
        ]
    }).id("playingwithfire:block_tick/ghast");
    event.custom({
        "type": "lychee:random_block_ticking",
        "block_in": "minecraft:soul_sand",
        "contextual": {
            "type": "location",
            "offsetY": 1,
            "predicate": {
                "block": {
                    "blocks": [ "minecraft:soul_fire" ]
                }
            }
        },
        "post":
        [
            {
                "type":"execute",
                "command": "summon minecraft:enderman ~ ~1 ~ {ActiveEffects:[{'forge:id':'minecraft:invisibility', Duration:-1, ShowParticles:0b}]}",
                "hide": false
            },
            {
                "type": "place",
                "block": "minecraft:air",
                "offsetY": 1
            }
        ]
    }).id("playingwithfire:block_tick/enderman");
});