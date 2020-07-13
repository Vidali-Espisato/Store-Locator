function initMap() {
  var jalandhar = { lat: 31.2569, lng: 75.4432 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: jalandhar,
    zoom: 11,
    mapTypeId: "roadmap",
  });
}
