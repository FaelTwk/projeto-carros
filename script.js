var result = document.getElementById("result");
var btns = document.getElementsByClassName("btn");
var reset = document.getElementById("resetar");
var acelerar = document.getElementById("acelerar");
var desacelerar = document.getElementById("desacelerar");
var car_red = document.getElementById("red");
var car_white = document.getElementById("white");
var btn_circle_1 = document.getElementById("branco");
var btn_circle_2 = document.getElementById("vermelho");
var carroSelecionado = null;

// Função para selecionar o carro
function selecioneCarro (color) {
    if (color === "vermelho") {
        carroSelecionado = car_red;
        result.textContent = "Vermelho";
        document.body.style.backgroundColor = "red";
        document.body.style.color = "black";
    } else if (color === "branco") {
        carroSelecionado = car_white;
        result.textContent = "Branco";
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }

    for (i = 0; i <= 2; i++) {
        btns[i].style.display = "block";
    }
}

btn_circle_1.addEventListener("click", function() {
    selecioneCarro("branco");
});

car_white.addEventListener("click", function() {
    selecioneCarro("branco");
});

btn_circle_2.addEventListener("click", function() {
    selecioneCarro("vermelho");
});

car_red.addEventListener("click", function() {
    selecioneCarro("vermelho");
});

// Função para resetar as configurações da página
function resetParam(){
    result.textContent = "?"
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    carroSelecionado = null;
    car_white.style.left = "205px";
    car_white.style.top = "60px";
    car_white.style.width = "50px";
    car_white.style.height = "50px";
    car_red.style.right = "205px";
    car_red.style.top = "60px";
    car_red.style.width = "50px";
    car_red.style.height = "50px";

    for(i = 0; i <= 2; i++){
    btns[i].style.display = "none"
    console.log(i)
    }
}

reset.addEventListener("click", resetParam);

// Função do botão de acelerar e desacelerar
function acelerarfun(){
    if (!carroSelecionado) {
        alert("Selecione um carro primeiro!");
        return;
    }
    var top = parseInt(window.getComputedStyle(carroSelecionado).top);
    top = top - 1;
    if(top <= 2){
        top = 2;
    }
    carroSelecionado.style.top = top + "px";

    // Calcula a escala: De 1 (top: 60) para 0.5 (top: 2)
    var scale = 1 - (60 - top) / 58 * 0.5;
    if(scale < 0.5) scale = 0.5;
    carroSelecionado.style.width = (50 * scale) + "px";
    carroSelecionado.style.height = (50 * scale) + "px";

    if (carroSelecionado === car_red) {
        var right = parseInt(window.getComputedStyle(carroSelecionado).right);
        right = right + 1; 
        
        
        if(right >= 238){ 
            right = 238;
        }
        carroSelecionado.style.right = right + "px";

    } else if (carroSelecionado === car_white) {
        var left = parseInt(window.getComputedStyle(carroSelecionado).left);
        left = left + 1; 
    
        // Limite distante
        if(left >= 238){
            left = 238;
        }
        carroSelecionado.style.left = left + "px";
    }
}

acelerar.addEventListener("onPress", acelerarfun);

function desacelerarfun(){
    if (!carroSelecionado) {
        alert("Selecione um carro primeiro!");
        return;
    }
    var top = parseInt(window.getComputedStyle(carroSelecionado).top);
    top = top + 1; 
    if(top >= 60){
        top = 60;
    }
    carroSelecionado.style.top = top + "px";

    // Calcula a escala (mesma fórmula)
    var scale = 1 - (60 - top) / 58 * 0.5;
    if(scale > 1) scale = 1; 
    carroSelecionado.style.width = (50 * scale) + "px";
    carroSelecionado.style.height = (50 * scale) + "px";

    if (carroSelecionado === car_red) {
        var right = parseInt(window.getComputedStyle(carroSelecionado).right);
        right = right - 1; 
        
        
        if(right <= 205){
            right = 205;
        }
        carroSelecionado.style.right = right + "px";

    } else if (carroSelecionado === car_white) {
        var left = parseInt(window.getComputedStyle(carroSelecionado).left);
        left = left - 1; 
        
        // Limite próximo (posição inicial)
        if(left <= 205){ 
            left = 205;
        }
        carroSelecionado.style.left = left + "px";
    }
}

desacelerar.addEventListener("click", desacelerarfun);

document.addEventListener("keydown", function(event){
    if(event.key === "ArrowUp"){
        acelerarfun();
    }
    else if(event.key === "ArrowDown"){
        desacelerarfun();
    }
});