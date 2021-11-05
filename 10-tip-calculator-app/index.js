var x;
var array = document.getElementsByClassName("tipBtn");

function solve(percent) {
    // var array = document.getElementsByClassName("tipBtn");    
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.innerHTML == ((percent*100) + "%") ) {
            element.style.backgroundColor = "var(--Modified-dark-grayish-cyan)";
        }

        else if (element.innerHTML != ((percent*100) + "%") ) {
            element.style.backgroundColor = "var(--dark-cyan)";
        }
        
    }

    x = document.getElementById("totalBill").value;
    document.getElementById("tipAmountTotal").innerHTML = "$" + ((x*percent).toFixed(2));  
    document.getElementById("tipAmountPerPerson").innerHTML = "$" + ((x*percent)/ document.getElementById("numberOfPeople").value).toFixed(2);
}

var userCustomPercentage = document.getElementById("custom");
userCustomPercentage.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        validate(e);
        solveCustom();
    }
});

function validate(e) {
    var text = e.target.value;
    //validation of the input...
}


function solveCustom() {
    var cutsomPercentage = (document.getElementById("custom").value) / 100;
    x = document.getElementById("totalBill").value;
    document.getElementById("tipAmountTotal").innerHTML = "$" + ((x*cutsomPercentage).toFixed(2));  
    document.getElementById("tipAmountPerPerson").innerHTML = "$" + ((x*cutsomPercentage)/ document.getElementById("numberOfPeople").value).toFixed(2);

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.style.backgroundColor = "var(--dark-cyan)";
    }
}

function resetAll() {
    document.getElementById("tipAmountTotal").innerHTML = "$0.00";  
    document.getElementById("tipAmountPerPerson").innerHTML = "$0.00";
    document.getElementById("totalBill").value = null;   
    document.getElementById("numberOfPeople").value = null;
    document.getElementById("custom").value = null;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.style.backgroundColor = "var(--dark-cyan)";
    }
}
