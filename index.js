const express = require("express");
const app = express()
const bodyParser = require('body-parser');
const path = require("path")
const { exec } = require('child_process');
const fs = require("fs")
const crypto = require("crypto");
const cheerio = require("cheerio")
const qdt = require('./lib/qdt.js')

const templates = {
	'profile': fs.readFileSync(path.join(__dirname, "static/profile.html"), 'UTF-8')
}

app.use(express.static(path.join(__dirname, "client")))

app.use("/api/" ,bodyParser.urlencoded({ extended: false }));
app.use("/api/", bodyParser.json());


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', '*');

    res.setHeader('Access-Control-Allow-Credentials', true);


        next();
  });


app.listen(80, () => console.log('Running Calicode'))

app.get('/users/:name', (req, res) => {
	if(fs.existsSync(path.join(__dirname, `/db/user_profiles/${req.params.name.toLowerCase()}.json`))){
		let json = JSON.parse(fs.readFileSync(path.join(__dirname, `/db/user_profiles/${req.params.name.toLowerCase()}.json`)))
		
		res.send(qdt.render(templates.profile, json))


	}else{
		res.sendFile(path.join(__dirname, "static/404.html"))
	}
});
