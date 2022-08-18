console.log("🟨 JavaScript - Consumer Card Class. ");

const path = require("path");
app.use("/assets", express.static(path.join(__dirname, "assets")));
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

    constructor(cH, cN, mN, cIm, cIn, cMV, cRV, cID, cED, cBR) {
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
        this.cardBilRecords = cBR;
    }

    find_ID(fID) {
        var i = 0;
        while (i < consumerCardList.length) {
            if (consumerCardList[i].id === fID) {
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
    add(cC) {
        consumerCard.consumerCardList.push(cC);
    }

    displayConsumerCard() {
        var consumerCard_UI =
            document.getElementsByClassName("JS-consumer-cards");
        for (var i = 0; i < consumerCard_UI.length; i++) {
            consumerCard_UI[i].innerHTML = "";
            for (var j = 0; j < consumerCardList.length; j++) {
                consumerCard_UI[i].insertAdjacentHTML(
                    "afterend",
                    '<br><div class="card consumer-card" id="example ID">' +
                        '<br><div class="card-header"><h3 class="card-title">Card 1</h3></div>' +
                        '<br><div class="card-body"><p>' +
                        '<br>    <div><text class="card-category">Card Name  </text><text class="card-text">Default name</text></div>' +
                        '<br>    <div><text class="card-category">Merchant Name  </text><text class="card-text">Default merchant</text></div>' +
                        '<br>    <div class="card-image"><img class="img-fluid w-100" src="assets/images/samples/samples-card/customer-gift-card.png" alt="The Card Image cannot be displayed"></div>' +
                        '<br>    <div class="empty-line"></div><div><text class="card-text">Default card information</text></div><div class="empty-line"></div>' +
                        '<br>    <div><button class="card-info-button" type="button" data-bs-toggle="collapse" data-bs-target="#card-info" aria-expanded="true" aria-controls="card-info">Card Info</button></div></p>' +
                        '<br><div class="collapse" id="card-info">' +
                        '<br>    <div><text class="card-category darkgreen">Remaining value  </text><text class="card-text">Unknown</text></div>' +
                        '<br>    <div><text class="card-category red">Expiration time  </text><text class="card-text">Unknown</text></div>' +
                        '<br>    <div id="default-consumer-card"><a onclick="consumerCard.setTargetCard(this.id)" href="consumer-bill-records.html" class="card-category grey card-link">Bill records</a></div>' +
                        '<br>    <div><a href=# class="card-category grey card-link">Add black list</a></div>' +
                        '<br>    <div class="empty-line"></div></div></div></div>'
                );
            }
        }
    }

    /* remove a customer card from the database (given its cardID) */
    remove(r_id) {
        for (var i = 0; i < consumerCardList.length; i++) {
            if (consumerCardList[i].id === r_id) {
                consumerCardList.splice(i, 1);
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
        targetCardID = sTC_id;
        update();
    }

    /* sort all bill records for one card (given its cardID) */
    sortBillRecord(sBR_id, sBR_method) {
        var i = find_ID(sBR_id);
        switch (sBR_method) {
            case "date":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.date > b.date;
                });
            case "date_reverse":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.date < b.date;
                });
            case "merchant":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.merchant > b.merchant;
                });
            case "merchant_reverse":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.merchant < b.merchant;
                });
            case "consAmount":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.consAmount > b.consAmount;
                });
            case "consAmount_reverse":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.consAmount < b.consAmount;
                });
            case "balance":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.balance > b.balance;
                });
            case "balance_reverse":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.balance < b.balance;
                });
            case "viewEther":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.viewEther > b.viewEther;
                });
            case "viewEther_reverse":
                consumerCardList[i].consumerCardList.sort(function (a, b) {
                    return a.viewEther < b.viewEther;
                });
        }
    }

    /* add a single bill record (given its cardID) */
    addBillRecord(aBR_id, d, m, cA, b, vE) {
        var i = find_ID(aBR_id);
        while (i < consumerCardList.length) {
            if (consumerCardList[i].id === aBR_id) {
                break;
            }
        }
        if (i != consumerCardList.length) {
            consumerCardList[i].cardBilRecords.push(
                consumerCard.consumerCardBillRecord(d, m, cA, b, vE)
            );
        }
        sortBillRecord(aBR_id, "date");
    }
}

var newConsumerCard = new consumerCard(
    "Card 1",
    "Default name",
    "Default merchant",
    "assets/images/samples/samples-card/customer-gift-card.png",
    "Default card information",
    0,
    0,
    "Unknown",
    "Unknown",
    []
);
newConsumerCard.add(newConsumerCard);
newConsumerCard.displayConsumerCard();

console.log("✅ JavaScript - Consumer Card Class (finished). ");
