'use strict'



const MINE = '🔥'
const FLAG = '🚩'

var gBoard

var gLevel = { 
    SIZE: 4, 
    MINES: 2 
};


var gGame = { 
    isOn: false, 
    shownCount: 0, 
    markedCount: 0, 
    secsPassed: 0 
}

var gIntervalTimerId
var timer = 0.000

function onInit() {
    gBoard = createBoard()
    renderBoard(gBoard, '.board-container')


}


function cellClicked(ev,cellI,cellJ){
    //start game
    if(gGame.shownCount === 0) gIntervalTimerId = setInterval(startTimer, 1000);
    if(gGame.shownCount === 0) gGame.isOn = true
    if(gGame.shownCount > 0 && !gGame.isOn ) return
    gGame.shownCount++
    

    //modal
    var cell = gBoard[cellI][cellJ]
    if(cell.isMarked) return
    //make cell apear
    if(cell.isShown) return
    cell.isShown = !cell.isShown

    //dom make cell apear
    // renderCell({i:cellI, j:cellJ},getStrHTML(cell))
    renderBoard(gBoard, '.board-container')


    if(cell.isMine){
        makeAllMinesApear()
        gameOver()
    } 

}


//right click


function rightClick(el,rightCellI,rightCellJ){
    //modal
    if(gGame.shownCount > 0 && !gGame.isOn ) return

    var cell = gBoard[rightCellI][rightCellJ]

    //make cell apear
    if(cell.isShown) return
    
    cell.isMarked = !cell.isMarked

    //dom make cell apear
    // renderCell({i:cellI, j:cellJ},getStrHTML(cell))
    renderBoard(gBoard, '.board-container')


}



function gameOver(){
    clearInterval(gIntervalTimerId);
    console.log('game Over:', 'game Over')
    gGame.isOn =  false

}



function makeAllMinesApear(){

    var allMinesPoses = findAllMines()
    for(var i = 0 ; i < allMinesPoses.length;i++){
        var mineCell = allMinesPoses[i]
        var cellToApear = gBoard[mineCell.i][mineCell.j]
        cellToApear.isShown = true
     }
     renderBoard(gBoard, '.board-container')

}

function findAllMines(){
    var mines= []
    for(var i = 0 ; i < gBoard.length;i++){
        for(var j = 0 ; j<gBoard[0].length;j++){
            var cell = gBoard[i][j]
            if(cell.isMine){
                var cellPos = {i:i,j:j}
                mines.push(cellPos)
             }
        }
           
            
     }
     return mines
}
    // return mines
