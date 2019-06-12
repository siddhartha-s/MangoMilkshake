function login() {
	var username = document.getElementById('mmInputEmail').value;
	var password = document.getElementById('mmInputPassword').value;
	
	if (username != password) {
		document.getElementById('mmErrorMessage').style="color: red";
	}
	else {
		window.localStorage.setItem("CurrentUser", username);
		document.getElementById('mmLogin').href="dashboard.html"
	}
}