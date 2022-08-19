// Feather icons are used on some pages
// Replace() replaces [data-feather] elements with icons
import featherIcons from "feather-icons";
featherIcons.replace();

// Mazer internal JS. Include this in your project to get
// the sidebar running.
require("./components/dark");
require("./mazer");

// Temporarily moved from consumerCard.js to app.js

console.log("🟨 JavaScript - Consumer Card Class. ");

/* app.use("/assets", express.static("./assets/")); */

class consumerCardBillRecord {
    constructor(d, m, cA, b, vE) {
        this.date = d;
        this.merchant = m;
        this.consAmount = cA;
        this.balance = b;
        this.viewEther = vE;
    }
}

class consumerCard {
    /* Give each card an identical card ID */
    static cardID = 0;

    /* The target card ID for current operation */
    /* For example, checking bill records */
    static targetCardID = "";

    /* All consumer cards with their information */
    static consumerCardList = [];

    constructor(cH, cN, mN, cIm, cIn, cMV, cRV, cID, cED) {
        consumerCard.cardID += 1;
        this.id = consumerCard.cardID;
        this.cardHeader = cH;
        this.cardName = cN;
        this.merchantName = mN;
        this.cardImage = cIm;
        this.cardInformation = cIn;
        this.cardMaxValue = cMV;
        this.cardRemValue = cRV;
        this.cardIssDate = cID;
        this.cardExpDate = cED;
        this.cardBilRecords = new Array(1000);
    }

    find_ID(fID) {
        var i = 0;
        while (i < consumerCard.consumerCardList.length) {
            if (consumerCard.consumerCardList[i].id === fID) {
                break;
            }
        }
        return i;
    }

    getCardHeader() {
        return this.cardHeader;
    }

    setCardHeader(cH) {
        this.cardHeader = cH;
    }

    /* add a consumer card to the consumer card list */
    /* input type: consumerCard class object */
    addConsumerCard(cC) {
        console.log(cC);
        consumerCard.consumerCardList.push(cC);
        console.log(consumerCard.consumerCardList);
    }

    displayConsumerCard() {
        var consumerCard_UI =
            document.getElementsByClassName("JS-consumer-cards");
        for (var i = 0; i < consumerCard_UI.length; i++) {
            consumerCard_UI[i].innerHTML = "";
            for (var j = 0; j < consumerCard.consumerCardList.length; j++) {
                consumerCard_UI[i].insertAdjacentHTML(
                    "beforeend",
                    '<div class="col-xl-4 col-md-6 col-sm-12">' +
                        '<div class="card consumer-card" id="example ID">' +
                        '<div class="card-header"><h3 class="card-title">' +
                        consumerCard.consumerCardList[j].cardHeader +
                        "</h3></div>" +
                        '<div class="card-body"><p>' +
                        '    <div><text class="card-category">Card Name  </text><text class="card-text">' +
                        consumerCard.consumerCardList[j].cardName +
                        "</text></div>" +
                        '    <div><text class="card-category">Merchant Name  </text><text class="card-text">' +
                        consumerCard.consumerCardList[j].merchantName +
                        "</text></div>" +
                        '    <div class="card-image"><img class="img-fluid w-100" src="' +
                        consumerCard.consumerCardList[j].cardImage +
                        '" alt="The Card Image cannot be displayed"></div>' +
                        '    <div class="empty-line"></div><div><text class="card-text">' +
                        consumerCard.consumerCardList[j].cardInformation +
                        '</text></div><div class="empty-line"></div>' +
                        '    <div><button class="card-info-button" type="button" data-bs-toggle="collapse" data-bs-target="#card-info' +
                        consumerCard.consumerCardList[j].id +
                        '" aria-expanded="true" aria-controls="card-info">Card Info</button></div></p>' +
                        '<div class="collapse" id="card-info' +
                        consumerCard.consumerCardList[j].id +
                        '">' +
                        '    <div><text class="card-category darkgreen">Remaining value  </text><text class="card-text">' +
                        consumerCard.consumerCardList[j].cardRemValue +
                        "/" +
                        consumerCard.consumerCardList[j].cardMaxValue +
                        "</text></div>" +
                        '    <div><text class="card-category red">Expiration date  </text><text class="card-text">' +
                        consumerCard.consumerCardList[j].cardExpDate +
                        "</text></div>" +
                        '    <div id="default-consumer-card"><a onclick="setTargetCard(' +
                        consumerCard.consumerCardList[j].id +
                        ')" href="consumer-bill-records.html" ' +
                        'class="card-category grey card-link">Bill records</a></div>' +
                        '    <div><a href=# class="card-category grey card-link">Add black list</a></div>' +
                        '    <div class="empty-line"></div></div></div></div></div>'
                );
            }
        }
    }

