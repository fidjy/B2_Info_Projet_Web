<template>
  <div>
    <p>restaurant</p>
    <p>{{ $route.params.restaurant }}</p>

    <ul>
      <li v-for="item in items" :key="item.id">...</li>
    </ul>

    <div style="display: none;" class="geolocalisation">
      <div class="lat">@item.lat</div>
      <div class="lng">@item.lng</div>
      <div class="address">@item.address</div>
      <div class="available_bikes">@item.available_bikes</div>
    </div>}
  </div>
</template>

<script>
export default {
  name: "RestaurantDishes",
  data() {
    return {
    };
  },
  methods: {
        elements = document.querySelectorAll("div.geolocalisation");

        watchID = navigator.geolocation.watchPosition(function (position) {

            var map = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 33);
            L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                minZoom: 10,
                maxZoom: 15
            }).addTo(map);


            var markerTab = new Array();
            var markerSize = new Array();
            var markerValue = new Array();
            var markerNombre = 5
            var arrowUp = document.querySelector("div.arrow-up");
            var arrowDown = document.querySelector("div.arrow-down");


            for (var i = 0; i < elements.length; i++) {
                lat = elements[i].querySelector("div.lat");
                lng = elements[i].querySelector("div.lng");
                address = elements[i].querySelector("div.address");
                available_bikes = elements[i].querySelector("div.available_bikes");

                markerSize = Math.sqrt((lat.innerHTML - position.coords.latitude) * (lat.innerHTML - position.coords.latitude) + (lng.innerHTML - position.coords.longitude) * (lng.innerHTML - position.coords.longitude))
                markerValue.push(address.innerHTML, available_bikes.innerHTML, markerSize, lat.innerHTML, lng.innerHTML);

                markerTab.push(markerValue);
                markerValue = []

            }

            markerTab.sort(function (a, b) {
                if (a[2] < b[2]) {
                    return -1
                }
                if (b[2] < a[2]) {
                    return 1
                }
                return 0
            });

            createMarker(markerNombre)
  },
};
</script>