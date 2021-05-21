const SPREADSHEETLIST =
  "https://spreadsheets.google.com/feeds/list/1CqMc1KeVl39WRYyrYeszZu1EQVoUB7Lxprroi2iSsc0";
const SPREADSHEETCELL =
  "https://spreadsheets.google.com/feeds/cells/1CqMc1KeVl39WRYyrYeszZu1EQVoUB7Lxprroi2iSsc0";
// Update DataBase: Texto
fetch(SPREADSHEETCELL + "/1/public/values?alt=json")
  .then((resp) => resp.json())
  .then((main) => {
    document.querySelector("#texto").innerHTML = main.feed.entry[16].gs$cell.$t;
  });
// Update DataBase: Secciones
fetch(SPREADSHEETLIST + "/of7ss6r/public/values?alt=json")
  .then((resp) => resp.json())
  .then((secciones) => {
    const r_secciones = secciones.feed.entry;
    r_secciones[0].gsx$mostrar.$t === "TRUE" ? UpdateCitas() : null;
    r_secciones[1].gsx$mostrar.$t === "TRUE" ? UpdateMaterial() : null;
    r_secciones[2].gsx$mostrar.$t === "TRUE" ? UpdateImagenes() : null;
  });
// Update DataBase: Citas Informaticas
function UpdateCitas() {
  document.getElementById("seccion_cita").style.display = "inline";
  fetch(SPREADSHEETLIST + "/od6/public/values?alt=json")
    .then((resp) => resp.json())
    .then((citas) => {
      const r_citas = citas.feed.entry;
      const random = Math.floor(Math.random() * r_citas.length);
      document.querySelector("#cita").innerHTML =
        r_citas[random].gsx$citas.$t + " ~" + r_citas[random].gsx$autores.$t;
    });
}
// Update DataBase: Material
function UpdateMaterial() {
  document.getElementById("seccion_material").style.display = "inline";
  fetch(SPREADSHEETLIST + "/oq6pdsq/public/values?alt=json")
    .then((resp) => resp.json())
    .then((materiales) => {
      const r_materiales = materiales.feed.entry;
      r_materiales
        .filter((m) => m.gsx$mostrar.$t === "TRUE")
        .forEach((m) => {
          let link = document.createElement("a");
          if (m.gsx$enlace.$t != "") {
            link.setAttribute("href", `${m.gsx$enlace.$t}`);
            link.setAttribute("target", "_blank");
          }
          link.appendChild(document.createTextNode(`${m.gsx$nombre.$t}`));

          let list = document.createElement("li");
          list.appendChild(link);

          document.getElementById("material").appendChild(list);
        });
    });
}
// Update DataBase: Imagenes
function UpdateImagenes() {
  document.getElementById("seccion_imagen").style.display = "inline";
  let random = Math.floor(Math.random() * 100);
  fetch("https://jsonplaceholder.typicode.com/albums/" + random + "/photos")
    .then((resp) => resp.json())
    .then((fotos) => {
      random = Math.floor(Math.random() * fotos.length);
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      img.setAttribute("src", `${fotos[random].url}`);
      figcaption.appendChild(document.createTextNode(`${fotos[random].title}`));
      document.getElementById("imagen").appendChild(img);
      document.getElementById("imagen").appendChild(figcaption);
    });
}
