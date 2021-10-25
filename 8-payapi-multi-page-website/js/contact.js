function validateForm() {
    var x = document.forms["emailForm"][emailValue].value;
    if (x =="") {
        
        document.querySelector('.eAddress').style.borderColor = "var(--soft-red)";
        document.querySelector('.alertMessage').innerHTML = "Please provide a valid email";
        document.querySelector('.errorIcon').style.visibility = "visible";
    
        return (false);

    } 
    
    else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x.value)) {
        return (true)
    }
    
    else {
        document.querySelector('.eAddress').style.borderColor = "var(--soft-red)";
        document.querySelector('.alertMessage').innerHTML = "Please provide a valid email";
        document.querySelector('.errorIcon').style.visibility = "visible";
        return (false)
    }
}