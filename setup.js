const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const path = require('path')

const files = 
`index.js
/static/404.html
/static/profile.html
/client/index.html
/client/mystuff/index.html
/client/cdn/global.js
/client/cdn/css/dark.css
/client/cdn/css/light.css`.split('\n')
const productionUrl = 'calicode.now.sh'
const localUrl = 'localhost'

let urls = {'old': '', 'new': ''}

if(argv.o === 'production'){
	urls.old = localUrl
	urls.new = productionUrl
}else if(argv.o === 'testing'){
	urls.old = productionUrl
	urls.new = localUrl
}

if(urls.old != ''){
	for (i in files){
		let text = fs.readFileSync(path.join(__dirname, files[i]), 'UTF-8')
		fs.writeFileSync(path.join(__dirname, files[i]), text.split(urls.old).join(urls.new))
	}
}