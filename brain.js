var tab=[];
var jogando=true;
let jogo={matchState: 'NONE'}
let winnerLogic =[
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]]

const checkWinner = () => {
    const size = winnerLogic.length - 1
    for (let res of winnerLogic) {
        let a = ''
        res.map((res2) => {
            if(tab[res2-1].filled){
                a = a + tab[res2-1].whoPlayed
            }            
        })
        if(a ==='OOO' || a === 'XXX') {
            document.getElementById('dvjogo').setAttribute("style", "pointer-events:none;")
            let winner = (a === 'OOO') ? "Xiiii perdeu playboy! hahaha" : "Você ganhou dessa vez, mas da próxima ganho eu" 
            alert(winner)
            return true
        }
    }
    let i = 0
    tab.map((pos) => {
        if(pos.filled) i++
    })
    if(i === tab.length) alert("Ninguem ganhou")
    console.log("Resultado: "+i)
    
}


//primeira function chamada - popula o tabuleiro e inicializa o tab(props)
const populateTab = () => {
    for (var i=1; i<10; i++){
        tab.push({
                        id: i, 
                        pos:document.getElementById(i),
                        filled: false,
                        whoPlayed: ''                                
                        })
    }
    if(jogo.matchState === 'NONE') document.getElementById('dvjogo').setAttribute("style", "pointer-events:none;")
}

//Controle do button Start
const startButton = (i) => {
    //limpa a partida partida
    if(i){
        tab.map((a => {
            a.filled = false,
            a.whoPlayed = '',
            document.getElementById((a.id).toString()).innerHTML = ""
        }))
    }

    //define quem joga primeiro
    if(jogo.matchState === 'NONE' || i){
        const ins = Math.floor((Math.random() * 2)+1)
        if (ins === 1 ) {
            //Maquina comeca
            document.getElementById('dvQuemComeca').innerHTML = 'Já comecei, agora é sua vez'
            computerTurn()                
        }else{
            //player comeca
            document.getElementById('dvQuemComeca').innerHTML = 'Você Começa'

        }                
        jogo.matchState = 'STARTED'
        console.log(jogo.matchState)
        document.getElementById("btn").innerHTML = "Reiniciar Jogo"
        document.getElementById('dvjogo').setAttribute("style", "")
        document.getElementById("btn").value="REINICIA"
    }
}


// controla as funcoes do jogador
const palyerTurn = (p) => {
    let pos = {id:0, whoPlayed:''}
    const a = tab.map((resultado) => {                
        if (p === resultado.id.toString() && !resultado.filled) {
            pos.id = resultado.id
            resultado.filled = true
            pos.whoPlayed = resultado.whoPlayed = 'X'
            document.getElementById(pos.id).innerHTML = pos.whoPlayed
            
            if(!checkWinner()) computerTurn()
        }
    })
}

// Controla as acoes do computador
const computerTurn = () => { 
    let pos
    let a = false //usado para criar um loop infinito ate o match
    let countFilled = 0 
    let lastPosition = 0
    
    const lastPos = tab.map((res) => {
        if (!tab[(res.id -1).toString()].filled) {
            countFilled++
            lastPosition = res.id
        }
    })
    
    console.log(tab)
    
    if (countFilled >= 1) {
        while (!a) {
            pos = Math.floor((Math.random() * tab.length) + 1)
            if (!this.tab[(pos - 1).toString()].filled) {
                this.tab[(pos - 1).toString()].filled = true
                this.tab[(pos - 1).toString()].whoPlayed = 'O'
                document.getElementById(pos.toString()).innerHTML = 'O'
                a = true
            }
        }
    }else{
        // this.tab[lastPosition.toString()].filled = true
        // document.getElementById((lastPosition+1).toString()).innerHTML = 'O'
        console.log(lastPosition)
    }
    checkWinner()
}

//TEMP - para verificar LOG
const mArray = () => {
    const a = tab.map((res) => {
        console.log(res, )
    })
}

window.addEventListener("load", populateTab)
