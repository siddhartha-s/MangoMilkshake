function personalize() {
	document.getElementById('mmUserName').innerHTML = window.localStorage.getItem('CurrentUser');
	document.getElementById('mmSearchBarUserName').innerHTML = window.localStorage.getItem('CurrentUser');
	document.getElementById('mmAlert1Date').innerHTML = 'Today';
	document.getElementById('mmAlert1Msg').innerHTML = 'Mom has checked in from a new location';
	document.getElementById('mmAlert2Date').innerHTML = '2 Days ago';
	document.getElementById('mmAlert2Msg').innerHTML = 'Its looks like Dad is back home from his business trip';
}

function do_something(latitude,longitude,user,activity){
	fetch('https://api.foursquare.com/v2/venues/search?client_id=00MW1LMT40Q1IIZEI5XOHY3XWTRDF1OSHURVADJ324ELKZJB&client_secret=N05DW22XDURZP1VTATRXNI43NIMF5V1UU1JZC0GYOQMZJD5Y&v=20180323&limit=1&ll='+latitude.toString()+","+longitude.toString())
    .then(function(response) {
      console.log("Hope this works!");
      return response.json();
    })
    .then(function(myJson){
      console.log("This works!");

      var loc = myJson["response"]["venues"][0]["name"];

      createCard(user, activity, loc);
    })

    .catch(function() {
        // Code for handling errors
    });
}

var modal = document.getElementById('addPlaceModal');

function mmNewEntryValidation() {
	var user = window.localStorage.getItem('CurrentUser');
	var activity = document.getElementById('mmActivity').value;
	var loc = document.getElementById('mmLocation').value;

	if (activity == "")
	{
		alert("please enter what you're doing");
		return;
	}
	
	if (loc == "") {
		navigator.geolocation.getCurrentPosition(function(position) {
  	do_something(position.coords.latitude, position.coords.longitude,user,activity);
	});
	}else{
		createCard(user, activity, loc);
	}
	
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function createCard(user, activity, loc) {
	alert("Using API magic, we think you're here now: "+loc);
	var container = document.getElementById("check-ins-container");

	container.appendChild(createWrapper(user, activity, loc));
}

function previewFile() {
  var preview = document.getElementById('pImg');
  var file    = document.getElementById('pImg_button').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
		var img_button_div1 = document.getElementById("img_button_div");
		img_button_div1.style.display = "none";

		var img_div1 = document.getElementById("img_div");
		img_div1.style.display = "block";
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
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

	var img_button_div = document.createElement("div");
	img_button_div.setAttribute("class", "text-xs font-weight-bold text-primary mb-1");
	img_button_div.setAttribute("id","img_button_div");
	var img_button = document.createElement("input");
	img_button.setAttribute("type","file");
	img_button.setAttribute("id","pImg_button");
	img_button.setAttribute("onchange","previewFile()");
	img_button_div.appendChild(img_button);
	var img_div = document.createElement("div");
	img_div.setAttribute("class", "text-xs font-weight-bold text-primary mb-1");
	img_div.setAttribute("id","img_div");
	img_div.style.display = "none";
	var pImg = document.createElement("img");
	pImg.setAttribute("src","");
	pImg.setAttribute("id","pImg");
	pImg.setAttribute("height","200");
	pImg.setAttribute("alt","Image preview...");
	img_div.appendChild(pImg);

	var col_div = document.createElement("div");
	col_div.setAttribute("class", "col mr-2");
	col_div.appendChild(activity_div);
	col_div.appendChild(location_div);
	col_div.appendChild(when_div);
	col_div.appendChild(img_button_div);
	col_div.appendChild(img_div);

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
