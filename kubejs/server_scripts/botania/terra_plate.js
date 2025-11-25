ServerEvents.recipes(event => {
    let plate = (output, mana, input) =>
    {
        event.custom({
            type: 'botania:terra_plate',
            ingredients: input,
            result: {item: output},
            mana: mana
        }).id("playingwithfire:terra_plate/"+(output.substring(output.lastIndexOf(":")+1)))
    }


    plate("botania:infinite_fruit", 20000, [{item:"minecraft:cake"},
        {item:"minecraft:pufferfish"}, {item:"botania:mana_cookie"}, {item:"create:sweet_roll"}, {item:"create:chocolate_glazed_berries"},
        {item:"create:honeyed_apple"}, {item:"create:builders_tea"}, {tag:"minecraft:music_discs"}]);
    plate("botania:king_key", 20000, [
        {item:"netherdepthsupgrade:lava_fishing_rod"}, {item:"botania:star_sword"}, {item:"botania:flare_chakram"}, {item:"create:potato_cannon"}, {tag:"minecraft:music_discs"}]);
    plate("botania:flugel_eye", 20000, [{item:"minecraft:lodestone"},
        {item:"minecraft:shulker_spawn_egg"}, {item:"botania:third_eye"}, {item:"botania:light_relay"}, {tag:"minecraft:music_discs"}]);
    plate("minecraft:nether_star", 600000, [{item:"botania:king_key"},
        {item:"minecraft:wither_skeleton_skull"}, {item:"minecraft:wither_skeleton_skull"}, {item:"minecraft:wither_skeleton_skull"}, {tag:"minecraft:music_discs"}]);
    plate("botania:life_essence", 600000, [{item:"botania:king_key"}, {item:"minecraft:fire_coral_block"},
        {item:"minecraft:beacon"}, {item:"botania:gaia_pylon"}, {tag:"minecraft:music_discs"}]);
    plate("minecraft:deepslate_diamond_ore", 10000, [{item:"create:powdered_obsidian"},
        {item:"minecraft:lapis_lazuli"}, {item:"botania:manasteel_nugget"}]);
    plate("minecraft:sniffer_egg", 5000, [{item:"minecraft:turtle_egg"},
        {item:"minecraft:warped_nylium"}, {item:"botania:cosmetic_groucho_glasses"}, {item:"minecraft:purpur_block"}]);
    plate("minecraft:wither_skeleton_skull", 22500, [
        {item:"minecraft:bone_block"}, {item:"minecraft:coal_block"},
        {item:"minecraft:wither_rose"}, {item:"botania:rune_fire"}, // maybe should be rune of wrath?
        {item:"minecraft:music_disc_pigstep"}]);
});