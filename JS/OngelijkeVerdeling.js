/* Classes */
    class Player{
        constructor(min,max=0){
            this.naam = getName();
            do{
                if(max == 0){
                    this.aantal = min * getRandom(2,10);
                }
                else{
                    this.aantal = getRandom(min,max);
                }
            }while(players.some(x=>x.aantal == this.aantal));
        }
    }
/* Main */
    let possiblePlayers = ['Juf Emelie','Goran','Bryan','Sam',
    'Yana','Hailie','Anne-Fleur','Anne-Sophie',
    'Selatin','Shelly','Stef','Auke','Tjorven',
    'Marie','Hannah','Dylan','Britt','Olivia'];

    let possibleObjects = ['knikkers','snoepjes','strips','planten',
    'balpennen','potloden','paaseieren','kerstballen','spiekbriefjes'];

    let players = new Array();
    newOefening();

    
/* Methods */
    function newOefening(){
        somethingChanged();
        players = new Array();
        let object = possibleObjects[getRandom(0,possibleObjects.length-1)];

        let difficulty = getDifficulty();
        document.getElementById('niveau').innerHTML = `Deze oefening heeft moeilijkheidsgraad ${difficulty}`;
        addPlayers(difficulty);

        console.log(`Oefening met moeilijkheidsgraad ${difficulty}`);

        showGegeven(difficulty,object);

    }
    function Controleer(){
        somethingChanged();
        let AllesJuist = true;
        for(let i = 0; i<players.length;i++){
            let x = document.getElementById("player"+i);
            let val = x.value;
            if(val == players[i].aantal){
                x.style.color = "green";
            }
            else{
                x.style.color = "red";
                AllesJuist = false;
            }
        }
        let el = document.getElementById('answer')
        if(AllesJuist){
            el.style.cssText = "float: left;text-align: center;color: green";
            el.innerHTML = "Proficiat alles is juist."
        }
        else{            
            el.style.cssText = "float: left;text-align: center;color: red";
            el.innerHTML = "Niet alles is juist, probeer opnieuw."
        }
    }
    function ClearAll(){
        somethingChanged();
        for(let i = 0; i<players.length;i++){
            let x = document.getElementById("player"+i);
            x.value = "";
        }
    }
    function GeefOplossing(){
        somethingChanged();
        for(let i = 0; i<players.length;i++){
            let x = document.getElementById("player"+i);
            x.value = players[i].aantal;
        }
        Controleer();
    }
    function inputChanged(element){
        element.style.color = 'black';
        somethingChanged()
    }
