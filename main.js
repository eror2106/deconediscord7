document.getElementById("text").value = "";
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].checked = false;
}

var result = "";
var option = "";
var btn = document.querySelector("button");
var texte = document.getElementById("text");
const cache = document.querySelector("#cacher");
const sauter = document.querySelector("#saut");
const button = document.querySelector("#copy-button");
button.style.display = "none";
cache.addEventListener("change", (event) => {
  if (event.target.checked) {
    option += "||";
  } else {
    option = "";
  }
});

sauter.addEventListener("change", (event) => {
  if (event.target.checked) {
    option += "<br>";
  } else {
    option = "";
  }
});

btn.onclick = function () {
  if (option == "" || document.getElementById("text").value == "") {
    alert("lol pas d'optionou champ vide");
  } else {
    var texte = document.getElementById("text").value;

    if (cache.checked && sauter.checked == true) {
      for (let i = 0; i < texte.length; i++) {
        option = "";
        traiter = " " + "||" + texte[i] + "||" + "<br>";

        result += traiter;
      }
    } else {
      for (let i = 0; i < texte.length; i++) {
        traiter = option + texte[i] + option;

        result += traiter;
      }
    }

    var html = (document.getElementById("resultat").innerHTML = result);
    result = "";
    button.style.display = "block";

    let html1 = "";
    let textToCopy = "";
    html1 = html.replace(/<[^>]*>/g, "");
    //permier cas
    if (html[0] == "<") {
      let letters = html1.split("");

      textToCopy = letters.join("\n");
    }
    //deuxieme cas
    else if (html[0] == " ") {
      let nb = 0;
      let letters = "";
      for (let k = 0; k < html1.length; k++) {
        if (nb < 5) {
          if (html1[k] == " ") {
            letters = html1[k].replace(" ", "");
          } else {
            letters += html1[k];
            nb++;
          }
        } else if ((nb = 6)) {
          letters += html1[k] + "\n";
          nb = 0;
        }
      }
      textToCopy = letters;
      console.log(letters);
    }
    //troisieme cas
    else {
      textToCopy = html;
    }
    button.addEventListener("click", function () {
      navigator.clipboard.writeText(textToCopy).then(
        function () {
          alert("Texte copié dans le presse-papiers avec succès!");
        },
        function (err) {
          console.error("Impossible de copier le texte : ", err);
        }
      );
    });
  }
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  document.getElementById("text").value = "";
  option = "";
};
