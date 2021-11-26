/* Script encargado de construir la pagina usando como base de datos
una Hoja de Calculo de Google externa */

// Permite el uso de $ como abreviación a document.getElementById
var $ = function (id) {
  return document.getElementById(id);
};

// Esta es la referencia a la API de sheet.best vinculada a la Hoja de Calculo de Google externa
const SPREADSHEET =
  "https://opensheet.vercel.app/1CqMc1KeVl39WRYyrYeszZu1EQVoUB7Lxprroi2iSsc0";

// Si hay datos locales los cargamos primero
var localstorage1, localstorage2;
localstorage1 = localStorage.localstorage1 || "";
localstorage2 = localStorage.localstorage2 || "";
$("localstorage1").innerHTML = localstorage1;
$("localstorage2").innerHTML = localstorage2;
$("placeholder_localstorage").style.display =
  localstorage1 == "" || localstorage2 == "" ? "inline" : "none";

// En la hoja Secciones vemos cuales estan para mostrar luego se actualizan y se muestran.
fetchSecciones();
async function fetchSecciones() {
  const response = await fetch(SPREADSHEET + "/Secciones");
  let json_secciones = await response.json();

  // Actualizar los contenidos de secciones uno a uno 😎:
  json_secciones[0].Mostrar === "TRUE"
    ? await UpdateIntro()
    : ($("placeholder_sintro").style.display = "none");
  json_secciones[1].Mostrar === "TRUE"
    ? await UpdateCitas()
    : ($("placeholder_scita").style.display = "none");
  json_secciones[2].Mostrar === "TRUE"
    ? await UpdateRecursos()
    : ($("placeholder_srecursos").style.display = "none");
  json_secciones[3].Mostrar === "TRUE"
    ? await UpdateImagenes()
    : ($("placeholder_simagen").style.display = "none");
  json_secciones[5].Mostrar === "TRUE"
    ? await UpdateLocalStorage()
    : ($("seccion_localstorage").style.display = "none");
  json_secciones[4].Mostrar === "TRUE" ? RunTopSecret() : null;

  // Actualizar los contenidos de seciones de forma simultanea 👩‍💻:
  /*   json_secciones[0].Mostrar === "TRUE" ? UpdateIntro() : ($("placeholder_sintro").style.display = "none");
  json_secciones[1].Mostrar === "TRUE" ? UpdateCitas() : ($("placeholder_scita").style.display = "none");
  json_secciones[2].Mostrar === "TRUE" ? UpdateRecursos() : ($("placeholder_srecursos").style.display = "none");
  json_secciones[3].Mostrar === "TRUE" ? UpdateImagenes() : ($("placeholder_simagen").style.display = "none");
  json_secciones[4].Mostrar === "TRUE" ? RunTopSecret() : null; */
  return;
}

// Update & show: 😎 Introducción 📄
async function UpdateIntro() {
  $("placeholder_sintro").style.display = "none";
  $("seccion_introduccion").style.display = "inline";
  await fetch(SPREADSHEET + "/Parrafos")
    .then((resp) => resp.json())
    .then((main) => {
      document.querySelector("#introduccion1").innerHTML =
        main[0].Contenido;
      document.querySelector("#introduccion2").innerHTML =
        main[1].Contenido;
    });
  $("placeholder_intro").style.display = "none";
  return;
}

// Update & show: 🤯 Cita Informática Aleatoria 🎲
async function UpdateCitas() {
  $("placeholder_scita").style.display = "none";
  $("seccion_cita").style.display = "inline";
  await fetch(SPREADSHEET + "/Citas")
    .then((resp) => resp.json())
    .then((citas) => {
      const r_citas = citas;
      const random = Math.floor(Math.random() * r_citas.length);
      document.querySelector("#cita").innerHTML =
        r_citas[random].Citas +
        "<br><strong>Autor:" +
        r_citas[random].Autores +
        "</strong>";
    });
  $("placeholder_cita").style.display = "none";
  return;
}

// Update & show: 💡 Recursos (Aprende) 💡
async function UpdateRecursos() {
  $("placeholder_srecursos").style.display = "none";
  $("seccion_recursos").style.display = "inline";
  await fetch(SPREADSHEET + "/Recursos")
    .then((resp) => resp.json())
    .then((materiales) => {
      const r_materiales = materiales;
      r_materiales
        .filter((m) => m.Mostrar === "TRUE")
        .forEach((m) => {
          let link = document.createElement("a");
          if (m.Enlace != "") {
            link.setAttribute("href", `${m.Enlace}`);
            link.setAttribute("target", "_blank");
          }
          link.appendChild(document.createTextNode(`${m.Nombre}`));

          let list = document.createElement("li");
          list.appendChild(link);

          $("recursos").appendChild(list);
        });
    });
  $("placeholder_recursos").style.display = "none";
  return;
}

// Update & show: 📷 Imagen Aleatoria 🎲
async function UpdateImagenes() {
  $("placeholder_simagen").style.display = "none";
  $("seccion_imagen").style.display = "inline";
  let random = Math.floor(Math.random() * 100);
  await fetch(
    "https://jsonplaceholder.typicode.com/albums/" + random + "/photos"
  )
    .then((resp) => resp.json())
    .then((fotos) => {
      random = Math.floor(Math.random() * fotos.length);
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      img.setAttribute("src", `${fotos[random].url}`);
      figcaption.appendChild(document.createTextNode(`${fotos[random].title}`));
      $("imagen").appendChild(img);
      $("imagen").appendChild(figcaption);
    });
  $("placeholder_imagen").style.display = "none";
  return;
}

// Update: 💾 LocalStorage 💾
async function UpdateLocalStorage() {
  await getFromAPI(
    SPREADSHEET + "/Parrafos",
    function (json) {
      if (localstorage1 != json[2].Contenido) {
        localStorage.localstorage1 = json[2].Contenido;
        $("localstorage1").innerHTML = json[2].Contenido;
      }
      if (localstorage2 != json[3].Contenido) {
        localStorage.localstorage2 = json[3].Contenido;
        $("localstorage2").innerHTML = json[3].Contenido;
      }
    }
  );
  $("placeholder_localstorage").style.display = "none";
}
async function getFromAPI(url, callback) {
  var obj;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => (obj = data))
    .then(() => callback(obj));
}

function RunTopSecret() {
  $("🚧seccion_topsecret🚧").style.display = "inline";
  $("🚧seccion_topsecret🚧").hidden = false;
  console.log("Funcion TopSecreta ejecutada, el codigo es:");
  console.log("🔴🟡🟡🟠🟢🔴🔴🔴🟡🔵🟣🔵⚫");
  return;
}