    displayBillRecord() {
        consumerCard.consumerCardList =
            sessionStorage.getItem("consumerCardList");
        for (var i = 0; i < consumerCard.consumerCardList.length; i++) {
            Object.assign(this, consumerCard.consumerCardList[i]);
            console.log(
                "The type of card " +
                    i +
                    " is " +
                    typeof consumerCard.consumerCardList[i]
            );
        }

        var consumerCard_UI = document.getElementsByClassName("JS-bill-record");
        console.log(consumerCard_UI.length);
        console.log(consumerCard.consumerCardList);
        for (var i = 0; i < consumerCard_UI.length; i++) {
            // consumerCard_UI[i].innerHTML = "";
            let index = this.find_ID(this.targetCardID);
            console.log(111);
            console.log(index);

            console.log(consumerCard.consumerCardList[0]);
            console.log(consumerCard.consumerCardList[1]);
            let a = consumerCard.consumerCardList;
            console.log(typeof a);
            // console.log();
            for (
                var j = 0;
                j < consumerCard.consumerCardList[index].cardBilRecords.length;
                j++
            ) {
                consumerCard_UI[i].insertAdjacentHTML(
                    "beforeend",
                    "<tr><td>consumerCard.consumerCardList[index].cardBilRecords[j].date</td>" +
                        "<td>consumerCard.consumerCardList[index].cardBilRecords[j].merchant</td>" +
                        "<td>consumerCard.consumerCardList[index].cardBilRecords[j].consAmount</td>" +
                        "<td>consumerCard.consumerCardList[index].cardBilRecords[j].balance</td>" +
                        "<td>consumerCard.consumerCardList[index].cardBilRecords[j].viewEther</td></tr>"
                );
            }
        }
    }

    /* remove a customer card from the database (given its cardID) */
    remove(r_id) {
        for (var i = 0; i < consumerCard.consumerCardList.length; i++) {
            if (consumerCard.consumerCardList[i].id === r_id) {
                consumerCard.consumerCardList.splice(i, 1);
                break;
            }
        }
    }

    /* update the consumerCard database by storing the whole class and sharing with other HTML files */
    update() {
        sessionStorage.setItem(
            "consumerCardList",
            consumerCard.consumerCardList
        );
    }

    /* change the static variable, targetCardID */
    setTargetCard(sTC_id) {
        let index = this.find_ID(sTC_id);
        console.log(
            "The target consumer card is being set to: " +
                consumerCard.consumerCardList[index].cardName
        );
        this.targetCardID = sTC_id;
        consumerCard.update();
    }

    /* add a single bill record (given its cardID) */
    addConsumerCardBillRecord(aBR_id, d, m, cA, b, vE) {
        var i = this.find_ID(aBR_id);
        while (i < consumerCard.consumerCardList.length) {
            if (consumerCard.consumerCardList[i].id === aBR_id) {
                break;
            }
        }
        if (i != consumerCard.consumerCardList.length) {
            consumerCard.consumerCardList[i].cardBilRecords.push(
                this.consumerCardBillRecord(d, m, cA, b, vE)
            );
        }
        /* this.sortConsumerCardBillRecord(aBR_id, "date"); */
    }
}

