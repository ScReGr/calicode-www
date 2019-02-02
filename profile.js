window.onload = function() {
	var id = getAllUrlParams().id;
	document.getElementById("username").innerHTML = id;
	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://api.calicode.gq/user.sjs?id="+id,true);
	xhr.send(null);
	xhr.onload = function() {
		var response = JSON.parse(xhr.responseText);
		if (response.status == "error") {
			document.getElementById("username").innerHTML = "UDNE"
		} else {
			document.getElementById("aboutUser").innerHTML = response.about;
		}
	}
}