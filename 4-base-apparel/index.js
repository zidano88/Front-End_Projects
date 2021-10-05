// const checkEmpty = document.querySelector('#subBtn');
// checkEmpty.addEventListener('input', function () {
//   if (checkEmpty.value && // if exist AND
//     checkEmpty.value.length > 0 && // if value have one charecter at least
//     checkEmpty.value.trim().length > 0 // if value is not just spaces
//   )
//   { console.log('value is:    '+checkEmpty.value);}
//   else {alert('No value');
//   }
// });

// var elem,
//     style;
// elem = document.querySelector('.eAddress');
// style = getComputedStyle(elem);
// console.log(style.borderColor);

// console.log(document.querySelector('.eAddress'));

// console.log(document.getElementById('test1').placeholder);
// console.log(document.getElementById('test1').style);

// document.querySelector('.eAddress').placeholder = "AA";

// var element = $('.eAddress');
// style = window.getComputedStyle(element),
//    top = style.getPropertyValue('top');
//
// var elem,
//     style;
// elem = document.querySelector('.eAddress');
// style = getComputedStyle(elem);
// console.log(style.borderColor);

function validateForm() {
  var x = document.forms["emailForm"]["emailValue"].value;
  if (x == "") {
    // var elem,
    //     style;
    // elem = document.querySelector('.eAddress');
    // style = getComputedStyle(elem);
    // style.borderColor = red;
    // console.log(style.borderColor);
    // document.querySelector('.eAddress').placeholder = "AA";
    document.querySelector('.eAddress').style.borderColor = "var(--soft-red)";
    document.querySelector('.alertMessage').innerHTML = "Please provide a valid email";
    document.querySelector('.errorIcon').style.visibility = "visible";
    // console.log(document.querySelector('.errorIcon'));
    // var elem1,
    //     style1;
    // elem1= document.querySelector('.eAddress');
    // style1 = getComputedStyle(elem1);
    // console.log(style1.borderColor);


    // style.borderColor = "blue";
    // console.log(style.borderColor);
    // alert("Name must be filled out");
    // style.borderColor = "red";
    // document.querySelector('.eAddress').css('borderColor', "red");
    // document.querySelector(".eAddress")[0].style.bordercolor = red;
    return false;
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x.value)) {
    return (true)
  }
  else {
    document.querySelector('.eAddress').style.borderColor = "var(--soft-red)";
    document.querySelector('.alertMessage').innerHTML = "Please provide a valid email";
    document.querySelector('.errorIcon').style.visibility = "visible";
    console.log(document.querySelector('.errorIcon'));
    return (false)
  }

}
