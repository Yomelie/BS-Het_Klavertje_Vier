let hoekA; let hoekB; let hoekC;
let driehoek;
newOefening();

function newOefening(){    
    somethingChanged();
    let el = document.getElementsByClassName('hoek');
    for(let i = 0; i < el.length; i++){
        el[i].style.color = 'black';
    }
    el = document.getElementsByClassName('zijde');
    for(let i = 0; i < el.length; i++){
        el[i].style.color = 'black';
    }
    document.getElementById('rrecht').checked = true;
    document.getElementById('rongelijk').checked = true;
    makeTriangle();
}
function Controleer(){
    let el = document.getElementById('answer');
    if(el.innerHTML == 'Hier is de oplossing.' || 
    el.innerHTML == 'Elaba, niet zeuren.')
    {
        el.innerHTML = 'Elaba, niet zeuren.';
        el.style.color = 'red';
    }else{
        somethingChanged();
        let allesJuist = true;
        allesJuist = checkRadio('recht',driehoek.hoek,allesJuist);
        allesJuist = checkRadio('scherp',driehoek.hoek,allesJuist);
        allesJuist = checkRadio('stomp',driehoek.hoek,allesJuist);
        allesJuist = checkRadio('gelijk',driehoek.zijde,allesJuist);
        allesJuist = checkRadio('benig',driehoek.zijde,allesJuist);
        allesJuist = checkRadio('ongelijk',driehoek.zijde,allesJuist);

        if(allesJuist){
            el.style.cssText = "float: left;text-align: center;color: green";
            el.innerHTML = "Proficiat alles is juist."
        }
        else{            
            el.style.cssText = "float: left;text-align: center;color: red";
            el.innerHTML = "Niet alles is juist, probeer opnieuw."
        }
    }
}

function GeefOplossing(){
    somethingChanged();
    document.getElementById('r'+driehoek.hoek).checked = true;
    document.getElementById('r'+driehoek.zijde).checked = true;
    Controleer();
    let el = document.getElementById('answer').innerHTML = 'Hier is de oplossing.';
}
function inputChanged(element){
    let el = document.getElementsByClassName(element.name);
    for(let i = 0; i < el.length; i++){
        el[i].style.color = 'black';
    }
    somethingChanged();
}
function somethingChanged(){
    let el = document.getElementById('answer');
    el.style.cssText = "height: 0;margin: 0;padding: 0;color: black";
    el.innerHTML = "";      
}
function checkRadio(el,val,allesJuist){
    el = document.getElementById('r'+el);
    if(el.checked && el.value == val){
        document.getElementById('l'+ el.value).style.color = 'green';
    }
    else if(el.checked && el.value != val){
        document.getElementById('l'+ el.value).style.color = 'red';
        allesJuist = false;
    }
    else{
        document.getElementById('l'+ el.value).style.color = 'black';
    }
    return allesJuist;
}

