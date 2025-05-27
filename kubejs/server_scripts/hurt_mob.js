EntityEvents.death("minecraft:magma_cube", event => {
    if (event.source.getType().toString() == "anvil")
    {
        var block = event.level.getBlock(event.entity.getX(), event.entity.getY(), event.entity.getZ())
        block.getDown().set("minecraft:lava");
        block.getUp().createEntity("minecraft:slime").spawn()
    }
})
// TODO not working!
// EntityEvents.hurt("minecraft:magma_cube", event => {
//     const { source, entity, level } = event
//     console.log(source.getType().toString());
//     var downBlock = level.getBlock(entity.getX(), entity.getY(), entity.getZ()).getDown()
//     if (downBlock.id == "minecraft:magma_block")
//     {
//         size = parseInt(entity.getSize())
//         console.log(size)
//         entity.setSize(size + 10)
//         downBlock.set("minecraft:netherrack")
//         console.log("enbiggened")
//     }
// })

ItemEvents.entityInteracted('minecraft:black_dye', event => {
    if (event.target.getType().toString() == "minecraft:glow_squid")
    {
        var thisBlock = event.level.getBlock(event.entity.getX(), event.entity.getY(), event.entity.getZ());
        var downBlock = thisBlock.getDown();
        if ((thisBlock.id == "create:honey" || downBlock.id == "create:honey"))
        {
            event.target.potionEffects.add("minecraft:fire_resistance")
            event.target.kill()
            thisBlock.getUp().createEntity("minecraft:squid").spawn();
        }
    }
})
EntityEvents.hurt(event => {
    if(event.entity.type == "minecraft:tadpole" || event.entity.type == "minecraft:frog")
    {
        var thisBlock = event.level.getBlock(event.entity.getX(), event.entity.getY(), event.entity.getZ());
        var downBlock = thisBlock.getDown(); 
        if (event.source.getType().toString() == "drown" && (thisBlock.id == "create:chocolate" || downBlock.id == "create:chocolate"))
        {
            event.cancel()
        }
    }
})
EntityEvents.hurt(event => {
    if(event.entity.type == "minecraft:squid" || event.entity.type == "minecraft:glow_squid")
    {
        var thisBlock = event.level.getBlock(event.entity.getX(), event.entity.getY(), event.entity.getZ());
        var downBlock = thisBlock.getDown(); 
        if (event.source.getType().toString() == "drown" && (thisBlock.id == "create:honey" || downBlock.id == "create:honey"))
        {
            event.cancel()
        }
    }
})
EntityEvents.death("minecraft:witch", event => {
    console.log(event.source.getType().toString());
    var thisBlock = event.level.getBlock(event.entity.getX(), event.entity.getY(), event.entity.getZ()-1);
    if (thisBlock.id == "minecraft:air")
        thisBlock.set("minecraft:redstone_wire")
})
EntityEvents.hurt("minecraft:blaze", event => {
    console.log(event.source.getType().toString());
    var thisBlock = event.level.getBlock(event.entity.getX(), event.entity.getY(), event.entity.getZ()-1);
    var downBlock = event.level.getBlock(event.entity.getX(), event.entity.getY(), event.entity.getZ()-1).getDown();
    if (thisBlock.id == "minecraft:air")
        if (downBlock.id == "minecraft:soul_sand" || downBlock.id == "minecraft:soul_soil")
            thisBlock.set("minecraft:soul_fire")
        else
            thisBlock.set("minecraft:fire")
})

let fluidFromMob = (mob, fluid, amount, exclude_damage) =>
{
    EntityEvents.hurt(mob, event => {
        const {source, level, entity} = event
        var damage = Math.min(event.getDamage(), entity.maxHealth)
        var damage_source = source.getType().toString()
        var amountToAdd = amount * damage;
        if (damage_source in exclude_damage || amountToAdd <= 0)
            return
        global.addFluidToTank(fluid, amountToAdd, level, entity.getX(), entity.getY(), entity.getZ())
    })
}

fluidFromMob("minecraft:wither_skeleton", "minecraft:milk", 10, ["wither"])
fluidFromMob("minecraft:skeleton", "minecraft:milk", 10, [])
fluidFromMob("minecraft:magma_cube", "minecraft:lava", 10, ["hotFloor"])