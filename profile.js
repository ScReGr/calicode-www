var replyingid = -1;
function replyto(user, id) {
	replyingid = id;
	document.getElementById("reply-input"+id).value = "@"+user+" ";
	document.getElementById("reply-input"+id).value = "@"+user+" ";
	document.getElementById("reply-input"+id).focus();
	document.getElementById("reply-input"+id).style.display="inline-block"
}

document.getElementById('css_toggle').onclick = function () {
	document.getElementById('changemode').href = "css/light.css"
}

window.onload = function() {
	var id = getAllUrlParams().id;
	document.getElementById("username").innerHTML = id;
	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://api.calicode.gq/user.sjs?id="+id,true);
	xhr.send(null);
	xhr.onload = function() {
		var response = JSON.parse(xhr.responseText);
		if (response.status == "error") {
			document.getElementById("username").innerHTML = "Unknown"
			document.getElementById("aboutUser").innerHTML = "Unknown"
		} else {
			document.getElementById("followButton").onclick = function(e) {
				if (localStorage.sess != undefined) {
					var xhr = new XMLHttpRequest();
					xhr.open("POST","https://api.calicode.gq/follow.sjs",true);
					xhr.send("sess"+localStorage.sess+"&id="+id);
					xhr.onload = function(e2) {
						location.reload();
					}
				}
			}
			document.getElementById("aboutUser").innerHTML = response.about;
			document.getElementById("country").innerHTML = response.country;
			document.getElementById("comments").innerHTML = "";
			document.getElementById("numberFollowers").innerHTML = response.followers.length;
			document.getElementById("numberFollowing").innerHTML = response.following.length;
			var comments = response.comments;
			for (var c in comments) {
				document.getElementById("comments").innerHTML = document.getElementById("comments").innerHTML+'<div><div class="smallProfileIcon"></div><h4 style="margin-left: calc(35px + 1em);margin-bottom:0px;margin-top:calc(-35px - 1em)">'+comments[c].poster+'</h4><p id="commentContent">'+comments[c].content+'</p><div id="newButton" style="margin-left:calc(35px + 1em)"><a href="javascript:replyto(\''+comments[c].poster+'\','+c+')" style="padding: 0px 5px 0px 5px">Reply</a></div> <a id="newButton" href="javascript:like('+c+')"><img src="assets/heart.svg" style="height:9px"></a><br><textarea class="reply-input" id="reply-input'+c+'"></textarea></div>';
			}
		}
	}
}