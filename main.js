
$('.entry form').submit(setForex);

var currencies = {
    first: "",
    second: "",
    third: ""
};

function setForex(e){
    e.preventDefault();
    currencies.first = $('.first_cur').val();
    currencies.second = $('.second_cur').val();
    currencies.third = $('.third_cur').val();
    if (currencies.first == currencies.second || currencies.first == currencies.third
        || currencies.second == currencies.third){
        $('.msg').text('plase choose different currencies');
        return;
    }
    $('.entry').remove();
    $('#update_now, #convert_now').removeClass('undisplay');
    var promise = new Promise(function (resolve, reject) {    
        $.get( "view/forex.html", function(data) {
            resolve(data);
        })    
    }).then(function(data){
           $('main').html(data);   
    }).then(function(){   
           GetValues();
           setInterval(function(){
               GetValues(); 
               console.log('ok')
           }, 10000
           );
    });
}

function GetValues(){
    if(currencies.first == "USD"){
        $.get( "https://forex.1forge.com/1.0.2/quotes?pairs=" + currencies.first + "EUR," + currencies.second +"USD," + currencies.third + "USD&api_key=TpuXmI6AbAJSPoCQTCpfepcL7RapLn2N" , setCurrentValues);   
    }else{
        if(currencies.second == "USD"){
            $.get( "https://forex.1forge.com/1.0.2/quotes?pairs=" + currencies.first + "USD," + currencies.second +"EUR," + currencies.third + "USD&api_key=TpuXmI6AbAJSPoCQTCpfepcL7RapLn2N", setCurrentValues);   
        }else{
            if(currencies.third == "USD"){
               $.get( "https://forex.1forge.com/1.0.2/quotes?pairs=" + currencies.first + "USD," + currencies.second +"USD," + currencies.third + "EUR&api_key=TpuXmI6AbAJSPoCQTCpfepcL7RapLn2N", setCurrentValues);   
            }else{
                    $.get( "https://forex.1forge.com/1.0.2/quotes?pairs=" + currencies.first + "USD," + currencies.second +"USD," + currencies.third + "USD&api_key=TpuXmI6AbAJSPoCQTCpfepcL7RapLn2N", setCurrentValues);   
            }   
        }
    }
}

function setCurrentValues(data){
    $('#aud_time_val').text(getTimeFromTimestamp(data[0].timestamp*1000)); 
    $('#aud_price_val').text(data[0].price);
    $('#aud_symbal_val, .first_h3').text(data[0].symbol);
    $('#gbp_time_val').text(getTimeFromTimestamp(data[1].timestamp*1000));
    $('#gbp_price_val').text(data[1].price);
    $('#gbp_symbol_val, .second_h3').text(data[1].symbol);
    $('#jpy_time_val').text(getTimeFromTimestamp(data[2].timestamp*1000));
    $('#jpy_price_val').text(data[2].price);
    $('#jpy_symbol_val, .third_h3').text(data[2].symbol);  
}

$('#update_now').click(function(){
    GetValues();  
    console.log('up');
})

function getTimeFromTimestamp(timestamp){
    var time = new Date(timestamp);
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    var realTime = h + ":" + m + ":" + s;
    return realTime;
}

$('#convert_now').click(getConverter);

function getConverter(){
    var promise = new Promise(function (resolve, reject) {    
        $.get( "view/converter.html", function(data) {
            resolve(data);
        })    
   }).then(function(data){
         $('.converter_container').html(data);
   }).then(function(){
         $('.converter_container form').submit(convert);
   });
}

function convert(e){
    e.preventDefault();
    var Forex = $('select').val();
    var con = Forex.substring(0, 3);
    var to = Forex.substring(4,7);
    var quantity = $('input[type="number"]').val();
    $.get( "https://forex.1forge.com/1.0.2/convert?from=" + con + "&to=" + to + "&quantity=" + quantity + "&api_key=TpuXmI6AbAJSPoCQTCpfepcL7RapLn2N", function(result){
         $('#result').text(result.value);
    });
};
 



