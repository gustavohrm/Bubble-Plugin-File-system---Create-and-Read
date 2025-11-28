function(instance, properties, context) {

    const { file, dialog } = properties
    const { triggerEvent, publishState, data: { reportError, input } } = instance
    
    if (!file && !dialog) return reportError('You must provide a file.')
    
	if (file) {
    	try {
            const res = fetch(file)
            .then((r) => {
            	if (!r.ok) throw new Error(`Error ocurred downloading file: ${res.status} ${res.statusText}`);
                return r.text();
            })
            .then((c) => {
                const n = file.split('?')[0].split('/').pop();
                publishState('file_name', n)
                publishState('file_content', c)
                return triggerEvent('read');
            })
        } catch (err) {
            return reportError(err.message || JSON.stringify(err));
        }
    }
    
    if (dialog) {
        try {
        	const input = document.createElement('input')
            input.setAttribute('type', 'file');
            input.style.display = 'none'
            document.body.appendChild(input)

            input.onchange = (f) => {
                if(f.target.files.length === 0){
                    return;
                }
                const file = f.target.files[0];

                const reader = new FileReader();
                reader.onload = () => {
                    publishState('file_name', file.name)
                    publishState('file_content', reader.result)
                    triggerEvent('read')
                    input.value = '';
                    document.body.removeChild(input);
                }
                reader.onerror = () => {
                    throw new Error(`Error occurred reading file: ${selectedFile.name}`)
                }
                reader.readAsText(file)
            }

            input.click();
        } catch (err) {
        	return reportError(err.message || JSON.stringify(err));
        }
    }
}