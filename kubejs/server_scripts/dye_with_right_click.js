// priority:99
// by Rad @ https://discord.com/channels/303440391124942858/1302254208724107324/1302254208724107324
const DyeColor = Java.loadClass('net.minecraft.world.item.DyeColor');
const DustParticleOptions = Java.loadClass('net.minecraft.core.particles.DustParticleOptions');
const dyes = DyeColor.values().map(i => `minecraft:${i}_dye`);

global.clamp = (min, max, value) => Math.max(min, Math.min(value, max));

global.sound = (entity, soundId, volume, pitch, shift) => {
    shift = shift || 0.2; pitch = pitch || 1; volume = volume || 1;
    const {level, x, y, z} = entity;
    level.playSound(null, x, y, z, soundId, 'master', volume, global.clamp(0.5, 2, pitch - shift/2 + Math.random()*shift));
}

const isExist = (str1, str2) => Item.of(`${str1}:magenta_${str2}`) != 'minecraft:air';
const handler = (str, i) => str.slice(i).join('_');
const hexToRgb = (hex) => {
    hex = hex.toString().replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return new Vec3f(r/255, g/255, b/255);
};

function direct_dying(e, prefix, suffix) {
    const {hand, player} = e;
    if(hand == 'off_hand') return;

    const {item: {id}, block, level, facing} = e;
    if(!dyes.includes(id)) return;
    if(!block.id.contains(suffix) || !block.id.contains(prefix)) return;

    const color = id.split(':')[1].split('_')[0];
    if(block.id.contains(color)) return;
    const {entityData, x, y, z} = block;

    e.item.count--;
    block.set(`${prefix}:${color}_${suffix}`, block.properties);
    if(entityData) block.setEntityData(entityData);

    global.sound(player, 'block.flowering_azalea.hit', 2, 1.8);
    player.swing();

    const shape = block.blockState.getCollisionShape(level, block.pos);
    console.log(shape.empty);
    if(shape.empty) return;
    e.server.scheduleInTicks(1, () => {
        const {xsize, ysize, zsize} = shape.bounds();

        const facingMap = {
        'east': [xsize/2+0.15,0,0, 0,ysize,zsize], 'west': [-xsize/2-0.15,0,0, 0,ysize,zsize],
        'south': [0,0,zsize/2+0.15, xsize,ysize,0], 'north': [0,0,-zsize/2-0.15, xsize,ysize,0],
        'up': [0,ysize/2+0.15,0, xsize,0,zsize], 'down': [0,-ysize/2-0.15,0, xsize,0,zsize]
        };
        const data = facingMap[facing];
        level.spawnParticles(
            new DustParticleOptions(hexToRgb(Color[`${color.toUpperCase()}_DYE`].createTextColorJS()), 0.6), true,
            x+data[0]+0.5, y+data[1]+ysize/2, z+data[2]+0.5,
            data[3]*0.18, data[4]*0.18, data[5]*0.18, 6, 0
        )
    })
}
BlockEvents.rightClicked(e => {
    direct_dying(e, "minecraft", "banner");
    direct_dying(e, "minecraft", "wool");
    direct_dying(e, "minecraft", "shulker_box");
    direct_dying(e, "minecraft", "glazed_terracotta");
    direct_dying(e, "minecraft", "terracotta");
    direct_dying(e, "minecraft", "carpet");
    direct_dying(e, "minecraft", "stained_glass_pane");
    direct_dying(e, "minecraft", "stained_glass");
    direct_dying(e, "minecraft", "candle");
    direct_dying(e, "minecraft", "concrete_powder");
    direct_dying(e, "minecraft", "concrete");
    direct_dying(e, "botania", "mystical_flower");
    direct_dying(e, "botania", "mushroom");
    direct_dying(e, "botania", "shiny_flower");
    direct_dying(e, "botania", "floating_flower");
    direct_dying(e, "botania", "petal_block");
    direct_dying(e, "botania", "buried_petals");
    direct_dying(e, "botania", "double_flower");
})