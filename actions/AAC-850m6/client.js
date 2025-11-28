function(properties, context) {

    const { content, filename } = properties
    
    try {
        if(!content || !filename) throw new Error('You must provide a valid content and filename.');
        // CREATE BLOB
        const blob = new Blob([content]);

        // DOWNLOAD
        const link = document.createElement('a');
        const url  = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (err){
    	context.reportDebugger(err.message || JSON.stringify(err))
    }

}