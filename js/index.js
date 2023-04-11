window.onload=inici;

var imagenes=["chupachups","fotografia","gorra","llavero","maquineta","moneda","tenedor_lapiz"];
var casa=[];
var dinero=0;
var premio="";
var cantidad=imagenes.length;
var activado=false;


//funcio on van tots els events que es produeixen a l'iniciar la pàgina
function inici(){       
    document.getElementById("lanzar").onclick=tirar; 
    for(let x=0;x<document.querySelectorAll(".boton").length;x++){
        document.querySelectorAll(".boton")[x].onclick=volver_tirar;
    }
    aleatorio_monedas();
    mp3=document.getElementById("audio");
}

//funció per extreure números aleatòriament entre un mínim i un màxim per donar un valor inicial de crèdit
function aleatorio_monedas(){
    var credito= Math.floor(Math.random()*(20-10)+10);
    document.getElementById("dinero").innerHTML=`${credito}<span class="euros">€</span>`;
    dinero=credito;
    console.log(credito);
   
    actualizar_monedas(); 
}

//funció per extreure un número aleatori que serà utilitzat pel valor del premi
function aleatorio_premio(){
    var p=Math.floor(Math.random()*(5-1)+1);
    premio=p;
    console.log(p);
}

//funció per mostrar les 3 imatges que aniran jugant en cada tirada. Aquestes s'extreuen aleatòriament
function tirar(){
    activado=true;  
    for(x=0;x<document.getElementsByClassName("ventana").length;x++){
        r=Math.floor(Math.random()*cantidad);
        //casa.push(r);
        casa[x]=r;
        console.log(casa);
        document.getElementsByClassName("ventana")[x].innerHTML=""; 
        document.getElementsByClassName("ventana")[x].innerHTML=`<img src="img/${imagenes[r]}.png">`;             
    }
    comparar();
    mp3.src="audios/lanzar.mp3";
    mp3.play();
    menos_monedas();      
}

//funció per tirar des dels botons de sota cada imatge individualment
function volver_tirar(){
    if(activado==true){
    console.log(this);
    r=Math.floor(Math.random()*cantidad);
    
    let botones=this.parentNode.parentNode.querySelectorAll(".botones .boton");
    console.log(botones);
    for(x=0;x<botones.length;x++){
        if(this==botones[x]){
            this.parentNode.parentNode.querySelectorAll(".ventanas .ventana img")[x].src=`img/${imagenes[r]}.png `;
            console.log(x);
            casa[x]=r;          
            mp3.src="audios/otra.wav";
            mp3.play();
        }
        comparar();       
    } 
    menos_monedas();
    } 
}

//funció on comparem si totes les imatges coincideixen per poder mostrar el premi
function comparar(){
    if(casa[0]==casa[1] && casa[1]==casa[2]){
        document.getElementById("velo").style.display="flex";
        mp3.src="audios/ganar.mp3";
        mp3.play();
        aleatorio_premio();
        document.getElementById("mensaje").innerHTML=`<h3>Genial, has ganado ${premio} monedas</h3>`;
        document.getElementById("cruz").onclick=sumar_monedas;    
    }
}

//funció on suma el valor del premi al crèdit que tenim
function sumar_monedas(){
    document.getElementById("velo").style.display="none";
    mp3.src="audios/florirflorir.mp3";
    mp3.play();
    dinero= dinero+premio ;
    document.getElementById("dinero").innerHTML=`${dinero}<span>€</span>`;
    console.log(dinero);
    actualizar_monedas();
    activado=false;
}

//funció per restar el crèdit que tenim cada cop que fem una tirada.
function menos_monedas(){
    --dinero;
    console.log(dinero);
    document.getElementById("dinero").innerHTML=`${dinero}<span>€</span>`; 
    actualizar_monedas();  
    if(dinero==0){
        mp3.src="audios/final.mp3";
        mp3.play();
        document.getElementById("lanzar").onclick=null;
        document.getElementById("velo").style.display="flex";
        document.getElementById("mensaje").innerHTML=`<h3>Fin de la partida!!!</3>`;
        document.getElementById("cruz").onclick=cerrar_ventana;
        activado=false;
    }    
} 


//funció per actualitzar les monedes
function actualizar_monedas(){
    document.getElementById("monedas").innerHTML="";
    for(let x=0;x<dinero;x++){
        document.getElementById("monedas").innerHTML+=`<img src="img/moneda.png">`;    
    }
}

function cerrar_ventana(){
    document.getElementById("velo").style.display="none";
}


