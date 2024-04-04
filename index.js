const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const country = document.querySelector("#inputtedCountry");
const score = document.querySelector("#inputtedScore");
const addButton = document.querySelector("button");
const sorting = document.querySelector("#sorting");
const redMessage = document.querySelector("#redMessage");
const devs = document.querySelector(".devs");

//storing all scoreId and value
let scoreSets = [];

//initial uniqueId
let uniqueIdOfDev = 0;
let uniqueIdOfScore = 0;
let uniqueIdOfDeleteButton = 0;
let uniqueIdOfAdd5 = 0;
let uniqueIdOfMinus5 = 0;

addButton.addEventListener("click", () => {
  // console.log(`clicked `);
  //when no field are inputted
  redMessage.textContent = "";
  if (
    firstName.value === "" ||
    lastName.value === "" ||
    country.value === "" ||
    score.value === ""
  ) {
    redMessage.textContent = "all fields are required";
  }

  //when all fields are inputted
  if (firstName.value && lastName.value && country.value && score.value) {
    // console.log("all fields are filled");

    const div = document.createElement("div");
    div.setAttribute("class", "dev");
    div.setAttribute("id", `dev-${++uniqueIdOfDev}`);

    const content = `<div class="name-date">
						<p id="name">${firstName.value} ${lastName.value}</p>
						<p id="dateTime">${new Date().toLocaleTimeString([], {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            })}</p>
				</div>
				<div class="country">
						<p id="country">${country.value}</p>
				</div>`;

    const scoreClass = document.createElement("div");
    scoreClass.setAttribute("class", "score");
    const scoreHolder = document.createElement("p");
    const id = ++uniqueIdOfScore;
    scoreHolder.setAttribute("id", `score-${id}`);
    scoreHolder.textContent = `${score.value}`;
    //storing all scoreId and value
    scoreSets.push({
      scoreId: `score-${id}`,
      scoreValue: Number(score.value)
    });
    // console.log(scoreSets);
    scoreClass.appendChild(scoreHolder);

    const iconGroup = document.createElement("div");
    iconGroup.setAttribute("class", "icon-group");
    const deleteButton = document.createElement("div");
    deleteButton.setAttribute("class", "delete");
    deleteButton.setAttribute("id", `delete-${++uniqueIdOfDeleteButton}`);
    deleteButton.innerHTML = `❌`;

    const add5 = document.createElement("div");
    add5.setAttribute("class", "add5");
    add5.setAttribute("id", `add5-${++uniqueIdOfAdd5}`);
    add5.textContent = "+5";

    const minus5 = document.createElement("div");
    minus5.setAttribute("class", "minus5");
    minus5.setAttribute("id", `minus5-${++uniqueIdOfMinus5}`);
    minus5.textContent = "-5";

    div.innerHTML = content;
    div.appendChild(scoreClass);
    div.appendChild(iconGroup);
    iconGroup.appendChild(deleteButton);
    iconGroup.appendChild(add5);
    iconGroup.appendChild(minus5);

    //unsorted arrange
    devs.appendChild(div); //have to append to get devs div later
    devs.style.display = "none"; //don't show the unsorted arrange

    //sorted arrange
    if (scoreSets.length) {
      //descending order
      scoreSets.sort((a, b) => b.scoreValue - a.scoreValue);
      // console.log("scoreSets ==", scoreSets);
      scoreSets.forEach((score) => {
        const { scoreId } = score;
        const uniqueId = scoreId.slice(6);
        // console.log("uniqueId >>>>", uniqueId);
        const dev = document.querySelector(`#dev-${uniqueId}`);
        // console.log(dev);
        devs.appendChild(dev);
        devs.style.display = "flex"; //show the sorted arrange
      });
    }

    // ===================================================================
    //delete button start
    deleteButton.addEventListener("click", () => {
      console.log("deleteClass clicked");
      // console.log(deleteButton);
      // console.log(deleteButton.id);

      const idOfDev = deleteButton.id.slice(7);
      // console.log(idOfDev);

      console.log(document.querySelector(`#dev-${idOfDev}`));
      //delete
      document.querySelector(`#dev-${idOfDev}`).textContent = "";
      document.querySelector(`#dev-${idOfDev}`).style.display = "none"; //remove space
    });
    //delete button end

    //add5 button start
    add5.addEventListener("click", () => {
      console.log("add5 clicked");
      // console.log(add5);

      const idOfScore = add5.id.slice(5);

      const score = document.querySelector(`#score-${idOfScore}`).textContent;
      document.querySelector(`#score-${idOfScore}`).textContent = `${
        Number(score) + 5
      }`;
    });
    //add5 button end

    //minus5 button start
    minus5.addEventListener("click", () => {
      console.log("minus5 clicked");
      // console.log(minus5);

      const idOfScore = minus5.id.slice(7);

      const score = document.querySelector(`#score-${idOfScore}`).textContent;
      if (score - 5 >= 0) {
        document.querySelector(`#score-${idOfScore}`).textContent = `${
          Number(score) - 5
        }`;
      }
    });
    //minus5 button end

    //reset input value
    firstName.value = "";
    lastName.value = "";
    country.value = "";
    score.value = "";
  }
});

let isArranged = false;
sorting.addEventListener("click", () => {
  console.log("sorting clicked");

  if (scoreSets.length > 0) {
    redMessage.textContent = "";
    if (!isArranged) {
      scoreSets.sort((a, b) => b.scoreValue - a.scoreValue);
      // console.log(">>>>", scoreSets);

      redMessage.textContent = "descending order sorting";

      scoreSets.forEach((score, index) => {
        const { scoreId } = score;
        const uniqueId = scoreId.slice(6);
        // console.log(uniqueId);

        devs.appendChild(document.querySelector(`#dev-${uniqueId}`));
      });
      isArranged = true;
    } else if (isArranged) {
      scoreSets.sort((a, b) => a.scoreValue - b.scoreValue);
      redMessage.textContent = "ascending order sorting";

      scoreSets.forEach((score, index) => {
        const { scoreId } = score;
        const uniqueId = scoreId.slice(6);
        // console.log(uniqueId);

        devs.appendChild(document.querySelector(`#dev-${uniqueId}`));
      });
      isArranged = false;
    }
  } else {
    redMessage.textContent = "nothing to sort";
  }
});
