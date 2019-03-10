

$("#form1").on("submit", function (event){
    event.preventDefault();
    //console.log("B")
    getStock($("#stock").val())
});




var stocks_set = new Set()
var current_stock
 
function defaultPage(){
    if (localStorage.getItem('order') == '1'){
        sortByName()
    }else if (localStorage.getItem('order') == '2'){
        sortByPrice()
    }else if (localStorage.getItem('order') == '3'){
        sortByShare()
    }else if (localStorage.getItem('order') == '3'){
        sortByShare()
    }else if (localStorage.getItem('order') == '4'){
        sortByValue()
    }else{
        updatePage()
    }
}

defaultPage()

$("#by_name").click(function (event) {
    console.log(event)
    event.preventDefault();
    sortByName()
    event.preventDefault();
});

$("#by_price").click(function (event) {
    event.preventDefault();
    sortByPrice()
});

$("#by_share").click(function (event) {
    event.preventDefault();
    sortByShare()
});

$("#by_total").click(function (event) {
    event.preventDefault();
    sortByValue()
});




function getStock(data) {
    //consol=e.log('Check stocks set')
    //console.log(stocks_set)
    //console.log('new')
    //console.log(localStorage.getItem('stocks'))
    stocks_set = new Set(JSON.parse(localStorage.getItem('stocks')))
    $.ajax({
        type: 'GET',
        url: 'https://cloud.iexapis.com/beta/stock/' + data + '/quote?token=' + tmdb_api_key,
        dataType: 'json',
        success: handleStock
    });
}

function handleStock(data){
    //console.log(data)
    //console.log(JSON.parse(localStorage.getItem('' + data.symbol)))
    if ($("#buy").is(":checked")) {
        console.log('1')
        buyStock(data)
    } else {
        console.log('2')
        sellStock(data)
    }
    //buyStock(data)
    //sellStock(data)
    //console.log(localStorage.getItem('stocks'))
    //console.log('end')
    updatePage()

}

function buyStock(data){
    stocks_arr = JSON.parse(localStorage.getItem('stocks'))
    
    //console.log(stocks_arr)
    // if the stocks is empty
    if (isEmpty(stocks_arr)) {
        stocks_set.add(data.symbol)
    } else {
        stocks_set = new Set(stocks_arr)
        stocks_set.add(data.symbol)
    }
    localStorage.setItem('stocks', JSON.stringify(Array.from(stocks_set)));

    //console.log("Add One")
    current_stock = JSON.parse(localStorage.getItem(data.symbol))
    let number = $("#number").val()
    console.log(current_stock)
    if (isEmpty(current_stock)){
        current_stock = [data.close, 0]
    }
    //current_stock = [data.close, parseInt(current_stock[1])+1]
    current_stock[1] = parseInt(current_stock[1]) + parseInt(number)
    
    //console.log("Compare result")
    //console.log(`Before var stock: ${current_stock} storage: ${JSON.stringify(current_stock)}`)
    localStorage.setItem(data.symbol, JSON.stringify(current_stock));
    //console.log(`After var stock: ${current_stock} storage: ${JSON.stringify(current_stock)}`)
    //console.log(JSON.parse(localStorage.getItem('' + 'AAPL')))
    //var stocks = localStorage.getItem('stocks')
    //console.log(JSON.parse(stocks)) 
}


function sellStock(data) {
    stocks_arr = JSON.parse(localStorage.getItem('stocks'))
    //console.log(stocks_arr)
    //console.log(stocks_set)
    current_stock = JSON.parse(localStorage.getItem(data.symbol))

    
    //console.log(stocks_arr)
    //console.log(stocks_set)
    
    //var stocks = localStorage.getItem('stocks')
    //console.log(JSON.parse(stocks)) 

    current_stock = JSON.parse(localStorage.getItem(data.symbol))
    let number = $("#number").val()

    if (!isEmpty(current_stock) && parseInt(current_stock[1]) > 0 && (parseInt(current_stock[1])-number) >= 0) {
        current_stock[1] = parseInt(current_stock[1]) - parseInt(number)
        if (current_stock[1] == 0) {
            console.log('here')
            stocks_set = new Set(stocks_arr)
            stocks_set.delete(data.symbol)
        }
    } else {
        //current_stock = [data.close, parseInt(current_stock[1])+1]
        window.alert('Inexecutable command')
        console.log("empty")
    }

    localStorage.setItem('stocks', JSON.stringify(Array.from(stocks_set)));
    localStorage.setItem(data.symbol, JSON.stringify(current_stock));

}




