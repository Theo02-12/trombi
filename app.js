let map;
if (L.Browser.mobile) {
  // Si l'utilisateur accède à la carte depuis un appareil mobile
  map = L.map("map").setView([50.633784, 2.340088], 8); // Zoom réduit pour les appareils mobiles
} else {
  // Si l'utilisateur accède à la carte depuis un PC
  map = L.map("map").setView([50.633784, 2.191772], 10); // Zoom standard pour les PC
}

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const res = fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      var redBorderedIcon = L.icon({
        iconUrl: `./pictures/${element.picture}`,
        iconSize: [38, 38], // taille de l'icône
        iconAnchor: [19, 19], // point d'ancrage de l'icône
        popupAnchor: [0, -19], // point d'ancrage de la popup
        className: "rounded-full border-2 border-red-500", // classe CSS pour le style de la bordure rouge
      });

      var marker = L.marker(element.location, { icon: redBorderedIcon }).addTo(
        map
      );

      // Contenu HTML pour la popup en mode carte
      var popupContent = `
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div class="flex justify-center">
      <img class="w-32 h-32 rounded-full" src="/pictures/${
        element.picture
      }" alt="Sunset in the mountains">
      </div>
      <div class="px-6">
        <div class="font-bold flex flex-col items-center text-xl my-2 text-center">${
          element.firstName + " " + element.lastName
        }
        <span class="text-sm mt-2 flex items-center text-gray-500 text-center dark:text-gray-400"><img class="w-5 h-5" src="icons/locate.svg">${
          element.city
        }</span>
        </div>
        <p class="text-gray-700 text-base">
          Développeur web actuellement en formation Concepteur Développeur d'Applications chez Simplon
        </p>
      </div>
      <div class="flex justify-center gap-1 px-1">
      ${element.stacks
        .map(
          (item) =>
            `
            <span class="cursor-pointer flex justify-center inline-block hover:bg-gray-300 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"><img class="w-8 h-8 m-1" src="./icons/${
              item === ".NET" ? "dotnet" : item
            }.svg"></span> `
        )
        .join("")}
      </div>

      <div class="flex justify-center my-4 gap-1">                            
                    ${element.links
                      .map(
                        (link) =>
                          `<a target="_blank" href="${link.url}" class=" hidden md:block items-center px-4 py-2 text-sm font-medium text-center !text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">${link.name}</a>

                          <a target="_blank" href="${link.url}" class="inline-flex md:hidden items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><img class="w-5 h-5" src="./icons/${link.name}.svg"></a>`
                      )
                      .join("")}
                </div>
    </div>
        `;

      // Ajouter la popup au marqueur
      marker.bindPopup(popupContent, { maxWidth: 280 });
    });
  });

function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map.on("click", onMapClick);
