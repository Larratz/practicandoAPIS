let frutero = document.getElementById("frutero");
let temporada_actual = document.getElementById("temporada_actual");
let temporada_select = document.getElementById("temporada_select");
let mes = document.getElementById("mes");
let recetero = document.getElementById("recetero");

// El array CALENDARIO es el que contiene la información de Frutas y Vegetales de temporada.
//PROBANDO: 9040 es el ID para Banana

//me guardo estos tres ultimos IDs de ABRIL para ahorrar PUNTOS: , 11135, 11564, 11304, 11291, 11246

let calendario = [
  [
    11252, 11152, 11007, 11135, 11090, 98938, 11564, 11246, 11147, 11080,
    10011457,
  ],
  [11152, 11007, 11135, 98938, 11564, 11246, 11147, 11080, 10011457],
  [11007, 11135, 11564, 11246, 11147, 11080, 10011457],
  [11007, 11135, 11564, 11304, 11291, 11246],
  [11007, 11564, 11477, 11304, 11291, 11246, 11352],
  [
    11135, 11090, 11564, 11477, 16053, 11304, 11291, 11215, 11246, 11352, 11124,
    11147, 11080,
  ],
  [
    11135, 11090, 11564, 11477, 11206, 16053, 11304, 11291, 11282, 11215, 11246,
    11529, 11209, 11352, 11124, 11143, 11147, 11080,
  ],
  [
    11135, 11477, 11206, 16053, 11282, 11215, 11246, 11529, 11333, 11209, 11352,
    11124, 11143, 11147, 11080,
  ],
  [
    11152, 11135, 98938, 11477, 11422, 11206, 16025, 16053, 11282, 11246, 11529,
    11333, 11209, 11352, 11124, 11143, 11147, 11080,
  ],
  [
    11152, 11007, 11135, 11090, 98938, 11477, 11422, 11206, 16025, 11246, 11529,
    11333, 11209, 11352, 11124, 11143, 11147, 11080, 10011457,
  ],
  [
    11152, 11007, 11135, 11090, 98938, 11564, 11422, 16025, 11246, 11333, 11124,
    11143, 11147, 11080, 10011457,
  ],
  [
    11152, 11007, 11135, 11090, 98938, 11564, 16025, 11246, 11124, 11147, 11080,
    10011457,
  ],
];

// 11252->lettuce / 11152->curly endive (escarola) / 11007->artichoke (alcachofa) /
// 11135->cauliflower / ***->cabbage (col) / 11090->broccoli / 98938->romanesco broccoli
// 11564->turnip(nabo) / ***->radish (rabanito) / ->lombarda
// 11477->zucchini (calabacin) / 11422->pumpkin (calabaza) / 11206->cucumber
// 16025->great+northern+beans (parecido a alubias)  / 16053->fava+bean (judía verde) / 11304->peas (guisantes)
// 11282->onion / 11291->spring onion (cebolleta) / 11215->garlic / 11246->leek (puerro)
// 11529->tomatos / 11333->pepper (pimiento verde...) / 11209->eggplant / 11352->potato
// 11124->carrot / 11143->celery (apio) / 11147->chard (acelga) /11080->beetroot (remolacha) / 10011457->spinach (espinaca)

let meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const escribirTituloEspañol = (nombretraducido, variabletitulo) => {
  nombretraducido =
    nombretraducido.charAt(0).toUpperCase() + nombretraducido.slice(1);
  variabletitulo.textContent = nombretraducido;
  return nombretraducido;
};

//le paso elparametro array para que lo llene con los nombres a traducir
const generateCard = (datos, array) => {
  let newcard = document.createElement("DIV");
  //   let newcard = document.createDocumentFragment;
  newcard.classList.add("fruta");
  let newtitle = document.createElement("H1");
  newtitle.classList.add("fruta__title");
  let newcont = document.createElement("DIV");
  newcont.classList.add("fruta__contimg");
  let newimg = document.createElement("IMG");
  newimg.classList.add("fruta__img");
  let newurl = `https://spoonacular.com/cdn/ingredients_250x250/${datos.image}`;
  // console.log(newurl);
  newimg.src = newurl;

  // informacion nutricional
  let nutricion = document.createElement("DIV");
  nutricion.classList.add("fruta__nutricion");
  let nutritit = document.createElement("H3");
  nutritit.textContent = "Información Nutricional";
  let nutri1 = document.createElement("P");
  nutri1.textContent =
    "Carbohidratos: " + datos.nutrition.caloricBreakdown.percentCarbs + "%";
  let nutri2 = document.createElement("P");
  nutri2.textContent =
    "Grasas: " + datos.nutrition.caloricBreakdown.percentFat + "%";
  let nutri3 = document.createElement("P");
  nutri3.textContent =
    "Proteínas: " + datos.nutrition.caloricBreakdown.percentProtein + "%";

  // newtitle.textContent = datos.name;

  //Esto era para generar un array con los nombres en ingles y luego traducirlos con una unica llamada a la API de traduccion, pero por algún motivo no consigo mover la variable array de nombres a traducir.
  // array.push(datos.name);

  // aquí traducimos el nombre del vegetal con la API DEEPL

  let deepl = `https://api-free.deepl.com/v2/translate?auth_key=89d4da4d-291d-51d9-424c-aed675877fea:fx&text=${datos.name}&target_lang=ES`;

  fetch(deepl)
    .then((response) => response.json())
    .then((response) =>
      escribirTituloEspañol(response.translations[0].text, newtitle)
    );

  newcont.appendChild(newimg);
  newcard.appendChild(newtitle);
  newcard.appendChild(newcont);
  nutricion.appendChild(nutri1);
  nutricion.appendChild(nutri2);
  nutricion.appendChild(nutri3);
  newcard.appendChild(nutricion);
  //   BOTóN
  let btn_recetas = document.createElement("BUTTON");
  btn_recetas.classList.add("fruta__boton");
  btn_recetas.id = datos.name;
  // btn_recetas.value = "Recipes with " + datos.name;
  btn_recetas.textContent = "Recipes with " + datos.name;
  newcard.appendChild(btn_recetas);

  //   newcard1.appendChild(newcard);
  frutero.appendChild(newcard);
};
//para crear la EQUIS
// const crearEquis = () => {
//   let newx = document.createElement("DIV");
//   newx.classList.add("equis");
//   newx.id = "equis";
//   let newximg = document.createElement("IMG");
//   newximg.src = "../assets/images/close_icon.png";
//   newx.appendChild(newximg);
//   frutero.appendChild(newx);
//   return newx;
// };

