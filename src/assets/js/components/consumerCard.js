console.log("🟨 JavaScript - Consumer Card Class. ");

class consumerCardBillRecord {
    constructor() {
        this.date = "Unknown"; 
        this.merchant = "Unknown"; 
        this.consAmount = 0; 
        this.balance = 0; 
        this.viewEther = "Unknown"; 
    }
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

    constructor() {
        cardID += 1; 
        this.id = cardID; 
        this.cardHeader = "Default header"; 
        this.cardName = "Default name"; 
        this.merchantName = "Default merchant"; 
        this.cardImage = "Card image"; 
        this.cardInformation = "Card information"; 
        this.cardMaxValue = 0; 
        this.cardRemValue = 0; 
        this.cardIssDate = "Unknown"; 
        this.cardExpDate = "Unknown"; 
        this.cardBilRecords = []; 

    }

    constructor(cH, cN, mN, cIm, cIn, cMV, cRV, cID, cED, cBR) {
        cardID += 1; 
        this.id = cardID; 
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

    /* add a consumer card to the consumer card list */
    /* input type: consumerCard class object */
    add(cC) {
        consumerCardList.push(cC);
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
        sessionStorage.setItem("consumerCardList", consumerCard.consumerCardList); 
    }

    /* change the static variable, targetCardID */
    setTargetCard(sTC_id) {
        targetCardID = sTC_id; 
        update(); 
    }

    /* sort all bill records for one card (given its cardID) */
    sortBillRecord(sBR_id, sBR_method) {
        var i = 0; 
        while (i < consumerCardList.length) {
            if (consumerCardList[i].id === sBR_id) {
                break; 
            }
        }
        switch(sBR_method) {
            case "date": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.date > b.date)}
            );
            case "date_reverse": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.date < b.date)}
            );
            case "merchant": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.merchant > b.merchant)}
            );
            case "merchant_reverse": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.merchant < b.merchant)}
            );
            case "consAmount": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.consAmount > b.consAmount)}
            );
            case "consAmount_reverse": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.consAmount < b.consAmount)}
            );
            case "balance": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.balance > b.balance)}
            );
            case "balance_reverse": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.balance < b.balance)}
            );
            case "viewEther": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.viewEther > b.viewEther)}
            );
            case "viewEther_reverse": consumerCardList[i].consumerCardList.sort(
                function(a, b) {return (a.viewEther < b.viewEther)}
            );
        }
    }

    /* add a single bill record (given its cardID) */
    addBillRecord(aBR_id, d, m, cA, b, vE) {
        let aBR_targetCard = null; 
        var i = 0; 
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

add(
    consumerCard(
        "Card 1", 
        "Default name", 
        "Default merchant", 
        "assets/images/samples/samples-card/customer-gift-card.png", 
        "Default card information", 
        0, 0, 
        "Unknown", 
        "Unknown")
)


console.log("✅ JavaScript - Consumer Card Class (finished). ");