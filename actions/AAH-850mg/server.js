async function(properties, context) {
    
    const { content, filename } = properties
    
    try{
        if (!content || !filename) throw new Error('Invalid content or filename.');
        const res = await fetch("https://bublet-plugins.bubbleapps.io/version-test/fileupload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: filename,
                contents: Buffer.from(content).toString("base64")
            })
        });

        const file = await res.text();
        return { file }
    
    } catch (err){
    	return { error: err.message || JSON.stringify(err) }
    }

}