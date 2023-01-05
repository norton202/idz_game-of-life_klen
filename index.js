const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")

const game = new GameOfLife()
game.gameSetUp()

ctx.fillRect(0, 0, 1400, 500);

let idF;

window.onload = () => {

    document.querySelector("#start-btn").addEventListener("click", () => {
        
        console.log('I`m here 3')

        game.fillArray();
        idF = window.setInterval(GT, 300)
    })

    document.querySelector("#stop").addEventListener("click", () => {
        
        window.clearInterval(idF);
        console.log("I`m Here2");
        game.gameSetUp();
    }) 

    document.querySelector("#gamefield").addEventListener("mousedown", function(event) {


        game.SetSingleCellAlive(Math.floor((event.pageY - canvas.getBoundingClientRect().y)/5), Math.floor((event.pageX - canvas.getBoundingClientRect().x)/5));
    }) 
}

function GT(){
    game.runGame();
}
