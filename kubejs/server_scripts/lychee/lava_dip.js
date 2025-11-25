ServerEvents.recipes(event => {
    let burning = (input, output) =>
    {
        {
            event.custom({
                type: "lychee:item_burning",
                item_in: {
                    item: input
                },
                post: [
                    {
                        type: "place",
                        block: output
                    }
                ]
            }).id("playingwithfire:burning/" + (output.substring(output.lastIndexOf(":")+1)));
        }
    }
    burning("weeping_vines", "netherrack")

    event.custom({
        type: "lychee:item_burning",
        comment: "spawns 3x3 of fire",
        item_in: {
            item: "blaze_powder"
        },
        post: [
            {
                type: "execute",
                command: "fill ~-1 ~ ~-1 ~1 ~ ~1 minecraft:fire"
            }
        ]
    }).id("playingwithfire:burning/blaze_powder")
});