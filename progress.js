let arr = [0, 0, 0, 0, 0, 0, 0];
let key = []
let per1 = document.getElementById('per1');
let per2 = document.getElementById('per2');
let per3 = document.getElementById('per3');
let per4 = document.getElementById('per4');
let per5 = document.getElementById('per5');
let per6 = document.getElementById('per6');
let per7 = document.getElementById('per7');
const serchBotton = document.getElementById("searchButton")

var turn = 0

per1.innerHTML = `${arr[0]}%`;
per2.innerHTML = `${arr[1]}%`;
per3.innerHTML = `${arr[2]}%`;
per4.innerHTML = `${arr[3]}%`;
per5.innerHTML = `${arr[4]}%`;
per6.innerHTML = `${arr[5]}%`;
per7.innerHTML = `${arr[6]}%`;

var oninput = document.getElementById('oninput');
oninput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    bar();
  }
});

var generate = document.getElementById("report")
generate.style.display = "none"

function bar() {
  fetch('data.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      main(data);
    })
    .catch(function(err) {
      console.log('ERROR: ' + err);
    });

  turn++
  function main(data) {
    
    const oninput = document.getElementById('oninput').value;
    
    const searchInput = document.getElementById('oninput');
    let imga = document.getElementById('imga');
    let card_name = document.getElementById('card_name');
    let card_class = document.getElementById('card_class');
    let short = document.getElementById('short');
    let bar1 = document.getElementById('perProgress1');
    let bar2 = document.getElementById('perProgress2');
    let bar3 = document.getElementById('perProgress3');
    let bar4 = document.getElementById('perProgress4');
    let bar5 = document.getElementById('perProgress5');
    let bar6 = document.getElementById('perProgress6');
    let bar7 = document.getElementById('perProgress7');

    searchInput.value = "";

    arr.splice(0, 1, Math.min(Math.max(data[Number(oninput) - 1].c1 + arr[0], 0), 100));
    arr.splice(1, 1, Math.min(Math.max(data[Number(oninput) - 1].c2 + arr[1], 0), 100));
    arr.splice(2, 1, Math.min(Math.max(data[Number(oninput) - 1].c3 + arr[2], 0), 100));
    arr.splice(3, 1, Math.min(Math.max(data[Number(oninput) - 1].c4 + arr[3], 0), 100));
    arr.splice(4, 1, Math.min(Math.max(data[Number(oninput) - 1].c5 + arr[4], 0), 100));
    arr.splice(5, 1, Math.min(Math.max(data[Number(oninput) - 1].c3 + arr[5], 0), 100));
    arr.splice(6, 1, Math.min(Math.max(data[Number(oninput) - 1].c4 + arr[6], 0), 100));

    bar1.style.width = `${arr[0]}%`;
    bar2.style.width = `${arr[1]}%`;
    bar3.style.width = `${arr[2]}%`;
    bar4.style.width = `${arr[3]}%`;
    bar5.style.width = `${arr[4]}%`;
    bar6.style.width = `${arr[5]}%`;
    bar7.style.width = `${arr[6]}%`;

    per1.innerHTML = `${arr[0]}%`;
    per2.innerHTML = `${arr[1]}%`;
    per3.innerHTML = `${arr[2]}%`;
    per4.innerHTML = `${arr[3]}%`;
    per5.innerHTML = `${arr[4]}%`;
    per6.innerHTML = `${arr[5]}%`;
    per7.innerHTML = `${arr[6]}%`;

    card_name.innerHTML = data[Number(oninput) - 1].nameth
    card_class.innerHTML = `___${data[Number(oninput) - 1].class}___`
    short.innerHTML = data[Number(oninput) - 1].meat
    imga.src = data[Number(oninput) - 1].image

    key.push(data[Number(oninput) - 1].name)
    console.log(key)

    console.log(arr);
    function generateStory() {
      const messages = [];
      const newMessage = { role: "user", content: `make story about all of this ${key} in 5 line and enter this line and explain how it affects health in 5 line (the main character is word "you")`};
      messages.push(newMessage);
      fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
      })
        .then((res) => res.json())
        .then((data1) => {
          generate.style.display = "block";
          generate.addEventListener("click", function() {
          const situation = document.getElementById("story");
          situation.innerHTML = data1.story;
          generate.style.display = "none"; // Hide the generate block
        });
        })
        .catch((err) => {
          console.log("ERROR: " + err);
        });
    }
    if (turn === 10){
      generateStory()
    }
    }
}