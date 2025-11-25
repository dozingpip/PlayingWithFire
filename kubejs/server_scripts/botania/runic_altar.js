ServerEvents.recipes(event => {
    let discs = [{item:"minecraft:music_disc_pigstep"},
    {item:"minecraft:music_disc_13"},
    {item:"minecraft:music_disc_cat"},
    {item:"minecraft:music_disc_blocks"},
    {item:"minecraft:music_disc_chirp"},
    {item:"minecraft:music_disc_far"},
    {item:"minecraft:music_disc_mall"},
    {item:"minecraft:music_disc_mellohi"},
    {item:"minecraft:music_disc_stal"},
    {item:"minecraft:music_disc_strad"},
    {item:"minecraft:music_disc_ward"},
    {item:"minecraft:music_disc_11"},
    {item:"minecraft:music_disc_wait"}]
    
    let altar = (output, mana, input) =>
    {
        return event.custom({
            type: 'botania:runic_altar',
            ingredients: input,
            output: {item: output},
            mana: mana
        }).id("playingwithfire:runic_altar/"+(output.substring(output.lastIndexOf(":")+1)))
    }
    
    let altarEnchantedBook = (enchant, level, mana, input) =>
    {
        return event.custom({
            type: 'botania:runic_altar',
            ingredients: input,
            output:
            {
                item: "minecraft:enchanted_book",
                nbt: {"StoredEnchantments": [{lvl: level, id: enchant}]}
            },
            mana: mana
        }).id("playingwithfire:runic_altar/"+(enchant.substring(enchant.lastIndexOf(":")+1)))
    }

    event.remove({type: "botania:runic_altar", output:"botania:rune_winter"})
    altar("botania:rune_winter", 8000,
        [{item:"minecraft:cake"}, {tag: "minecraft:wool"}, {item:"botania:rune_water"}, {item:"botania:rune_earth"}, {tag:"minecraft:wool"}, {tag: "minecraft:wool"}])
        .id("botania:runic_altar/winter");
    altar("minecraft:honeycomb", 8000, [{item:"minecraft:sugar"}, {item:"minecraft:gold_block"}, {item:"minecraft:sunflower"}, {item:"botania:rune_earth"}, {item:"minecraft:oak_sapling"}, {item:"create:sweet_roll"}]);
    altar("minecraft:turtle_egg", 8000, [{item:"minecraft:wheat_seeds"}, {item:"create:dough"}, {item:"minecraft:sunflower"}, {item:"minecraft:brown_mushroom"}]);
    altar("create:creative_blaze_cake", 500000,
        [{item:"create:blaze_cake"}].concat(discs));
    altar("minecraft:spore_blossom", 5000, [{item:"minecraft:bamboo", count: 6}, {item:"botania:pink_petal"}, {item:"botania:rune_earth"}]);
    altar("minecraft:end_stone", 5000, [{item:"minecraft:ender_eye", count: 6}, {item:"botania:ender_air_bottle"}, {item:"botania:rune_air"}]);
    altarEnchantedBook("minecraft:lure", 1, 5000, [{item: "minecraft:fire_coral"}, {item: "netherdepthsupgrade:searing_cod"}, {item: "minecraft:book"}, {item: "botania:rune_air"}])
    altarEnchantedBook("minecraft:luck_of_the_sea", 1, 5000, [{item: "minecraft:ghast_tear"}, {item: "netherdepthsupgrade:bonefish"}, {item: "minecraft:book"}, {item: "botania:rune_water"}])
    discs.forEach(disc =>
    {
        event.custom({
            type: 'botania:runic_altar',
            ingredients: [{tag:"minecraft:music_discs"}, disc],
            output: {item: disc.item, count: 2},
            mana: 1000
        }).id("playingwithfire:runic_altar/copy_" + (disc.item.substring(disc.item.lastIndexOf(":")+1)))
    })
    altarEnchantedBook("minecraft:silk_touch", 1, 5000, [{item: "minecraft:ghast_tear"}, {item: "minecraft:amethyst_shard"}, {item: "minecraft:book"}, {item: "botania:rune_air"}])
    altar("minecraft:witch_spawn_egg", 5000, [{item: "minecraft:turtle_egg"}, {item: "minecraft:brewing_stand"}, {item: "create:experience_nugget"}]);
    altar("minecraft:chicken_spawn_egg", 5000, [{item: "minecraft:wheat_seeds"}, {item: "minecraft:turtle_egg"}, {item: "create:experience_nugget"}]);
});
