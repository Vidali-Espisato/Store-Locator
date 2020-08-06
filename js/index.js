function initMap() {
  var losAngeles = { lat: 34.06338, lng: -118.35808 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: "roadmap",
  });
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

window.onload = function () {
  displayStores();
};
