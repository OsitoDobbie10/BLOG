const slider = document.querySelector("#slider");
//variable este elemento va a cambiar ya que llamara el selector de cada una de las imagenes
let slidersection = document.querySelectorAll(".slider_section");
//obtener el ultimo elemeto de los sections usando length  
let slider_sectionlast = slidersection[slidersection.length -1];
//llamar los botones de la derecha e izquierda a travez de su id
const btnleft = document.querySelector("#btn--left");
const btnright = document.querySelector("#btn--right") ;
//seleccionar el ultimo elemeto y ponerlo en el slider como el primero 
//usando la funcion insertAdjacentElement 
slider.insertAdjacentElement('afterbegin', slider_sectionlast) ;
//funcion para el boton de avanzar las imagenes 
//boton derecha
function next(){
    //variable que seleccionara de los elemetos el primero 
    let slidersectionfirst = document.querySelectorAll(".slider_section")[0];
    //variables que toman un estilo para que se mueva 
    slider.style.marginleft = "-200%";
    //generar animacion al moverse 
    slider.style.transition = "all 0.4s";
    //funcion para hacer el cambio de elementos en paralelo 
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', slidersectionfirst); 
        slider.style.marginleft = "-100%" 
    },400);
}

//boton de la izquierda 
function preview(){
    //variable que seleccionara de los elemetos el primero 
    //declaramos las funciones de todos los elementos y llamos al ultimo 
    //elemento ya que el ultimo sera le primero
    let slidersection = document.querySelectorAll(".slider_section");
    let slider_sectionlast = slidersection[slidersection.length -1];
    //variables que toman un estilo para que se mueva 
    slider.style.marginleft = "0";
    //generar animacion al moverse 
    slider.style.transition = "all 0.4s";
    //funcion para hacer el cambio de elementos en paralelo 
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin', slider_sectionlast); 
        slider.style.marginleft = "-100%" 
    },400);
}
//que la funcion btnright detecte mediante el evento click la funcion que se esta ejecutando
btnright.addEventListener('click',function(){
    next();
  });
//que la funcion btnright detecte mediante el evento click la funcion que se esta ejecutando
btnleft.addEventListener('click',function(){
    preview(); 
}); 