// Update the page
function updatePage(){
    console.log('Update')
    stocks_set = new Set(JSON.parse(localStorage.getItem('stocks')))
    let output = '';
    let total = 0;

    output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                <a id='by_name' href> Stock </a>
            </div>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_price' href> Market Price </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_share' href> Share Owned </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_total' href> Total Value </a>
          </div>
          
        </div>
        <br>
        `;
    
    for (var it = stocks_set.values(), val = null; val = it.next().value;) {
        //console.log(val);
        price = JSON.parse(localStorage.getItem(val))
        total = total + parseFloat(price[0]) * parseFloat(price[1])
        //console.log(price)
        output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                ${val}
            </div>
          </div>
          <div class="col-md-3 column-margin">
                ${price[0]}
          </div>
          <div class="col-md-3 column-margin">
                ${price[1]}
          </div>
          <div class="col-md-3 column-margin">
                ${(parseFloat(price[0]) * parseFloat(price[1])).toFixed(2)}
          </div>
          
        </div>
        <br>
        `;
    }
    $('#portofolio').html(output);
    console.log(total)
    $('#total').html(total.toFixed(2))
}


function sortByName(){
    //window.alert("sort by name")
    localStorage.setItem('order', '1')
    stocks_set = new Set(JSON.parse(localStorage.getItem('stocks')))
    let output = '';
    let total = 0;

    output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                <a id='by_name' href> Stock </a>
            </div>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_price' href> Market Price </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_share' href> Share Owned </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_total' href> Total Value </a>
          </div>
          
        </div>
        <br>
        `;

    let stock_arr = Array.from(stocks_set)
    stock_arr.sort()
    console.log(stock_arr)
    for (i = 0; i < stock_arr.length; i++) { 
        //console.log(val);
        price = JSON.parse(localStorage.getItem(stock_arr[i]))
        total = total + parseFloat(price[0]) * parseFloat(price[1])
        //console.log(price)
        output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                ${stock_arr[i]}
            </div>
          </div>
          <div class="col-md-3 column-margin">
                ${price[0]}
          </div>
          <div class="col-md-3 column-margin">
                ${price[1]}
          </div>
          <div class="col-md-3 column-margin">
                ${(parseFloat(price[0]) * parseFloat(price[1])).toFixed(2)}
          </div>
          
        </div>
        <br>
        `;
    }
    $('#portofolio').html(output);
    console.log(total)
    $('#total').html(total.toFixed(2))

}

function sortByPrice() {
    //window.alert("sort by price")
    localStorage.setItem('order', '2')
    stocks_set = new Set(JSON.parse(localStorage.getItem('stocks')))
    let output = '';
    let total = 0;

    output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                <a id='by_name' href> Stock </a>
            </div>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_price' href> Market Price </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_share' href> Share Owned </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_total' href> Total Value </a>
          </div>
          
        </div>
        <br>
        `;

    let stock_arr = Array.from(stocks_set)
    let price_arr = []
    for (j = 0; j < stock_arr.length; j++){
        stock_detail = JSON.parse(localStorage.getItem(stock_arr[j]))
        price_arr.push([stock_arr[j], stock_detail[0], stock_detail[1]])
    }
    price_arr.sort(priceComparator)
    console.log(price_arr)
    for (i = 0; i < price_arr.length; i++) {
        //console.log(val);
        price = JSON.parse(localStorage.getItem(price_arr[i][0]))
        total = total + parseFloat(price[0]) * parseFloat(price[1])
        //console.log(price)
        output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                ${price_arr[i][0]}
            </div>
          </div>
          <div class="col-md-3 column-margin">
                ${price[0]}
          </div>
          <div class="col-md-3 column-margin">
                ${price[1]}
          </div>
          <div class="col-md-3 column-margin">
                ${(parseFloat(price[0]) * parseFloat(price[1])).toFixed(2)}
          </div>
          
        </div>
        <br>
        `;
    }
    $('#portofolio').html(output);
    console.log(total)
    $('#total').html(total.toFixed(2))

}

