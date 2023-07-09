window.addEventListener('onload',Blur());
let sides=document.querySelectorAll('button');
let opponent;
let otherBut;
sides.forEach((element)=>{
    element.addEventListener('click',()=>{
        if(element.textContent=='AI'){
            otherBut=element.nextElementSibling;
            otherBut.classList.remove('Selected');
            let recquired=document.getElementById('rec');
                recquired.style.display='none';
            if(element.classList.contains('Selected')){
                element.classList.remove('Selected');
            }else{
                element.classList.add('Selected');
            }
            console.log('left');
            //Player2.setOpponent('AI');
            opponent='AI';
        }
        else if(element.textContent=='CPU'){
            otherBut=element.previousElementSibling;
            otherBut.classList.remove('Selected');
            let recquired=document.getElementById('rec');
                recquired.style.display='none';
            if(element.classList.contains('Selected')){
                
                element.classList.remove('Selected');
            }else{
                element.classList.add('Selected');
            }
            console.log('right');
           // Player2.setOpponent('Player');
              opponent='CPU';
        }else if(element.textContent=='Play'){
                Player1.setPlayerName(document.getElementById('Playername').value);
                if(Player1.getPlayerName()==''||opponent==undefined){
                    let recquired=document.getElementById('rec');
                    recquired.textContent='Please enter a name and choose an opponent';
                    recquired.style.color='red';
                    recquired.style.display='block';
                    recquired.style.transition='all 1s';
                }else{
                    UnBlur();
                }
        }else if(element.textContent=='Play Again'){
            let GameOverMenu=document.getElementById('GameOver');
            GameOverMenu.style.display='none';
            UnBlur();
            GameBoard.resetBoard();
        }else if(element.textContent=='Rage Quit'){
            window.close();
        }
    })});
function Blur(){
let Menu=document.getElementById('Menu');
let board=document.querySelector('.board');
let header=document.querySelector('.head');
    header.classList.add('blur');
    Menu.style.display='block';
    board.classList.add('blur');
    console.log('blur');
}
function UnBlur(){
let Menu=document.getElementById('Menu');
let board=document.querySelector('.board');
let header=document.querySelector('.head');
    header.classList.remove('blur');
    Menu.style.display='none';
    Menu.style.transition='all 1s';
    board.classList.remove('blur');
}
let GameBoard=(function(){
    let BoardGameEnded=false;
    let Board1D=Array.from(document.querySelectorAll('.board div'));
    //convert the board to a 2D array
    let Board2D=[];
   
    function returnBoard(){
        for(let i=0;i<Board1D.length;i+=3){
            Board2D.push(Board1D.slice(i,i+3));
        }
        return Board2D;
    }
    function resetBoard(){
       Board1D.forEach((element)=>{
        if(element.classList.contains('O')){element.classList.remove('O');}
        else if(element.classList.contains('X')){element.classList.remove('X');}
       });
    }
    function CheckWin(){
        let Board=returnBoard();
        let winner;
        let win=false;
        let winCondition=[
            [Board[0][0],Board[0][1],Board[0][2]],
            [Board[1][0],Board[1][1],Board[1][2]],
            [Board[2][0],Board[2][1],Board[2][2]],
            [Board[0][0],Board[1][0],Board[2][0]],
            [Board[0][1],Board[1][1],Board[2][1]],
            [Board[0][2],Board[1][2],Board[2][2]],
            [Board[0][0],Board[1][1],Board[2][2]],
            [Board[0][2],Board[1][1],Board[2][0]]
        ];
        for(let i=0;i<winCondition.length;i++){
            if(winCondition[i][0].classList.contains('X')&&winCondition[i][1].classList.contains('X')&&winCondition[i][2].classList.contains('X')){
                win=true;
                BoardGameEnded=true;
                winner='X';
                break;
            }
            else if(winCondition[i][0].classList.contains('O')&&winCondition[i][1].classList.contains('O')&&winCondition[i][2].classList.contains('O')){
                win=true;
                BoardGameEnded=true;
                winner='O';
                break;
            }
        }
        if(win){
            let winnerHead=document.getElementById('winner');
            let PlayerCongrats=document.getElementById('winnername');
           
            BoardGameEnded=true;
            if(winner=='X'){
                PlayerCongrats.textContent=`${Player1.getPlayerName()} Is mighty`;
                winnerHead.textContent=`${Player1.getPlayerName()} wins`;
                document.title=`${Player1.getPlayerName()} wins`;
                UpdateScreen.UpdateAnnouncer(`${Player1.getPlayerName()} wins`);
                console.log('winner is human');
                setTimeout(()=>{UpdateScreen.gameEnd();},500);
            }else if(winner=='O'){
                PlayerCongrats.textContent=`${opponent} Is mighty`;
                winnerHead.textContent=`GameOver ${opponent} wins`;
                document.title=`${opponent} wins`;
                UpdateScreen.UpdateAnnouncer(`${opponent} won`);
                console.log('winner is AI');
                UpdateScreen.gameEnd();
            }
            console.log('winner is hat');
            
        }
        else if(!win&&Board1D.every((element)=>{return element.classList.contains('X')||element.classList.contains('O');})){
            let winnerHead=document.getElementById('winner');
            winnerHead.textContent=`Tie`;
            let PlayerCongrats=document.getElementById('winnername');
            PlayerCongrats.textContent=`Tie`;
            BoardGameEnded=true;
            document.title=`Tie`;
            console.log('tie');
            UpdateScreen.UpdateAnnouncer('Tie');
            setTimeout(()=>{UpdateScreen.gameEnd();},500);
        }
    }
    return Object.assign({},{returnBoard,resetBoard,CheckWin,BoardGameEnded});
    
})();
let UpdateScreen=(function(){
    let GameEnded=false;
    let Announcer=document.getElementById('announcer');
    function UpdateAnnouncer(message){
        Announcer.textContent=message;
    }
    function gameEnd(){
        GameOver();
        GameBoard.resetBoard();
    }

    return Object.assign({},{UpdateAnnouncer,GameEnded,gameEnd});
        
 })();
