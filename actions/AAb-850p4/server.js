async function(properties, context) {

    let { file: fileUrl } = properties
    
    // CHECK IF FILE EXISTS
    if (!fileUrl) {
        return { content: "", error: "File not found" };
    }
    
    // CHECK IF FILE URL IS VALID
    if (!fileUrl.startsWith("http://") && !fileUrl.startsWith("https://")) {
        fileUrl = "https:" + fileUrl;
    }

    // READ FILE
    try {
        const res = await fetch(fileUrl);

        if (!res.ok) {
            throw new Error(`Error while downloading file: ${res.status} ${res.statusText}`);
        }
        
        const content = await res.text()
        const file_name = fileUrl.split('?')[0].split('/').pop();

        return { content, file_name, error: "" } ;

    } catch (err) {
        return { content: "", error: err.message || JSON.stringify(err) };
    }

}