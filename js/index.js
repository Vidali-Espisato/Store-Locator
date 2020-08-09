var map;
var markers = [];
var infoWindow;

function initMap() {
  var losAngeles = { lat: 34.06338, lng: -118.35808 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: "roadmap",
  });
  infoWindow = new google.maps.InfoWindow();
  searchStore();
}

function searchStore() {
  var foundStores = [];
  var zippin = document.getElementById("zippin-input").value;
  if (zippin) {
    stores.forEach(function (store) {
      if (zippin == store["address"]["postalCode"].substring(0, 5)) {
        foundStores.push(store);
      }
    });
  } else {
    foundStores = stores;
  }
  clearLocations();
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener();
}

function clearLocations() {
  infoWindow.close();
  markers.forEach(function (marker) {
    marker.setMap(null);
  });
  markers.length = 0;
}

function displayStores(stores) {
  var storeHTML = "";
  stores.forEach(function (store, index) {
    var address = store["addressLines"];
    var phone = store["phoneNumber"];
    storeHTML += `
        <div class="store-container">
          <div class="store-number-container">
            <div class="store-number">
              ${index + 1}
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

function showStoresMarkers(stores) {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function (store) {
    var name = store["name"];
    var address = store["addressLines"][0];
    var latlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]
    );
    var openStatusText = store["openStatusText"];
    var phone = store["phoneNumber"];
    bounds.extend(latlng);
    createMarker(latlng, name, address, openStatusText, phone);
  });
  map.fitBounds(bounds);
}

function createMarker(latlng, name, address, openStatusText, phone) {
  var html = `<div class="store-info-window">
                <div class="store-info-name">
                  ${name}
                </div>
                <div class="store-info-sub">
                  <div class="store-info-address">
                    <div class="store-icons">
                      <i class="fas fa-street-view"></i>
                    </div>
                    ${address}
                  </div>
                  <div class="store-info-phone">
                    <div class="store-icons">
                      <i class="fas fa-phone-alt"></i>
                    </div>
                    ${phone}
                  </div>
                  <span class="store-info-status">
                      ${openStatusText}
                  </span>
                </div>
              </div>`;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
  });
  google.maps.event.addListener(marker, "mouseover", function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}

function setOnClickListener() {
  storeElements = document.querySelectorAll(".store-container");
  storeElements.forEach(function (storeElement, index) {
    storeElement.addEventListener("click", function () {
      new google.maps.event.trigger(markers[index], "mouseover");
    });
  });
}
