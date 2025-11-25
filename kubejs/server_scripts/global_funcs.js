
global.addFluidToTank = (fluid, amount, level, x, y, z) =>
{
    var tanksNearby = global.blockMatchesInArea("create:fluid_tank", level, Math.floor(x), Math.floor(y), Math.floor(z), 2, 2, 2)
    var resolved = false
    var tankIndex = 0
    if (tanksNearby.length <= 0)
    {
        // global.print("no tanks nearby")
        return
    }
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
        // global.print("tank " + tankContent.get("FluidName") + ", bucket: " + fluid + "equal? " + ((String)(tankContent.get("FluidName")) == fluid) + ", contains? " + ((String)(tankContent.get("FluidName")).includes(fluid)))
        if (tankContent.get("FluidName") == "minecraft:empty")
        {
            resolved = true
            tank.mergeEntityData({TankContent:{FluidName:fluid, Amount:amount}});
        }
        else if ((String)(tankContent.get("FluidName")).includes(fluid))
        {
            var currentAmount = parseInt(tankContent.get("Amount"))
            if (currentAmount + amount <= maxFluid)
            {
                resolved = true
                var finalAmount = currentAmount + amount
                // global.print("tank has: " + currentAmount + ", and will have at end: " + finalAmount)
                tank.mergeEntityData({TankContent:{FluidName:fluid, Amount: finalAmount}});
            }
        }
        if(!resolved)
        {
            tankIndex += 1
        }
    }
    return resolved
}

global.blockMatchesInArea = (blockid, l, origin_x, origin_y, origin_z, width, height, depth) =>
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

global.print = (str) => Utils.server.tell(str)

global.burn = (block) => {
    let costPerBlock = 10
    let blockLimit = 0
    let minBlocks = 0
    let state = block.getProperties().blaze
    let data = block.getEntityData()
    let direction = data.get("burnDirection")
    let burnTimeRemaining = data.get("burnTimeRemaining")
    if(state == "smouldering" || state == "none")
        blockLimit = 0
    else if(state == "kindled" || state == "fading")
    {
        minBlocks = 1
        blockLimit = 5
    }
    else if(state == "seething")
    {
        blockLimit = 9
        minBlocks = 4
    }
    if(burnTimeRemaining - (costPerBlock*blockLimit) <= 0)
        blockLimit = Math.floor(burnTimeRemaining / costPerBlock)
    let range = Math.floor(Math.random()*blockLimit) + minBlocks
    let burned = 0
    for (let i = 1; i < range +1; i++)
    {
        let b = block.offset(direction, i)
        let down = b.getDown()
        if (b.id == "minecraft:air" && down.id != "minecraft:air")
        {
            if(down.id == "minecraft:soul_sand" || down.id == "minecraft:soul_soil")
                b.set('minecraft:soul_fire')
            else
                b.set('minecraft:fire')
            burned += 1
        }
    }
    if(burned > 0)
    {
        level.runCommandSilent(`playsound minecraft:entity.blaze.shoot neutral @p`)
        block.setEntityData({"burnTimeRemaining": burnTimeRemaining - (costPerBlock * burned)})
    }
    return burned > 0
}