var newConsumerCard = new consumerCard(
    "Card 1",
    "Default name",
    "Default merchant",
    "assets/images/samples/samples-card/customer-gift-card-sample-1.png",
    "Default card information",
    0,
    0,
    "Unknown",
    "Unknown"
);
newConsumerCard.addConsumerCardBillRecord(
    newConsumerCard.targetCardID,
    new Date("2022-01-01"),
    "Andy",
    100,
    900,
    "Unknown"
);
newConsumerCard.addConsumerCardBillRecord(
    newConsumerCard.targetCardID,
    new Date("2022-01-04"),
    "David",
    60,
    840,
    "Unknown"
);
newConsumerCard.addConsumerCardBillRecord(
    newConsumerCard.targetCardID,
    new Date("2022-01-06"),
    "Jim",
    90,
    750,
    "Unknown"
);
newConsumerCard.addConsumerCardBillRecord(
    newConsumerCard.targetCardID,
    new Date("2022-01-15"),
    "Sistine",
    231,
    519,
    "Unknown"
);
newConsumerCard.addConsumerCardBillRecord(
    newConsumerCard.targetCardID,
    new Date("2022-01-20"),
    "Aaron",
    500,
    19,
    "Unknown"
);

var newConsumerCard2 = new consumerCard(
    "Card 2",
    "Default name 2",
    "Default merchant",
    "assets/images/samples/samples-card/customer-gift-card-sample-2.png",
    "Default card information",
    0,
    0,
    "Unknown",
    "Unknown"
);
var newConsumerCard3 = new consumerCard(
    "Card 3",
    "Default name 3",
    "Default merchant",
    "assets/images/samples/samples-card/customer-gift-card-sample-3.png",
    "Default card information",
    0,
    0,
    "Unknown",
    "Unknown"
);
var newConsumerCard4 = new consumerCard(
    "Card 4",
    "Default name 4",
    "Default merchant",
    "assets/images/samples/samples-card/customer-gift-card-sample-4.png",
    "Default card information",
    0,
    0,
    "Unknown",
    "Unknown"
);
newConsumerCard.addConsumerCard(newConsumerCard);
newConsumerCard.addConsumerCard(newConsumerCard2);
newConsumerCard.addConsumerCard(newConsumerCard3);
newConsumerCard.addConsumerCard(newConsumerCard4);
newConsumerCard.update();
newConsumerCard.displayConsumerCard();

console.log("✅ JavaScript - Consumer Card Class (finished). ");

// Temporarily moved from button.js to app.js
console.log("🟨 JavaScript - Consumer Card Info button. ");

let consumer_card_info_btn =
    document.getElementsByClassName("card-info-button");
for (var i = 0; i < consumer_card_info_btn.length; i++) {
    consumer_card_info_btn[i].addEventListener("click", function (event) {
        if (event.target.textContent === "Card Info") {
            event.target.textContent = "Hide Card Info";
        } else {
            event.target.textContent = "Card Info";
        }
    });
}
console.log("✅ JavaScript - Consumer Card Info button (finished). ");
console.log("🟨 JavaScript - Blacklist button. ");
let blacklist_btn = document.getElementsByClassName("card-info-button");
for (var i = 0; i < blacklist_btn.length; i++) {
    blacklist_btn[i].addEventListener("click", function (event) {
        if (event.target.textContent === "Card Info") {
            event.target.textContent = "Hide Card Info";
        } else {
            event.target.textContent = "Card Info";
        }
    });
}
console.log("✅ JavaScript - Blacklist button (finished). ");
console.log("🟨 JavaScript - Consumer Bill Record. ");

var newConsumerCard = new consumerCard(
    "Card",
    "Default name",
    "Default merchant",
    "assets/images/samples/samples-card/customer-gift-card-sample-4.png",
    "Default card information",
    0,
    0,
    "Unknown",
    "Unknown",
    []
);
newConsumerCard.displayBillRecord();

console.log("✅ JavaScript - Consumer Bill Record (finished). ");
