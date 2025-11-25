let addRemoveBucketFromFluidTank = (player, item, fluidName, tank, amount) =>
{

}
let addRemoveFluidFromMachine = (player, item, fluidName, machine, full_item, empty_item, amount) =>
{
    let fluid = machine.getFluidStored("fluid")
    let result = false;
    switch(item.id)
    {
        case full_item:
            if (fluid.amount + amount <= machine.getFluidCapacity("fluid") && (fluid.id == fluidName || fluid.id == 'minecraft:empty'))
            {
                machine.addFluidToTank("fluid", Fluid.of(fluidName, amount), false)
                item.count--
                player.giveInHand(empty_item)
                result = true;
            }
            break;
        case empty_item:
            if (fluid.amount >= amount && fluid.id == fluidName)
            {
                item.count--
                machine.removeFluidFromTank("fluid", amount, false)
                player.giveInHand(full_item)
                result = true;
            }
            break;
        default:
            break;
    }
    console.log(result)
    return result;
}
let addRemovePotionFluid = (player, item, machine, amount) =>
{
    let fluid = machine.getFluidStored("fluid")
    let result = false;
    if (item.id == "minecraft:potion")
    {
        let potionName = item.nbt.Potion
        let potionMatch = fluid.id == "create:potion" && fluid.nbt.Potion == potionName
        if ((potionMatch || fluid.id == 'minecraft:empty') && fluid.amount + amount <= machine.getFluidCapacity("fluid"))
        {
            machine.addFluidToTank("fluid", Fluid.of("create:potion", amount).withNBT({Potion: potionName}), false)
            item.count--
            player.giveInHand("minecraft:glass_bottle")
            result = true;
        }
    }
    else if(item.id == "minecraft:glass_bottle")
    {
        if (fluid.id == "create:potion" && fluid.amount >= amount)
        {
            let potionName = fluid.nbt.Potion
            item.count--
            machine.removeFluidFromTank("fluid", amount, false)
            player.giveInHand(Item.of("minecraft:potion").withNBT({Potion: potionName}))
            result = true;
        }
    }
    return result;
}
BlockEvents.rightClicked(event => {
    const { block, item, player, level, direction, server, target } = event
    if (block.id == 'kubejs:teatable')
    {
        let machine = CustomMachine.of(block)
        let successTea = addRemoveFluidFromMachine(player, item, "create:tea", machine, "create:builders_tea", "minecraft:glass_bottle", 250)
        let successPotion = addRemovePotionFluid(player, item, machine, 250)
        // success = success || addRemoveFluid(player, item, "create:honey", machine, "minecraft:honey_bottle", "minecraft:glass_bottle", 500)
        if(successTea || successPotion)
            event.cancel();
    }
    else if (block.id == 'minecraft:jukebox')
    {
        let nbt = block.getEntityData()
        if("RecordItem" in nbt)
        {
            let disc = nbt.RecordItem.id
            if (disc.startsWith('minecraft:music_disc_'))
            {
                Utils.server.runCommand("stopsound @a record minecraft:music_disc." + disc.substring(21, disc.length))
            }
        }
    }
    else if(item.id == 'create:filter' && event.hand == 'main_hand' && player.crouching)
    {
        let nbt = item.serializeNBT()
        if(nbt.tag.hasOwnProperty("Items")){
            let list = nbt.tag.Items.Items
            let last = list.get(list.size() -1).copy()
            last.Slot += 1
            last.id = block.id
            nbt.tag.Items.Items.add(last)
            item.deserializeNBT(nbt)
            console.log(item.serializeNBT())
        }
    }
    else if(block.id == 'minecraft:flower_pot' && !player.crouching)
    {
        switch(item.id)
        {
            case 'minecraft:sugar_cane':
                level.setBlock(block.pos, Block.getBlock('kubejs:potted_sugar_cane').withPropertiesOf(block.blockState), 3)
                item.count--
                break;
            case 'minecraft:twisting_vines':
                level.setBlock(block.pos, Block.getBlock('kubejs:potted_twisting_vines').withPropertiesOf(block.blockState), 3)
                item.count--
                break;
            default:
                break;
        }
    }
    else if(block.id == 'kubejs:potted_sugar_cane')
    {
        player.giveInHand('minecraft:sugar_cane')
        level.setBlock(block.pos, Block.getBlock('minecraft:flower_pot').withPropertiesOf(block.blockState), 3)
    }
    else if(block.id == 'kubejs:potted_twisting_vines')
    {
        player.giveInHand('minecraft:twisting_vines')
        level.setBlock(block.pos, Block.getBlock('minecraft:flower_pot').withPropertiesOf(block.blockState), 3)
    }
    else if(block.id == 'create:blaze_burner' && event.hand == 'main_hand')
    {
        let costPerBlock = 10
        let blockLimit = 0
        let minBlocks = 0
        let state = block.getProperties().blaze
        let burnTimeRemaining = block.getEntityData().get("burnTimeRemaining")
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
            let b = block.offset(event.getFacing().opposite, i)
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
            player.swing()
            // let burnTimeRemainingAfter = block.getEntityData().get("burnTimeRemaining")
            // Utils.server.tell("remaining: " + burnTimeRemaining + ", after: " + burnTimeRemainingAfter)
        }
    }
})