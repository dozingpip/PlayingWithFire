// priority:2
const colors = DyeColor.values();
ServerEvents.recipes(event => {
    for(var colorId in colors)
    {
        var color = DyeColor.byId(colorId)
        event.custom({
            type: "lychee:block_exploding",
            block_in: {blocks:[`botania:${color}_mystical_flower`]},
            post: [
                {
                    "type": "place",
                    "block": `botania:${color}_petal_block`
                }
            ]
        }
        ).id(`playingwithfire:explosion/block/${color}_petal_block`)
        
        event.custom({
            type: "lychee:item_exploding",
            item_in: [{item:`botania:${color}_mystical_flower`}],
            post: [
                {
                    "type": "place",
                    "block": `botania:${color}_petal_block`
                }
            ]
        }
        ).id(`playingwithfire:explosion/item/${color}_petal_block`)
    }
});