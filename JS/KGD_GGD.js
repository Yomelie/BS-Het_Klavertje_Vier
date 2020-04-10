/* Main */
    var max = 100;
    let antwoord = 0;
    newOefening();

/* Methods */
    function newOefening(){

        somethingChanged();
        let difficulty = getDifficulty();
        showGegeven(difficulty);
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
            let x = document.getElementById("inputAnswer");
            let val = x.value;

            if(val == antwoord){
                x.style.color = "green";
                el.style.cssText = "float: left;text-align: center;color: green";
                el.innerHTML = "Proficiat, jouw antwoord is correct."
            }
            else{
                x.style.color = "red";
                AllesJuist = false;
                el.style.cssText = "float: left;text-align: center;color: red";
                el.innerHTML = "Jouw antwoord is niet correct, probeer opnieuw."
            }}
    }
    function ClearAll(){
        somethingChanged();
        let x = document.getElementById("inputAnswer");
        x.value = "";
    }
    function GeefOplossing(){
        let el = document.getElementById('answer');
        somethingChanged();
        let x = document.getElementById("inputAnswer");
        x.value = antwoord;
        Controleer();
        el.innerHTML = 'Hier is de oplossing.';
    }
    function inputChanged(element){
        element.style.color = 'black';
        somethingChanged()
    }
/* Helpers */
    function showGegeven(difficulty){
        let getal1 = 0;
        let getal2 = 0;
        let gegeven = '';
        switch(difficulty){
            case '1': //KGV
                do{
                    getal1 = getRandom(2,Math.floor(max/8));
                    getal2 = getRandom(2,Math.floor(max/8));
                }while(!getKGV(getal1,getal2))
                gegeven = "Wat is het kleinst gemeenschappelijk veelvoud van "+getal1+" en "+getal2+"?";
                break;
            case '2': //GGD  
                do{
                    getal1 = getRandom(2,max);
                    getal2 = getRandom(2,max);
                }while(!getGGD(getal1,getal2))
                gegeven = "Wat is de grootste gemeenschappelijke deler van "+ getal1+" en "+getal2+"?";
                break;
        }
        console.log(antwoord);        
        document.getElementById('gegeven').innerHTML = gegeven;
        let opl = document.getElementById('solution');
        opl.innerHTML = "<label>Antwoord:<input id='inputAnswer' type='number' oninput='inputChanged(this)'></label><br/>";
    }

    function getKGV(getal1,getal2){
        if(getal1 != getal2){
            let min = Math.min(getal1,getal2);            
            getal2 = getal2 == min?getal1:getal2;
            getal1 = min;
            for(let i = 1; i<getal1;i++){                
                if(getal2*i>max){
                    break;
                }
                for(let j = 1; j<getal1;j++){
                    if(getal1*j>max){
                        break;
                    }
                    if(getal1*j==getal2*i){
                        antwoord = getal1*j;
                        if(antwoord/getal1 == 2 || antwoord/getal2 == 2
                            || antwoord/getal1 == 1 || antwoord/getal2 == 1){
                            return false;
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    }
    function getGGD(getal1,getal2){        
        if(getal1 != getal2){
            for(let i = 2; i<=Math.min(getal1,getal2);i++){
                if(getal1%i == 0 && getal2%i == 0){
                    antwoord = i;
                    if(antwoord == 1 || antwoord == 2){
                        return false;
                    }
                    return true;
                }
            }
        }        
        return false;
    }
    function getDifficulty(){
        let labels = document.getElementsByName('niveaux');

        let mogelijkseNiveaux = new Array();
        for(let i = 0; i < labels.length; i++){
            if(labels[i]['checked']){
                mogelijkseNiveaux.push(labels[i]['value']);
            }
        }

        if(mogelijkseNiveaux.length == 0){
            mogelijkseNiveaux.push(labels[0]['value']);
            mogelijkseNiveaux.push(labels[1]['value']);
            labels[0]['checked'] = true;
            labels[1]['checked'] = true;
        }

        return mogelijkseNiveaux[getRandom(0,mogelijkseNiveaux.length-1)];
    }
    function somethingChanged(){
        let el = document.getElementById('answer');
        el.style.cssText = "height: 0;margin: 0;padding: 0;color: black";
        el.innerHTML = "";        
    }
    function getRandom(min, max){
        return Math.floor(Math.random()*(max+1-min)) + min;
    }