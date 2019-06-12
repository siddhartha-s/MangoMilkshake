function personalize() {
	document.getElementById('mmUserName').innerHTML = window.localStorage.getItem('CurrentUser');
	document.getElementById('mmSearchBarUserName').innerHTML = window.localStorage.getItem('CurrentUser');
	document.getElementById('mmAlert1Date').innerHTML = 'Today';
	document.getElementById('mmAlert1Msg').innerHTML = 'Mom has checked in from a new location';
	document.getElementById('mmAlert2Date').innerHTML = '2 Days ago';
	document.getElementById('mmAlert2Msg').innerHTML = 'Its looks like Dad is back home from his business trip';
}

function mmNewEntryValidation() {
	var user = window.localStorage.getItem('CurrentUser');
	var activity = document.getElementById('mmActivity').value;
	var loc = document.getElementById('mmLocation').value;
	
	if (loc == "") {
		// Sid will probably do something here
	}
	
	createCard(user, activity, loc);	
}

function createCard(user, activity, loc) {
	alert("here now");
	var container = document.getElementById("check-ins-container");
	
	container.appendChild(createWrapper(user, activity, loc));
}

function createWrapper(user, activity, loc) {
		
	var activity_div = document.createElement("div")
	activity_div.setAttribute("class", "text-xs font-weight-bold text-primary mb-1")
	activity_div.innerHTML = activity;
	var location_div = document.createElement("div")
	location_div.setAttribute("class", "h5 mb-0 font-weight-bold text-gray-700")
	location_div.innerHTML = loc;
	var when_div = document.createElement("div")
	when_div.setAttribute("class", "text-xs font-weight-bold text-primary mb-1")
	when_div.innerHTML = (new Date).getHours() + ":" + (new Date).getMinutes() + ", June " + (new Date).getDate();
	
	var col_div = document.createElement("div");
	col_div.setAttribute("class", "col mr-2");
	col_div.appendChild(activity_div);
	col_div.appendChild(location_div);
	col_div.appendChild(when_div);
	
	var row_div = document.createElement("div");
	row_div.setAttribute("class", "row no-gutters align-items-center");
	row_div.appendChild(col_div);
	
	var card_body_div = document.createElement("div");
	card_body_div.setAttribute("class", "card-body");
	card_body_div.appendChild(row_div);
	
	var card_div = document.createElement("div");
	card_div.setAttribute("class", "card border-left-primary shadow h-100 py-2");
	card_div.appendChild(card_body_div);
	
	var wrapper = document.createElement("div");
	wrapper.setAttribute("class", "col-xl-3 col-md-6 mb-4");
	wrapper.appendChild(card_div);
	
	return wrapper;
}