function makeTriangle(){
    console.clear();
    // Gegevens
    let cv = document.getElementById('canvas')
    cv.height = cv.width;
    let width = cv.getBoundingClientRect().width;
    let mWidth = cv.width/width;
    let height = cv.getBoundingClientRect().height;
    let mHeight = cv.height/height;
    /*let width = 100;
    let height = 100;
    let mWidth = 1;
    let mHeight = 1;*/

    console.log({w: width, h: height}); 

    var minHoek = 20;
    var minVerschil = 10;
    var padding = 5;
    let gelijkzijdig = false;

    switch (getRandom(0,6)) {
        case 0: //Recht
        case 1:
            hoekA = 90;
            break;        
        case 2: // Scherp
        case 3:
        case 4:
            if(getRandom(0,3) == 0){
                gelijkzijdig = true;
                hoekA = 60;
                hoekB = 60;
                hoekC = 60;
            }
            else{                    
            hoekA = getRandom(minHoek*2,90-minVerschil);
            }
            break;
        case 5: // Stomp
        case 6:
            hoekA = getRandom(90+minVerschil,180-minHoek*2-minVerschil);
            break;
    }
    if(gelijkzijdig == false){
        switch(getRandom(0,1)){
            case 0: // Ongelijk
                do{
                    hoekB = getRandom(minHoek,(90-minVerschil) < (180-minHoek-hoekA-minVerschil) ? (90-minVerschil):(180-minHoek-hoekA-minVerschil));
                    hoekC = 180-hoekA-hoekB;
                }while(hoekA+hoekB < 90+minVerschil || hoekA+hoekB > 180-minHoek
                    || (hoekB-hoekC < minVerschil && hoekB-hoekC > -minVerschil));
                break;
            case 1: // Gelijk
                hoekB = (180-hoekA)/2;
                hoekC = hoekB;
                break;
        }

        if(hoekA == 90){
            driehoek = {hoek: 'recht', zijde: hoekB==hoekC?'benig':'ongelijk'};
        }
        else if(hoekA < 90){
            driehoek = {hoek: 'scherp', zijde: hoekB==hoekC?'benig':'ongelijk'};
        }
        else{
            driehoek = {hoek: 'stomp', zijde: hoekB==hoekC?'benig':'ongelijk'};
        }  
    }
    else{
        driehoek = {hoek: 'scherp', zijde: 'gelijk'};
    }
        console.log(driehoek);
        
    let hoeken = [hoekA,hoekB,hoekC];
    hoeken = hoeken.sort(function(a,b){ return a>b?-1:1});
    hoekA = hoeken[0];
    hoekB = hoeken[1];
    hoekC = hoeken[2];
    
    let x1; let x2;
    let y1; let y2;
    let x; let y; let b;
    let i; let ix; let iy;
    switch(getRandom(0,3)){
        case 0:
            x1 = 0 + padding;
            y1 = 0 + padding;
            x2 = width - padding;
            y2 = height - padding;
            i = -1;
            ix = 1; iy = 1;
            break;
        case 1:
            x2 = 0 + padding;
            y2 = 0 + padding;
            x1 = width - padding;
            y1 = height - padding;
            i = -1;
            ix = -1; iy = -1;
            break;
        case 2:
            x1 = 0 + padding;
            y2 = 0 + padding;
            x2 = width - padding;
            y1 = height - padding;
            i = -1;
            ix = 1; iy = -1;
            break;
        case 3:
            x2 = 0 + padding;
            y1 = 0 + padding;
            x1 = width - padding;
            y2 = height - padding;
            i = -1;
            ix = -1; iy = 1;
            break;
    }
    


    let eindpunt; let deltaX;let deltaY;
    let zijdeA; let zijdeB; let grA;
        console.log({A: hoekA, B: hoekB, C: hoekC});
    do{        
        ++i;
        // Extra's
        x = Math.max(x1,x2) - Math.min(x1,x2);
        y = Math.max(y1,y2) - Math.min(y1,y2) - i;
        // berekenen lengte zijde 1    
        zijdeA = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        // berekenen lengte zijde 2
        zijdeB = (zijdeA * Math.sin(degToRads(hoekC))
            / Math.sin(degToRads(hoekA)));
        // berekenen hoek langste zijde t.o.v. grafiek
        grA = radsToDeg(Math.atan(y/x));
        b = hoekB-grA;
        // berekenen delta x ten opzichte van eindepunt zijdeA
        deltaX = Math.floor(Math.cos(degToRads(b)) * zijdeB);
        // berekenen delta y ten opzichte van eindepunt zijdeA
        deltaY = Math.floor(Math.sin(degToRads(b)) * zijdeB);

        eindpunt = {x: x2-(deltaX * ix), y: y2+((deltaY-i)*iy)};

        if(i > (Math.max(y1,y2) - Math.min(y1,y2))){
            return;
        }
    }while(eindpunt.x < Math.min(x1,x2) || eindpunt.x > Math.max(x1,x2) 
        || eindpunt.y < Math.min(y1,y2) || eindpunt.y > Math.max(y1,y2));
    console.log(eindpunt);
    // teken driehoek
    let canvas = document.querySelector('canvas');
    let c = canvas.getContext('2d'); 

    console.log({x1: x1*mWidth, y1: y1*mHeight});
    console.log({x2: x2*mWidth, y2: (y2-(i*iy))*mHeight});
    console.log({x3: eindpunt.x*mWidth, y3: eindpunt.y*mHeight});
    c.lineWidth = 5;
    c.clearRect(0,0,width*mWidth,height*mHeight);
    c.beginPath();
    c.moveTo(x1*mWidth,y1*mHeight);
    c.lineTo(x2*mWidth,(y2-(i*iy))*mHeight);
    c.lineTo(eindpunt.x*mWidth,eindpunt.y*mHeight);
    c.lineTo(x1*mWidth,y1*mHeight);
    c.stroke();
    console.log();
}


 

/* helpers */
function degToRads(degree){
    return degree * Math.PI/180;
}
function radsToDeg(radian){
    return radian*180/Math.PI;
}
function getRandom(min, max){
    return Math.floor(Math.random()*(max+1-min)) + min;
}