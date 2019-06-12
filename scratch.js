position = 0;

navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position)
  checkIfChanged(position);
});

function checkIfChanged(new_position){
  alert(new_position.coords.latitude);
  alert(new_position.coords.longitude);

  var para = document.getElementById('print-here').innerHTML = "Latitude"+str(new_position.coords.latitude)+" Longitude: "+str(new_position.coords.longitude);

}
