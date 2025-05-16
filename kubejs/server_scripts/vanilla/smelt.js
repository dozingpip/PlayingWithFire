ServerEvents.recipes(event => {
    event.smelting('create:limestone', 'minecraft:calcite')
    event.smelting('minecraft:stone', 'minecraft:blackstone')
})