/* Helpers */
    function somethingChanged(){
        let el = document.getElementById('answer');
        el.style.cssText = "height: 0;margin: 0;padding: 0;color: black";
        el.innerHTML = "";        
    }
    function getRandom(min, max){
        return Math.floor(Math.random()*(max+1-min)) + min;
    }
    function getDifference(player1,player2){
        return player1.aantal > player2.aantal ?
            player1.aantal - player2.aantal :
            player2.aantal - player1.aantal;
    }
    function getMeerMinder(player1,player2){
        return player1.aantal > player2.aantal ?
        "meer" : "minder";
    }
    function showGegeven(difficulty,object){        
        let totaal = players.map(p=>p.aantal).reduce((a,b)=>{return a + b;},0);
        let gegeven = `Er zijn in totaal ${totaal} ${object}.`
        gegeven += '<br/>';

        switch(difficulty){
            case '1': //Niveau 1 = Som met 2 namen.
                gegeven += `${players[1].naam} heeft ${players[1].aantal-players[0].aantal} `
                gegeven += `${object} meer dan ${players[0].naam}.`;                
                players = new Array(players[1],players[0]);
                break;
            case '2': //Niveau 2 = Verhouding met 2 namen.
                switch(getRandom(0,1)){
                    case 0:
                        gegeven += `${players[1].naam} heeft ${players[1].aantal/players[0].aantal} `
                        gegeven += `keer meer ${object} dan ${players[0].naam}.`;
                        break;
                    case 1:
                        players.reverse();
                        gegeven += `${players[1].naam} heeft ${players[0].aantal/players[1].aantal} `
                        gegeven += `keer minder ${object} dan ${players[0].naam}.`;
                        break;
                }
                players = new Array(players[1],players[0]);
                break;
            case '3': //Niveau 3 = Som met 3 namen.
                gegeven += `${players[1].naam} heeft ${players[1].aantal-players[0].aantal} `                
                gegeven += `${object} meer dan ${players[0].naam} en`;   
                gegeven += '<br/>';    
                gegeven += `${players[2].naam} heeft ${players[2].aantal-players[0].aantal} `                
                gegeven += `${object} meer dan ${players[0].naam}.`;
                players = new Array(players[1],players[2],players[0]);
                break;
            case '4': //Niveau 4 = Verhouding met 3 namen.
                switch(getRandom(0,1)){
                    case 0: 
                        gegeven += `${players[2].naam} heeft ${players[2].aantal/players[0].aantal} `;
                        gegeven += `keer meer ${object} dan ${players[0].naam} en `;   
                        gegeven += '<br/>';                     
                        gegeven += `${players[1].naam} heeft ${players[1].aantal/players[0].aantal} `;
                        gegeven += `keer meer ${object} dan ${players[0].naam}.`;
                        players = new Array(players[2],players[1],players[0]);
                        break;
                    case 1: 
                        gegeven += `${players[0].naam} heeft ${players[2].aantal/players[0].aantal} `;
                        gegeven += `keer minder ${object} dan ${players[2].naam} en `;
                        gegeven += '<br/>';                        
                        gegeven += `${players[1].aantal/players[0].aantal} `;
                        gegeven += `keer minder ${object} dan ${players[1].naam}.`;
                        players = new Array(players[0],players[2],players[1]);
                        break;
                }
                break;
            case '5': //Niveau 5 = Moelijke som met 3 namen.                
                gegeven += `${players[0].naam} heeft ${getDifference(players[0],players[1])} `                
                gegeven += `${object} ${getMeerMinder(players[0],players[1])} dan ${players[1].naam} en`;   
                gegeven += '<br/>';    
                gegeven += `${players[1].naam} heeft ${getDifference(players[1],players[2])} `                
                gegeven += `${object} ${getMeerMinder(players[1],players[2])} dan ${players[2].naam}.`;
                players = new Array(players[0],players[1],players[2]);
                break;
            case '6': //Niveau 6 = Moeilijke verhouding met 3 namen.
                switch(getRandom(0,1)){
                    case 0: 
                        gegeven += `${players[2].naam} heeft ${players[2].aantal/players[0].aantal} `;
                        gegeven += `keer meer ${object} dan ${players[0].naam} en `;   
                        gegeven += '<br/>';                     
                        gegeven += `${players[0].naam} heeft ${players[1].aantal/players[0].aantal} `;
                        gegeven += `keer minder ${object} dan ${players[1].naam}.`;
                        players = new Array(players[2],players[0],players[1]);
                        break;
                    case 1: 
                        gegeven += `${players[0].naam} heeft ${players[2].aantal/players[0].aantal} `;
                        gegeven += `keer minder ${object} dan ${players[2].naam} en `;
                        gegeven += '<br/>';                        
                        gegeven += `${players[1].naam} heeft ${players[1].aantal/players[0].aantal} `;
                        gegeven += `keer meer ${object} dan ${players[0].naam}.`;
                        players = new Array(players[0],players[2],players[1]);
                        break;
                }
                break;
        }
        gegeven += '<br/>';
        gegeven += `Hoeveel ${object} hebben ze elk?`;
        console.log(gegeven.replace(/<br\/>/g,'\n'));
        console.log(players);

        document.getElementById('gegeven').innerHTML = gegeven;
        let opl = document.getElementById('solution');
        opl.innerHTML = '';
        for(let i = 0; i < players.length; i++){
            opl.innerHTML += `<label>${players[i].naam}` +
            `<input id="player${i}" type="number" oninput="inputChanged(this)"></label><br/>`;
        }
        console.log(opl.innerHTML);
    }
    function addPlayers(difficulty){
        switch(difficulty){
            case '1': //Niveau 1 = Som met 2 namen.
                players.push(new Player(1,500));
                players.push(new Player(1,500));
                players.sort((a,b)=>(a.aantal>b.aantal ? 1 : -1));
                break;
            case '2': //Niveau 2 = Verhouding met 2 namen.            
                players.push(new Player(1,90));
                players.push(new Player(players[0].aantal));
                break;
            case '3': //Niveau 3 = Som met 3 namen.
                players.push(new Player(1,333));
                players.push(new Player(1,333));
                players.push(new Player(1,333));
                players.sort((a,b)=>(a.aantal>b.aantal ? 1 : -1));
                break;
            case '4': //Niveau 4 = Verhouding met 3 namen.            
                players.push(new Player(1,45));
                players.push(new Player(players[0].aantal));
                players.push(new Player(players[0].aantal));
                break;
            case '5': //Niveau 5 = Som met 3 namen.
                players.push(new Player(1,333));
                players.push(new Player(1,333));
                players.push(new Player(1,333));
                break;
            case '6': //Niveau 4 = Verhouding met 3 namen.            
                players.push(new Player(1,45));
                players.push(new Player(players[0].aantal));
                players.push(new Player(players[0].aantal));
                break;
        }
    }
    function getName(){
        let nameAdded = false;
        do{
            let rnd = getRandom(0,possiblePlayers.length-1);
            if(!players.some(x=>x.naam === possiblePlayers[rnd])){
                return possiblePlayers[rnd];
            }
        }while(!nameAdded)
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
            labels[0]['checked'] = true;
        }

        return mogelijkseNiveaux[getRandom(0,mogelijkseNiveaux.length-1)];
    }