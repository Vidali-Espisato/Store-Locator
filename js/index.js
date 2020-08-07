var map;
var markers = [];
var infoWindow;

window.onload = function () {
  displayStores();
};

function initMap() {
  var losAngeles = { lat: 34.06338, lng: -118.35808 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: "roadmap",
  });
  infoWindow = new google.maps.InfoWindow();
  showStoresMarkers();
}

function displayStores() {
  var storeHTML = "";
  var count = 0;
  stores.forEach(function (store) {
    count++;
    var address = store["addressLines"];
    var phone = store["phoneNumber"];
    storeHTML += `
        <div class="store-container">
          <div class="store-number-container">
            <div class="store-number">
              ${count}
            </div>
          </div>
          <div class="store-info-container">
            <div class="store-address">
              <span>${address[0]}</span>
              <span>${address[1]}</span>
            </div>
            <div class="store-contact">${phone}</div>
          </div>
        </div>
      `;
    document.querySelector(".stores-list").innerHTML = storeHTML;
  });
}

function showStoresMarkers() {
  var count = 0;
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function (store) {
    count++;
    var name = store["name"];
    var address = store["addressLines"][0];
    var latlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]
    );
    bounds.extend(latlng);
    createMarker(latlng, name, address, count);
  });
  map.fitBounds(bounds);
}

function createMarker(latlng, name, address, index) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: index.toString(),
  });
  google.maps.event.addListener(marker, "click", function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}
