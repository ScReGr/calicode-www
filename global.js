function getAllUrlParams(url) {
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
	var obj = {};
	if (queryString) {
		queryString = queryString.split('#')[0];
		var arr = queryString.split('&');
		for (var i = 0; i < arr.length; i++) {
			var a = arr[i].split('=');
			var paramNum = undefined;
			var paramName = a[0].replace(/\[\d*\]/, function (v) {
				paramNum = v.slice(1, -1);
				return '';
			});
			var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
			paramName = paramName;
			paramValue = paramValue;
			if (obj[paramName]) {
				if (typeof obj[paramName] === 'string') {
					obj[paramName] = [obj[paramName]];
				}
				if (typeof paramNum === 'undefined') {
					obj[paramName].push(paramValue);
				}
				else {
					obj[paramName][paramNum] = paramValue;
				}
			}
			else {
				obj[paramName] = paramValue;
			}
		}
	}
	return obj;
}

function setCookie(name, value) {
	document.cookie = name + "=" + value + "; expires=Mon, 31 Dec 2022 23:59:59 UTC; path=/";
	return document.cookie;
}

function getCookie(name) {
	var name = name + "=";
	var ca = decodeURIComponent(document.cookie).split(';');
	
	for(var i = 0; i < ca.length; i++) {
		  var cookie = ca[i];
		  
	  	while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1);
		}
		  
	  	if (cookie.indexOf(name) == 0) {
			return cookie.substring(name.length, cookie.length);
	  	}
	}
	return null;
}

function setTheme(css) {
	setCookie("theme", css);
}

// Themes
theme = getCookie("theme");
if (theme == "light") {
	document.getElementById("changemode").href = "css/light.css";
	document.getElementById("changemode").innerText = "Switch to Dark Mode";
} else {
	document.getElementById("changemode").href = "css/dark.css";
	document.getElementById("changemode").innerText = "Switch to Light Mode";
}