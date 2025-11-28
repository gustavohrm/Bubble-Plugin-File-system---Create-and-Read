function(instance, context) {
    
    const { canvas, publishState, triggerEvent, data } = instance
    
    // HELPER
	data.reportError = (msg) => {
    	context.reportDebugger(msg)
        publishState('error', msg)
        triggerEvent('error')
    }
    
    canvas.remove();

}