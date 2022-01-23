const colors = ['red','blue','yellow','green'];
var sequence = [];
var clickedSequence = [];
var level = 0;
var counter = 0;

function startGame() {
    document.getElementsByClassName("text")[0].innerHTML = 'press W to start the game!';
    
    document.addEventListener("keypress" ,function (event){
        if(event.code == 'KeyW'){
              
                nextSequence();
                showSequence();
                startButtons();
            
       
        }
    });
    
}

function nextSequence() {
    level++; 
    clickedSequence = [];
   document.getElementsByClassName("text")[0].innerHTML = 'Level '+level;
    var rand = Math.floor(Math.random()*4);
    sequence.push(colors[rand]);
    counter = 0;
    
    
}

function showSequence() {  
        var curr = sequence[level-1];
        document.getElementById(curr).style.borderColor = "white";
        setTimeout(function () {
            document.getElementById(curr).style.borderColor = "black";
        } , 100);
        
            makeSound(curr);
           
            
    }
function makeSound(src) {
    var sound = new Audio("sounds/"+src+".mp3");  
            sound.play();
}

function startButtons() {
    for (let c = 0; c < colors.length; c++) {
        document.getElementById(colors[c]).addEventListener('click' , function () {
            var curr = this.getAttribute('id');
            clickedSequence.push(curr);
            makeSound(curr);
            if(checkSequence(counter)){
                counter++;
                if(counter == sequence.length){
                    setTimeout(function () {
                        nextSequence();
                       showSequence();
                    } , 1000);
                    
                }
            }else{
                makeSound('wrong');
                document.getElementsByClassName("text")[0].innerHTML = 'Game Over!';
                document.body.style.backgroundColor = "red";
                setTimeout(function () {
                    document.body.style.backgroundColor = "#011F3F";
                    
                } , 200);
                document.getElementsByClassName("text")[0].innerHTML = 'Game over press R to restart!';
                sequence = [];
                document.addEventListener("keypress" ,function (event){
                    if(event.code == 'KeyR'){   
                         sequence = [];
                         level = 0;  
                        startGame();     
                    }
                });
                
            }
           
            
            
        });          
     }
}

function checkSequence(index) {
    if(clickedSequence[index] == sequence[index]){
       return true;
        }else{
            return false;
        }
    
}
startGame();