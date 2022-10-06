function Container(capacity, curLevel) {
  this.div = document.getElementById("liter-" + capacity);
  this.arrow = this.div.parentNode.children[1].children[0];
  this.ind = document.getElementById("ind-" + capacity);
  this.level = curLevel;
  this.capacity = capacity;
  this.setWaterLevel = (level) => {
    this.ind.classList.add("ind-animation");
    setTimeout(() => {
      this.ind.classList.remove("ind-animation");
    }, 400);
    setTimeout(() => {
      this.ind.innerHTML = level.toString() + "L";
    }, 400);
    this.div.children[1].style.height =
      ((level / capacity) * 100).toString() + "%";
    this.level = level;
  };
  this.setWaterLevel(curLevel);
  this.div.parentNode.addEventListener("click", () => {
    let arrows = document.querySelectorAll(".line-to-arrow");
    if (firstContainer.selected === false) {
      firstContainer.selected = true;
      firstContainer.container = this;
      for (let i = 0; i < arrows.length; i++) {
        arrows[i].classList.add("select-option");
      }
      this.arrow.classList.add("selected-container");
      this.arrow.classList.remove("select-option");
    } else {
      for (let i = 0; i < arrows.length; i++) {
        arrows[i].classList.remove("select-option");
      }
      if (firstContainer.container == this) {
        firstContainer.selected = false;
        this.arrow.classList.remove("selected-container");
      } else {
        let litersToMove = firstContainer.container.level;
        litersToMove =
          litersToMove > this.capacity - this.level
            ? this.capacity - this.level
            : litersToMove;
        this.setWaterLevel(this.level + litersToMove);
        firstContainer.container.setWaterLevel(
          firstContainer.container.level - litersToMove
        );
        console.log(litersToMove);
        firstContainer.selected = false;
        moveHistory.push([
          firstContainer.container,
          this,
          litersToMove,
          new Date(),
        ]);
        undoHistory.push([firstContainer.container, this, litersToMove]);
        if (firstContainer.container.level == 4 || this.level == 4) {
          document.getElementById("win").style.height = "120%";
          console.log(
            "You win in " + moveHistory.length.toString() + " moves!"
          );
          let time = (new Date() - moveHistory[0][3]) / 1000;
          time = Math.round(time);
          console.log("You win in " + time.toString() + " seconds!");
          document.getElementById("win-statistics").innerHTML =
            moveHistory.length.toString() +
            " moves, " +
            time.toString() +
            " seconds!";
          document.getElementById("score").innerHTML =
            "Score: <b>" +
            Math.round((6 / (moveHistory.length * time)) * 10000).toString() +
            "</b>";
        }
        firstContainer.container.arrow.classList.remove("selected-container");
      }
    }
  });
}

const cont3 = new Container(3, 0);
const cont5 = new Container(5, 0);
const cont8 = new Container(8, 8);

var firstContainer = {
  selected: false,
  container: cont3,
};
var moveHistory = [];
var undoHistory = [];
const printHistory = () => {
  moveHistory.forEach((element) => {
    console.log(
      element[0].capacity +
        "Lt to " +
        element[1].capacity +
        "Lt container -> " +
        element[2]
    );
  });
};

const undo = () => {
  let x = undoHistory.pop();
  x[1].setWaterLevel(x[1].level - x[2]);
  x[0].setWaterLevel(x[0].level + x[2]);
};

document.getElementById("welcome").addEventListener("click", (e) => {
  document.getElementById("welcome").style.height = "0";
});

document.getElementById("reset").addEventListener("click", (e) => {
  setTimeout(() => {
    location.reload();
  }, 500);
});
