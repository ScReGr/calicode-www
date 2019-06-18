//Quick dirty templating engine
//made by EncloInc

String.prototype.replaceString = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);

    return string + this;
};


function render(html, json, internal){
	let jsonKeys = Object.keys(json)
	let parsedHtml = html
	
	for(i in jsonKeys){
		
		if(typeof json[jsonKeys[i]] === 'string' && ((!jsonKeys[i].startsWith('!') && !internal) || (jsonKeys[i].startsWith('!') && internal))){
			
			parsedHtml = parsedHtml.split(`[[${jsonKeys[i]}]]`).join(json[jsonKeys[i]])
		}else if(typeof json[jsonKeys[i]] === 'object'){

			let array = json[jsonKeys[i]].reverse()
			let keyName = jsonKeys[i]

			while(parsedHtml.indexOf(`[[${keyName}]]`) != -1){

				let index = parsedHtml.indexOf(`[[${keyName}]]`) + (keyName.length + 4);

				let runningIndex = index + 6;

				
				while(parsedHtml.substring(runningIndex, runningIndex + 6) !== '<tmp?>'){
					runningIndex++;
				}

				for(i2 in array){
					parsedHtml = parsedHtml.replaceString(runningIndex+ 6, render(parsedHtml.substring(index + 6, runningIndex), array[i2], true));
				}

				parsedHtml = parsedHtml.substring(0, parsedHtml.indexOf(`[[${keyName}]]`)) + parsedHtml.substring(runningIndex + 6, parsedHtml.length - 1 )
			}
			
		}
	}
	return parsedHtml
}

module.exports = {
	render: render
}