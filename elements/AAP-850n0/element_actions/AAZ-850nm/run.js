function(instance, properties, context) {

    const { publishState, triggerEvent, data: { reportError } } = instance;
	const { content, filename, download, save_to_bubble } = properties;

	try {
        
        if(!content || !filename) throw new Error('You must provide a valid content and filename.');
        
        // CREATE BLOB
        const blob = new Blob([content]);
        
        triggerEvent('created')

        // DOWNLOAD
        if(download) {
        	const link = document.createElement('a');
            const url  = URL.createObjectURL(blob);
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
        
        // SAVE TO BUBBLE
        if(save_to_bubble) {
        	const base64 = btoa(unescape(encodeURIComponent(content)))
            
            context.uploadContent(filename, base64, (err, url) => {
            	if (err) throw new Error(err)
                publishState('bubble_file', url)
                triggerEvent('saved_to_bubble')
            })
        }
        
    } catch (err){
    	context.reportDebugger(err.message || JSON.stringify(err))
    }

}