let Player1=(function(){
    let Playermarker='X';
    let PlayerName='Player1';
    let playedTurn=false;
    function getPlayStatus(){  
        return playedTurn;
    }
    function setPlayerName(name){
        PlayerName=name;
    }
    function getPlayerName(){
        return PlayerName;
    }
    function changeStatus(){
        playedTurn=!playedTurn;
    }
    function PlayTurn(){
        let Board1D=Array.from(document.querySelectorAll('.board div'));
        Board1D.forEach((element)=>{
            element.addEventListener('click',()=>{
              if(playedTurn==false&&GameBoard.BoardGameEnded==false){
                if(element.classList.contains('O')||element.classList.contains('X')){
                    element.classList.add('vibrate');
                    console.log('already played');
                    setTimeout(()=>{element.classList.remove('vibrate');},1000);
                    UpdateScreen.UpdateAnnouncer('Already played');
                }
                else{
                    GameBoard.CheckWin();
                    element.classList.add(Playermarker);
                    console.log('played');
                    let encouragementPhrase=encouragementPhrases[Math.floor(Math.random()*encouragementPhrases.length)];
                    UpdateScreen.UpdateAnnouncer(`${PlayerName}, ${encouragementPhrase}`);
                    document.title=`${PlayerName}'s turn`;
                    playedTurn=true;
                    setTimeout(()=>{Player2.PlayTurnAsCPU();},1000);
                    GameBoard.CheckWin();
                }
              }else{
                    console.log('already played');
                    UpdateScreen.UpdateAnnouncer('Follow the rules Traveler');
              }
            });
        });
    }
    return Object.assign({},{setPlayerName,getPlayerName,PlayTurn,getPlayStatus,Playermarker,changeStatus});
})();
let Player2=(function(){
    let playedTurn=false;
    function changeStatus(){
        playedTurn= !playedTurn;
    }
    function setOpponent(name){
        opponent=name;
    }
    function PlayTurnAsCPU(){
        let Board=GameBoard.returnBoard();
        let played=false;
        console.log('playing as AI');
        while(!played&&GameBoard.BoardGameEnded==false){
            let x=Math.floor(Math.random()*3);
            let y=Math.floor(Math.random()*3);
            if(!Board[x][y].classList.contains('O')&&!Board[x][y].classList.contains('X')&&GameBoard.BoardGameEnded==false){
                Board[x][y].classList.add('O');
                played=true;
                let phrase=cpuPhrases[Math.floor(Math.random()*cpuPhrases.length)];
                Player1.changeStatus();
                UpdateScreen.UpdateAnnouncer(phrase);
                document.title=`CPU's turn`;
                GameBoard.CheckWin();
            }
        }
        GameBoard.CheckWin();
    }
    function PlayAsAI(){
        //min max algorithm for AI's turn
        

    }
   
        return Object.assign({},{PlayTurnAsCPU,setOpponent,changeStatus});
    
})();
const aiPhrases = [
    "The AI is on fire!",
    "The AI is unstoppable!",
    "The AI is playing like a machine!",
    "The AI is outplaying everyone!",
    "The AI is taking no prisoners!",
    "The AI is on a roll!",
    "The AI is crushing it!",
    "The AI is dominating!",
    "The AI is putting on a clinic!",
    "The AI is showing no mercy!",
    "The AI is a human's worst nightmare!",
    "The AI is the future of gaming!",
    "The AI is the new king of the hill!",
    "The AI is the one to beat!",
    "The AI is the master of the game!",
    "The AI is the boss!",
    "The AI is the big kahuna!",
    "The AI is the top dog!",
    "The AI is the alpha and the omega!",
    "The AI is the one and only!",
    "The AI is playing with its food!",
    "The AI is toying with its opponents!",
    "The AI is having its way with the competition!",
    "The AI is putting on a show!",
    "The AI is putting on a master class!",
    "The AI is making it look easy!",
    "The AI is making it look like child's play!",
    "The AI is making it look like a walk in the park!",
    "The AI is making it look like a cakewalk!",
    "The AI is making it look like a breeze!",
  ];
  const encouragementPhrases = [
    "You're the only hope for this pink dystopia!",
    "The fate of the world rests on your shoulders!",
    "Don't give up! The elves need you!",
    "You can do this! I believe in you!",
    "Don't let the pink dystopia win!",
    "This is your destiny!",
    "The future of the elves depends on you!",
    "You're the only one who can save us!",
    "Don't be afraid! I'm here with you!",
    "We can do this together!",
  
    "The pink dystopia may be dark, but your heart is light!",
    "You're the beacon of hope in this dark world!",
    "Don't let the darkness consume you!",
    "You're stronger than you think!",
    "You can overcome anything!",
    "You're a hero!",
    "You're the chosen one!",
    "The world needs you!",
    "You're the only one who can save us!",
    "Don't give up!",
  
    "The pink dystopia may be tough, but you're tougher!",
    "You're a survivor!",
    "You're a fighter!",
    "You're a champion!",
    "You're the best!",
    "You can do anything!",
    "You're unstoppable!",
    "You're invincible!",
    "You're the master of your own destiny!",
    "You're the hero of this story!",
  ];
  const cpuPhrases = [
    "The CPU is thinking...",
    "The CPU is calculating...",
    "The CPU is strategizing...",
    "The CPU is plotting...",
    "The CPU is making its move...",
    "The CPU is unleashing its power...",
    "The CPU is taking no prisoners...",
    "The CPU is leaving no stone unturned...",
    "The CPU is playing with precision...",
    "The CPU is playing with purpose...",
    "The CPU is playing with fire...",
    "The CPU is playing with the devil...",
    "The CPU is playing for keeps...",
    "The CPU is playing to win...",
    "The CPU is playing like its life depends on it...",
    "The CPU is playing like it's the last game it'll ever play...",
    "The CPU is not to be trifled with...",
    "The CPU is not to be underestimated...",
    "The CPU is a force to be reckoned with...",
    "The CPU is in a league of its own...",
    "The CPU is on a whole different level...",
    "The CPU is playing at the top of its game...",
    "The CPU is unstoppable...",
    "The CPU is unbeatable...",
    "The CPU is a master of the game...",
    "The CPU is the best player in the world...",
    "The CPU is the master of this game...",
    "The CPU is playing like a machine...",
    "The CPU is a god...",
    "The CPU is the CPU!",
  ];
  function GameOver(){
    let GameOverMenu=document.getElementById('GameOver');
    let board=document.querySelector('.board');
    let header=document.querySelector('.head');
    GameOverMenu.style.display='block';
    header.classList.add('blur');
    board.classList.add('blur');
    console.log('blur');
  }
  
  //Handling play
  Player1.PlayTurn();
 
