console.log("Loading the JavaScript for the consumer dashboard. ");

var card_info_btn = document.getElementsByClassName("card-info-button");
for (var i = 0; i < card_info_btn.length; i++) {
    card_info_btn[i].addEventListener("click", function (event) {
        if (event.target.textContent === "Card Info") {
            event.target.textContent = "Hide Card Info";
        } else {
            event.target.textContent = "Card Info";
        }
    });
}

console.log("Finish loading the JavaScript for the consumer dashboard. ");