// Para sacar las RECETAS
frutero.addEventListener("click", (evento) => {
  if (evento.target.tagName == "BUTTON") {
    // crearEquis();
    let newx = document.createElement("DIV");
    newx.classList.add("equis");
    newx.id = "equis";
    let newximg = document.createElement("IMG");
    newximg.src = "../assets/images/close_icon.png";
    newx.appendChild(newximg);
    recetero.appendChild(newx);
    let equis = document.getElementById("equis");
    // console.log('botonaso')
    // console.log(evento.target)
    let id = evento.target.id;

    mostrarRecetas(id);

    // para darle funcionalidad a la equis de CERRAR el recetero:
    equis.addEventListener("click", () => {
      recetero.innerHTML = "";
      recetero.classList.remove("receteromostrar");
    });
  }
});

const generateRecetasCard = (datos) => {
  console.log(datos);
  datos.forEach((element) => {
    let receta = document.createElement("DIV");
    receta.classList.add("receta");
    let titreceta = document.createElement("H2");
    titreceta.textContent = element.title;
    let newcont = document.createElement("DIV");
    newcont.classList.add("receta__contimg");
    let newimgreceta = document.createElement("IMG");
    let urlimgreceta = `https://spoonacular.com/recipeImages/${element.id}-312x231.jpg`;
    // console.log(newurl);
    newimgreceta.src = urlimgreceta;
    newimgreceta.classList.add("receta__img");
    let ingredients = document.createElement("H3");
    ingredients.textContent = "Ingredients needed:";
    let list = document.createElement("UL");
    list.classList.add("receta__list");
    newcont.appendChild(newimgreceta);
    receta.appendChild(titreceta);
    receta.appendChild(newcont);
    receta.appendChild(ingredients);

    element.missedIngredients.forEach((ingrediente) => {
      let newingredient = document.createElement("LI");
      newingredient.textContent = ingrediente.name;
      list.appendChild(newingredient);
    });
    receta.appendChild(list);
    recetero.appendChild(receta);
  });
};

const mostrarRecetas = (idingrediente) => {
  recetero.classList.add("receteromostrar");
  // equis.classList.add('equismostrar')
  // console.log(idingrediente)
  let urlrecetas = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${idingrediente}&number=2&sort=random&apiKey=5245dba47c3f4d21b441f4364ff6d43d`;

  //Este ENDPOINT permite una busqueda de recetas más compleja, puedes ordenarlas (por ejemplo con un RANDOM para que cada vez salgan nuevas recetas y tambien puedes incluir preferencias nutricionales como un tope de grasas etc, uso la otra versión del endpoint porque la respuesta entrega más datos y si uso esta, necesitaria hacer otro FETCH con el ID de las recetas que obtenga)
  // let urlrecetas=`https://api.spoonacular.com/recipes/complexSearch?query=${idingrediente}&sort=random&number=2&apiKey=5245dba47c3f4d21b441f4364ff6d43d`

  fetch(urlrecetas)
    .then((response) => response.json())
    .then((response) => generateRecetasCard(response));
};

//LISTENER para el botón de SELECCIONAR TEMPORADA
temporada_select.addEventListener("click", () => {
  //OKEY esto de abajo funciona
  // console.log(mes.value)
  // console.log(meses.indexOf(mes.value))
  frutero.innerHTML = "";
  let v_temporada = calendario[meses.indexOf(mes.value)];

  v_temporada.forEach((element) => {
    let url = `https://api.spoonacular.com/food/ingredients/${element}/information?amount=1&apiKey=5245dba47c3f4d21b441f4364ff6d43d`;
    // console.log(element)

    fetch(url)
      .then((response) => response.json())
      .then((response) => generateCard(response));
  });
});
