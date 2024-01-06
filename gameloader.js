if (!window.top.location.href.startsWith("https://skybase-alpha.github.io/")) {
  document.querySelector("title").innerHTML = "Google";
  function hidey() {
    var theURL = prompt(
      "Please enter a URL to show in your history instead of ExpGames\r\nMake sure to include https:// or http://\r\nLeave blank for Google Classroom"
    );
    var tabBar = prompt(
      "Please select a tab disguise by typing the corresponding letter\r\nLeave blank for Google Classroom\r\nc - Google Classroom\r\ng - Google\r\nb - Blank\r\nt - Custom"
    );
    if (tabBar !== "c" && tabBar !== "g" && tabBar !== "t" && tabBar !== "b") {
      var tabIcon = "https://ssl.gstatic.com/classroom/favicon.png";
      var tabName = "Classes";
    } else if (tabBar == "c") {
      var tabIcon = "https://ssl.gstatic.com/classroom/favicon.png";
      var tabName = "Classes";
    } else if (tabBar == "g") {
      var tabIcon = "https://google.com/favicon.ico";
      var tabName = "Google";
    } else if (tabBar == "t") {
      var tabIcon = prompt("URL for icon:");
      var tabName = prompt("Tab Name");
    } else if (tabBar == "" || tabBar == null) {
      var tabIcon = "https://ssl.gstatic.com/classroom/favicon.png";
      var tabName = "Classes";
    } else if (tabBar == "b") {
      var tabIcon =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Antonia_Sautter_Creations.png/120px-Antonia_Sautter_Creations.png";
      var tabName = "&lrm;";
    }
    function inFrame() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return !0;
      }
    }
    if (1 != inFrame()) {
      var a = window.open("about:blank", "_blank");
      a.document.documentElement.innerHTML =
        "<!DOCTYPE html><html><title>" +
        tabName +
        '</title><link rel="icon" type="image/png" href=' +
        tabIcon +
        '><style>body {margin:0;}</style><body><iframe height="100%" width="100%" src="' +
        window.location.href +
        '"frameborder="0" allowfullscreen></iframe></body></html>';
      if (theURL == "" || theURL == null) {
        window.location.replace("https://classroom.google.com/h");
      } else {
        window.location.replace(theURL);
      }
    }
  }
} else {
  alert("this site is poopoo");
  window.close();
}
function gameHide(gamePath) {
  var a = window.open("about:blank", "_blank");
  a.document.documentElement.innerHTML =
    "<!DOCTYPE html><html><title>" +
    tabName +
    '</title><link rel="icon" type="image/png" href=' +
    tabIcon +
    '><style>body {margin:0;}</style><body><iframe height="100%" width="100%" src="' +
    gamePath +
    '"frameborder="0" allowfullscreen></iframe></body></html>';
}

var gamesText = `{
    "games":[
        {
            "name":"PingPong",
            "img":"img/pingpong.png",
            "path":"ping-pong-master/
"
        },
        {
            "name":"Space Invader",
            "img":"img/spiv.png",
            "path":"SpaceInvaders/
"
        },
        {
          "name":"Brick Breaker",
          "img":"img/brbr.png",
          "path":"Brick_Breaker-master/"
        },
        {
          "name":"Minesweeper",
          "img":"img/minesw.webp",
          "path":"minesweep/"
        },
        {
          "name":"Google Dino",
          "img":"img/dino.png",
          "path":"googdino/"
        },
        {
          "name":"Mario Portal",
          "img":"img/ma0.jpg",
          "path":"mario/"
        },
        {
          "name":"Super Mario 64",
          "img":"img/m64.png",
          "path":"sm64/"
        },
        {
          "name":"Tetris",
          "img":"img/tetris.png",
          "path":"tetris/"
        },
        {
          "name":"Pokemon Fire",
          "img":"img/pkmr.webp",
          "path":"Pokemon%20Fire%20Red/"
        },
        {
          "name":"Pokemon Green",
          "img":"img/pkmg.jpg",
          "path":"Pokemon%20Leaf%20Green/"
        },
        {
          "name":"2048",
          "img":"img/2048img.png",
          "path":"2048/"
        },
        {
          "name":"Sonic Advance",
          "img":"img/sonica.jpg",
          "path":"emu/GBA/sonic-advance/"
        },
        {
          "name":"Super Mario World",
          "img":"img/smw.jpg",
          "path":"emu/SNES/smw/"
        },
        {
          "name":"Super Mario Kart",
          "img":"img/smk.png",
          "path":"emu/SNES/smk/"
        },
        {
          "name":"Legend Of Zelda",
          "img":"img/loz.webp",
          "path":"emu/SNES/loz/"
        },
        {
          "name":"Bitlife",
          "img":"img/bitlife.png",
          "path":"Bitlife/"
        },
        {
          "name":"Retrobowl",
          "img":"img/bowl.png",
          "path":"retrobowl/"
        },
        {
          "name":"NES Emulator",
          "img":"img/nes.png",
          "path":"nes/"
        },
        {
          "name":"RUN 3",
          "img":"img/run3.png",
          "path":"RUN3/"
        },
        {
          "name":"Cookie Clicker",
          "img":"img/cookieclicker.png",
          "path":"cookieclicker/"
        },
        {
          "name":"MotoX3M",
          "path":"motox3m/"
        },
        {
          "name":"Fluid Simulation",
          "img":"img/fluidsim.png",
          "path":"Fluid-Simulation/"
        },
        {
          "name":"Wordle",
          "img":"img/wordlelogo.webp",
          "path":"Wordle/"
        },
        {
          "name":"Subway Surfers",
          "img":"img/subwaysurfers.webp",
          "path":"subway/"
        },
        {
          "name":"Sandboxels",
          "img":"img/sandboxels.jfif",
          "path":"sandboxels/"
        },
        {
          "name":"Flappy Bird",
          "img":"img/flappybird.jpg",
          "path":"flappy/"
        }

    ]
}`;
var gameObject = JSON.parse(gamesText);
for (i in gameObject.games) {
  let elem1 = document.createElement("div");
  elem1.className = "game-button";
  document.getElementById("gameSelect").appendChild(elem1);
  console.log("div made");
  let elem2 = document.createElement("a");

  elem2.href = gameObject.games[i].path;

  elem1.appendChild(elem2);
  console.log("a made");
  let elem3 = document.createElement("img");
  elem3.src = gameObject.games[i].img;
  elem3.alt = gameObject.games[i].name;
  elem2.appendChild(elem3);
  console.log("img made");
  let elem4 = document.createElement("p");
  elem4.innerHTML = gameObject.games[i].name;
  elem2.appendChild(elem4);
  console.log("p made");
}
const gamesContainer = document.getElementById("gameSelect");
const searchBar = document.getElementById("search");
// Listen for input event on the search bar
searchBar.addEventListener("input", (e) => {
  const query = searchBar.value.trim().toLowerCase();

  // Loop through all the games in the container and show/hide them depending on whether they match the search query
  for (let game of gamesContainer.children) {
    if (game instanceof Element) {
      if (query) {
        const gameName = game.querySelector("p").innerText.trim().toLowerCase();
        if (gameName.includes(query)) {
          game.removeAttribute("hidden");
        } else {
          game.setAttribute("hidden", "");
        }
      } else {
        game.removeAttribute("hidden");
      }
    }
  }
});
// if (localStorage.getItem("hidden") == "y") {
//   hidey();
//   console.log("fff");
// }
