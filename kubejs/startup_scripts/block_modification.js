Platform.mods.kubejs.name = 'Playing With Fire'
BlockEvents.modification(e => {
    e.modify("create:shadow_casing", block => {
        block.resistance = 1200;
    })
})
