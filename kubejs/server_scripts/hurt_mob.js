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

let blockMatchesInArea = (blockid, l, origin_x, origin_y, origin_z, width, height, depth) =>
{
    var results = []
    for (let i = origin_x - width; i <= origin_x + width; i++)
    {
        for (let j = origin_y - height; j <= origin_y + height; j++)
        {
            for (let k = origin_z - depth; k <= origin_z + depth; k++)
            {
                let block = l.getBlock(i, j, k)
                if(block.id == blockid)
                    results.push([i, j, k, block])
            }
        }
    }
    return results
}

let fluidFromMob = (mob, fluid, amount, exclude_damage) =>
{
    EntityEvents.hurt(mob, event => {
        const {source, level, entity} = event
        var damage = Math.min(event.getDamage(), entity.maxHealth)
        var damage_source = source.getType().toString()
        var amountToAdd = amount * damage;
        if (damage_source in exclude_damage || amountToAdd <= 0)
            return
        var tanksNearby = blockMatchesInArea("create:fluid_tank", level, Math.floor(entity.getX()), Math.floor(entity.getY()), Math.floor(entity.getZ()), 2, 2, 2)
        var resolved = false
        var tankIndex = 0
        if (tanksNearby.length <= 0)
            return
        while(!resolved && tankIndex < tanksNearby.length)
        {
            var tank = tanksNearby[tankIndex][3]
            var tankData = tank.getEntityData()
            var maxFluid = 8000
            if ("Controller" in tankData)
            {
                var controller = tankData.get("Controller")
                tank = level.getBlock(parseInt(controller.get("X")), parseInt(controller.get("Y")), parseInt(controller.get("Z")))
                tankData = tank.getEntityData()
            }
            if("Size" in tankData)
            {
                var size = parseInt(tankData.get("Size"))
                var height = parseInt(tankData.get("Height"))
                maxFluid = size * size * height * 8000
            }
            var tankContent = tankData.get("TankContent")
            if (tankContent.get("FluidName") == "minecraft:empty")
            {
                resolved = true
                tank.mergeEntityData({TankContent:{FluidName:fluid, Amount:amountToAdd}});
            }
            else if (tankContent.get("FluidName") == fluid)
            {
                var currentAmount = parseInt(tankContent.get("Amount"))
                if (currentAmount + amountToAdd <= maxFluid)
                {
                    resolved = true
                    var finalAmount = currentAmount + amountToAdd
                    console.log("tank has: " + currentAmount + ", and will have at end: " + finalAmount)
                    tank.mergeEntityData({TankContent:{FluidName:fluid, Amount: finalAmount}});
                }
            }
            if(!resolved)
            {
                tankIndex += 1
            }
        }
    })
}

fluidFromMob("minecraft:wither_skeleton", "minecraft:milk", 10, ["wither"])
fluidFromMob("minecraft:skeleton", "minecraft:milk", 10, [])
fluidFromMob("minecraft:magma_cube", "minecraft:lava", 10, ["hotFloor"])