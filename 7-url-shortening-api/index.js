function validateForm() {
    var x = document.forms["urlForm"]["urlBox"].value;
    if (x == "") {
        // alert("Please input a Value");
        
        // console.log(document.querySelector('.userUrlTextBox').style);

        // document.querySelector('.userUrlTextBox').style.borderColor = "red";
        // console.log(document.querySelector('.userUrlTextBox').style.borderColor);

        document.querySelector('.userUrlTextBox').style.border = "2px solid var(--red)";
        // console.log(document.querySelector('.userUrlTextBox').style.border);        
        // console.log(document.querySelector('.userUrlTextBox'));
        
        var y = document.querySelector('.userUrlTextBox');
        // console.log(y);
        var z = y.placeholder;
        // console.log(z);
        // z.style.color = "red";


        var textBoxes = document.getElementsByTagName("input");
        console.log(textBoxes)
        for (var i = 0; i < textBoxes.length; i++) {
            if (textBoxes[i].type == "url") {
                if (!textBoxes[i].value) {
                    textBoxes[i].className += " Red";
                }
            }
        }

        document.querySelector('.alertMessage').innerHTML = "PLease add a link";



        // return false;
    }
    
    else {

        // alert("aa")
        
        // $.post("https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io")
        // .then((Response)=> {
        //     console.log(Response)
        // })
        // .catch((error)=> {
        //     console.log(error)
        // })
        // console.log("a")
        
        // https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io

        // console.log("a");
        // var data = "s";
        // $.post("https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io", function(data){
        //     // alert(data);
        // });
    
        // $.ajax({
        //     type: "POST",
        //     url: "https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io",
        //     data: String,
        //     success: null,
        //     dataType: text
        // });

        // $.post( "https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io", function( data ) {
        //     $( ".result" ).html( data );
        // });
        

        // var my_javascript_variable = <?php echo json_encode($_POST['my_post'] ?? null) ?>;
        
        // var jqxhr = $.post( "https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io", function() {
        //     alert( "success" );
        //   });

        //   var jqxhr = $.post( "https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io", function() {
        //     alert( "success" );
        //   })
        //     .done(function() {
        //       alert( "second success" );
        //     })
        //     .fail(function() {
        //       alert( "error" );
        //     })
        //     .always(function() {
        //       alert( "finished" );
        //     });
           


        // var z = JQuery.post("https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io")

        // method="POST"
        // action="https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io";
        // document.post();
        // console.log(jqxhr);

        // return true;

        // var $data = $('#data');
        // console.log($('test4'));
        // $.ajax({
        //     type: 'post',
        //     url: 'https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io',
        //     success: function(data) {
        //     // console.log('success', data);
        //         $.each(data, function(i, item) {
        //             $data.append('<li>'+ item.short_link +'</li>');
        //         });
        //     }
        // });
        // alert("working");
        // console.log(x);
        $(function (){

            var $data = $('#data');
            $.ajax({
                type: 'post',
                url: 'https://api.shrtco.de/v2/shorten?url=' + x,
                success: function(data) {
                    var temp = data.result.full_short_link;
                    // console.log('success', data);
                    console.log(temp);
                    console.log(x);
                    $data.append('<li class="usageHistory"><div class="testBox"><div class="enteredUrl">'+ x +'</div><div class="shortenedUrl">'+ temp +'</div></div><button type="button" class="btn cyanBtn copyBtn">Copy</button></li>');
                    // $data.append('<li>'+ temp +'</li>');

                    // $.each(data, function(i, item) {
                    //     $data.append('<li>'+ item.short_link +'</li>');
                    //     // console.log(item);
                    // });
                }
            });
            
            // console.log($data);
        
        });
        
        // return false;

    }

};


// $(function (){

//     var $data = $('#data');
//     console.log($('test4'));
//     $.ajax({
//         type: 'post',
//         url: 'https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io',
//         success: function(data) {
//             // console.log('success', data);
//             $.each(data, function(i, item) {
//                 $data.append('<li>'+ item.short_link +'</li>');
//             });
//         }
//     });

// });