function myFunction() {
  var checkBox = document.getElementById("myCheck");
  // var text = document.getElementById("test1");
  // var left = document.querySelector(".leftCard .blackPrice").innerHTML;
  // console.log(left);
  if (checkBox.checked == true){
    document.querySelector(".leftCard .blackPrice").innerHTML = "19.99";
    document.querySelector(".centerCard .whitePrice").innerHTML = "24.99";
    document.querySelector(".rightCard .blackPrice").innerHTML = "39.99";

    // text.innerHTML = "bbb";
  } else {
     // text.innerHTML = "aaa";
     document.querySelector(".leftCard .blackPrice").innerHTML = "199.99";
     document.querySelector(".centerCard .whitePrice").innerHTML = "249.99";
     document.querySelector(".rightCard .blackPrice").innerHTML = "399.99";

   }
}
