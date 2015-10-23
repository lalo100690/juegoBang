function splashscreen(){
    setTimeout(function(){
            window.location.assign('menu.html');
            }, 3000)
}

function navegar(url, puntos){
    localStorage.setItem('puntos', puntos);
    window.location.assign(url);   
}

function animacion(){
    //COMENZAR EL CONTEO
    conteo();
    //DESLIZAR ESCENARIO
    setTimeout(function(){
        document.getElementById('bg').style.top="-100%"
        document.getElementById('escenario').style.top="0%"
    }, 2000);
    //CARGAR FOTOS DE FACEBOOK
    document.getElementById('img-fbid1').src="http://graph.facebook.com/"+localStorage.getItem('fbid1')+"/picture?type=normal";
    document.getElementById('img-fbid2').src="http://graph.facebook.com/"+localStorage.getItem('fbid2')+"/picture?type=normal";
    puntos = localStorage.getItem('puntos');
}

var disparoEfectuado = "no";
var puntosP1 = 0;
var puntosP2 = 0;
var disparoPermitido = "no";

function disparo(jugador){
    
    document.getElementById('audio').play();
    document.getElementById('grito').play();
    
    if(disparoPermitido == "no"){
        navigator.vibrate(300);
        navigator.vibrate(300);
        if(jugador == "p1"){
            document.getElementById('vaquero-p1').src="v1.png"; 
            document.getElementById('p1').removeAttribute("onclick");
        }else{
            document.getElementById('vaquero-p2').src="v1.png";
            document.getElementById('p2').removeAttribute("onclick");
        }
    }
    
    if(disparoEfectuado == "no" && disparoPermitido == "si"){
        if(jugador == "p1"){
            puntosP1++;
            document.getElementById('resultados-p1').innerHTML+="<span>X</span>"
            //MATAR A P2
            //cambiar p1 a disparo
            document.getElementById('vaquero-p1').src="v1.png";
            //cambiar p2 a muerto
            document.getElementById('vaquero-p2').src="v3.png";
        }else{
            puntosP2++;
            document.getElementById('resultados-p2').innerHTML+="<span>X</span>"
            //MATAR A P1
            //cambiar p1 a disparo
            document.getElementById('vaquero-p2').src="v1.png";
            //cambiar p2 a muerto
            document.getElementById('vaquero-p1').src="v3.png";
        }
        disparoEfectuado = "si";
        document.getElementById('mensaje').style.transition=".4s all";
        document.getElementById('mensaje').style.visibility="visible";
        document.getElementById('mensaje').style.opacity="1";
        document.getElementById('mensaje').style.webkitTransform="scale(1)";
    }
    
    if(puntosP1==localStorage.getItem('puntos')){
        //EL JUEGO TERMINÓ, GANO p1
        document.getElementById('game-over').style.transition=".4s all";
        document.getElementById('game-over').style.visibility="visible";
        document.getElementById('game-over').style.opacity="1";
        document.getElementById('game-over').style.webkitTransform="scale(1)";
        document.getElementById('game-over').innerHTML="GAME OVER<br>Gano el Jugador 1"
        //DESAPARECER MENSAJE DE LISTO
        document.getElementById('mensaje').style.visibility="hidden";        
    }
    
    if(puntosP2==localStorage.getItem('puntos')){
        //EL JUEGO TERMINÓ, GANO p2
        document.getElementById('game-over').style.transition=".4s all";
        document.getElementById('game-over').style.visibility="visible";
        document.getElementById('game-over').style.opacity="1";
        document.getElementById('game-over').style.webkitTransform="scale(1)";
        document.getElementById('game-over').innerHTML="GAME OVER<br>Gano el Jugador 2"
        //DESAPARECER MENSAJE DE LISTO
        document.getElementById('mensaje').style.visibility="hidden";
    }
}

function comenzar(){
    fbid1 = document.getElementById('fbid1').value;
    fbid2 = document.getElementById('fbid2').value;
    localStorage.setItem('fbid1', fbid1);
    localStorage.setItem('fbid2', fbid2);
    window.location.assign('escenario.html');
}

function reestablecer(){
    //QUITAR MENSAJE
    document.getElementById('mensaje').style.transition=".4s all";
    document.getElementById('mensaje').style.visibility="hidden";
    document.getElementById('mensaje').style.opacity="0";
    document.getElementById('mensaje').style.webkitTransform="scale(.4)";
    //REESTABLECER IMAGEN DE LOS VAQUEROS
    document.getElementById('vaquero-p1').src="v2.png";
    document.getElementById('vaquero-p2').src="v2.png";
    
    //REESTABLECER EL ONCLICK
    document.getElementById('p1').setAttribute("onclick", "disparo('p1')")   
    document.getElementById('p2').setAttribute("onclick", "disparo('p2')")
    
    //REESTABLECER CONTEO
    conteo()
    
    //REESTABLECE LOS DISPAROS
    disparoEfectuado = "no";
    disparoPermitido = "no";
}

function volverAJugar(){
    window.location.assign('menu.html');
}

function conteo(){
    setTimeout(function(){
        //APARECER EL MENSAJE DE CONTEO
        document.getElementById('conteo').style.transition=".3s all";
        document.getElementById('conteo').style.visibility="visible";
        document.getElementById('conteo').style.opacity = "1";
        document.getElementById('conteo').style.marginLeft="-50%";
        //CAMBIAR EL TEXTO CADA SEGUNDO
        setTimeout(function(){
            //MENSAJE 3 SEGUNDOS
            document.getElementById('conteo').innerHTML="3";
            document.getElementById('audio').play();
            setTimeout(function(){
                //MENSAJE 2 SEGUNDOS
                document.getElementById('conteo').innerHTML = "2";
                document.getElementById('audio').play();
                setTimeout(function(){
                    //MENSAJE 1 SEGUNDO
                    document.getElementById('conteo').innerHTML = "1";
                    document.getElementById('audio').play();
                    tiempoRandom = Math.floor((Math.random() * 10) +1);
                    tiempoRandom = tiempoRandom + "000";
                    //MENSAJE DE TIEMPO RANDOM
                    setTimeout(function(){
                        document.getElementById('conteo').innerHTML = "YA!";
                        document.getElementById('audio').play();
                        setTimeout(function(){
                            document.getElementById('conteo').style.transition=".3s all";                                 document.getElementById('conteo').style.visibility="hidden";
                            document.getElementById('conteo').style.opacity = "0";
                            document.getElementById('conteo').style.marginLeft="-50%";
                            document.getElementById('conteo').innerHTML = "";
                            //DISPARO PERMITIDO
                            disparoPermitido = "si";
                        },100);
                    },tiempoRandom)

                },1000)
            },1000)
        },1000); 
    },5000);
}






