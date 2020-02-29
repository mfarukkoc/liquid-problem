function Container (capacity, curLevel) {
    this.div = document.getElementById("liter-" + capacity);
    this.ind = document.getElementById("ind-" + capacity);
    this.level = curLevel;
    this.capacity = capacity;
    this.setWaterLevel = (level) => {
        this.ind.classList.add("ind-animation");
        setTimeout(() => { this.ind.classList.remove("ind-animation");}, 500);
        setTimeout(() => { this.ind.innerHTML = level.toString()+"L";}, 500);
        this.div.firstElementChild.style.height = (level / capacity * 100).toString() + "%";
        this.level = level;
    }
    this.setWaterLevel(curLevel);
    this.div.parentNode.addEventListener("click",() => {
        if(firstContainer.selected === false) {
            firstContainer.selected = true;
            firstContainer.container = this;
        }
        else {
            if(firstContainer.container == this) {
                firstContainer.selected = false;
            }
            else {
                let litersToMove = firstContainer.container.level;
                litersToMove = litersToMove > this.capacity - this.level ? this.capacity - this.level : litersToMove;
                this.setWaterLevel(this.level + litersToMove);
                firstContainer.container.setWaterLevel(firstContainer.container.level - litersToMove);
                console.log(litersToMove)
                firstContainer.selected = false;
                moveHistory.push([firstContainer.container, this, litersToMove, new Date()]);
                undoHistory.push([firstContainer.container, this, litersToMove]);
                if(firstContainer.container.level == 4 || this.level == 4)
                {
                    console.log("You win in "+ moveHistory.length.toString() + " moves!")
                    let time = (new Date() - moveHistory[0][3]) / 1000;
                    time = Math.round(time);
                    console.log("You win in "+ time.toString() + " seconds!");
                }
            }
        }
    })
}

const cont3 = new Container(3, 0);
const cont5 = new Container(5,0);
const cont8 = new Container(8,8);

var firstContainer = {
    selected:false,
    container:cont3
};
var moveHistory = [];
var undoHistory = [];
const printHistory = () => {
    moveHistory.forEach(element => {
        console.log(element[0].capacity + "Lt to " + element[1].capacity +"Lt container -> " + element[2]);
    });
}

const undo = () => {
    let x = undoHistory.pop();
    x[1].setWaterLevel(x[1].level - x[2]);
    x[0].setWaterLevel(x[0].level + x[2]);
}