function sortByShare() {
    //window.alert("sort by price")
    localStorage.setItem('order', '3')
    stocks_set = new Set(JSON.parse(localStorage.getItem('stocks')))
    let output = '';
    let total = 0;

    output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                <a id='by_name' href> Stock </a>
            </div>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_price' href> Market Price </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_share' href> Share Owned </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_total' href> Total Value </a>
          </div>
          
        </div>
        <br>
        `;

    let stock_arr = Array.from(stocks_set)
    let price_arr = []
    for (j = 0; j < stock_arr.length; j++) {
        stock_detail = JSON.parse(localStorage.getItem(stock_arr[j]))
        price_arr.push([stock_arr[j], stock_detail[0], stock_detail[1]])
    }
    price_arr.sort(shareComparator)
    console.log(price_arr)
    for (i = 0; i < price_arr.length; i++) {
        //console.log(val);
        price = JSON.parse(localStorage.getItem(price_arr[i][0]))
        total = total + parseFloat(price[0]) * parseFloat(price[1])
        console.log(price)
        output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                ${price_arr[i][0]}
            </div>
          </div>
          <div class="col-md-3 column-margin">
                ${price[0]}
          </div>
          <div class="col-md-3 column-margin">
                ${price[1]}
          </div>
          <div class="col-md-3 column-margin">
                ${(parseFloat(price[0]) * parseFloat(price[1])).toFixed(2)}
          </div>
          
        </div>
        <br>
        `;
    }
    $('#portofolio').html(output);
    console.log(total)
    $('#total').html(total.toFixed(2))

}

function sortByValue() {
    //window.alert("sort by price")
    localStorage.setItem('order', '4')
    stocks_set = new Set(JSON.parse(localStorage.getItem('stocks')))
    let output = '';
    let total = 0;

    output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                <a id='by_name' href> Stock </a>
            </div>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_price' href> Market Price </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_share' href> Share Owned </a>
          </div>
          <div class="col-md-3 column-margin">
                <a id='by_total' href> Total Value </a>
          </div>
          
        </div>
        <br>
        `;

    let stock_arr = Array.from(stocks_set)
    let price_arr = []
    for (j = 0; j < stock_arr.length; j++) {
        stock_detail = JSON.parse(localStorage.getItem(stock_arr[j]))
        price_arr.push([stock_arr[j], stock_detail[0], stock_detail[1]])
    }
    price_arr.sort(totalValueComparator)
    console.log(price_arr)
    for (i = 0; i < price_arr.length; i++) {
        //console.log(val);
        price = JSON.parse(localStorage.getItem(price_arr[i][0]))
        total = total + parseFloat(price[0]) * parseFloat(price[1])
        console.log(price)
        output += `
        <div class="row">
          <div class="col-md-3">
            <div class="well text-center">
                ${price_arr[i][0]}
            </div>
          </div>
          <div class="col-md-3 column-margin">
                ${price[0]}
          </div>
          <div class="col-md-3 column-margin">
                ${price[1]}
          </div>
          <div class="col-md-3 column-margin">
                ${(parseFloat(price[0]) * parseFloat(price[1])).toFixed(2)}
          </div>
          
        </div>
        <br>
        `;
    }
    $('#portofolio').html(output);
    console.log(total)
    $('#total').html(total.toFixed(2))

}


// Check if a js object is empty
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function priceComparator(a, b) {
    return (a[1] < b[1]) ? 1 : -1;
}

function shareComparator(a, b) {
    return (a[2] < b[2]) ? 1 : -1;
}

function totalValueComparator(a, b) {
    return (a[1] * a[2] < b[1]*b[2]) ? 1 : -1;
}