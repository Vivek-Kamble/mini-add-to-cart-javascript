const productDetails = [  
    {  
        name:"Tang Mango Drink",  
        price:200,  
        imageUrl:"http://tiny.cc/ui5snz",  
        qty:10  
    },  
    {  
        name:"Tata Gold Tea Pouch",  
        price:235,  
        imageUrl:"http://tiny.cc/sk5snz",  
        qty:15  
    },  
    {  
        name:"Cadbury Bournvita",  
        price:210,  
        imageUrl:"http://tiny.cc/dl5snz",  
        qty:20  
    },  
    {  
        name:"Maaza Mango",  
        price:65,  
        imageUrl:"http://tiny.cc/3l5snz",  
        qty:35  
    },  
    {  
        name:"Lipton Honey Green Tea",  
        price:135,  
        imageUrl:"http://tiny.cc/in5snz",  
        qty:25  
    }  
]  
//variables declaration
var cartDetails = [];
var orderqty=1;

//getting stock value
var stock = []

function cart()
{
    var modalId= document.getElementById('modal-body');    
    modalCount=modalId.childElementCount;
   
    if(modalCount>=0)
    {
        var modalId= document.getElementById('modal-body');
        modalId.innerHTML="";       
    }
    if(cartDetails.length==0)
    {   
        document.getElementById('cart-counter').style.visibility="hidden";
        emptyCartAlert()
    }
    var modalCartString = "";
       if(cartDetails.length>0)
       {
        for (i=0;i<cartDetails.length;i++)
        {       
            
            modalCartString=modalCartString.concat(` 
            <div class="modal-item" id="modal-item-id${i}">
                <p class="modal-product-name">${cartDetails[i].name}</p>
                <button class="modal-sub" onclick="quantityChange(${i},'sub')">-</button>
                <input id="qty-view${i}" type="number" onchange="quantityChange(${i},'changePrice')" value="${cartDetails[i].orderqty}" class="modal-qty">
                <button onclick="quantityChange(${i},'add')" class="modal-plus">+</button>
                <p class="modal-product-rupee">₹​ </p>
                <p id="model-product-price${i}" class="modal-product-price">${cartDetails[i].orderqty*cartDetails[i].price}</p>
                <button onclick="removeElement(${i})" class="btn btn-danger modal-remove">Remove Item</button>
            </div>`)

        };
        modalId.innerHTML = modalCartString;
       }
    
}

//function to change quantity in modal
function quantityChange(index,op)
{
    // cart();
    if(cartDetails[index].orderqty>0)
    {
        var val = parseInt(document.getElementById("qty-view"+index).value,10);
       if(val>0)
       {
        if(op=='add')
        {
            
            cartDetails[index].orderqty= val+1;
            // console.log("value"+ val)
            // console.log(cartDetails[index].orderqty)
            // console.log("index  "+index)


            // cartDetails[check].orderqty = cartDetails[check].orderqty+1
        }
        //if op is 'sub'
        else if(op=='sub')
        {   
            if(cartDetails[index].orderqty==1) {                               
                removeElement(index); 
                return 0;               
            }
            else{                
                cartDetails[index].orderqty= val-1;
            }
        }
        else{
            cartDetails[index].orderqty= val;
        }
       }
        // cart();
    }
    document.getElementById("qty-view"+index).value=cartDetails[index].orderqty;
    document.getElementById("model-product-price"+index).innerText=cartDetails[index].orderqty*cartDetails[index].price
    
        // document.getElementById('cart-counter').style.visibility="hidden";
        // cart()  
}
function emptyCartAlert()
{
    var modalId= document.getElementById('modal-body');
        var cartEmpty = document.createElement('p');
        var cartEmptyText = document.createTextNode('Your Cart is empty...');
        cartEmpty.classList.add('alert-danger','alert')
        cartEmpty.setAttribute("id","empty-id")
        cartEmpty.appendChild(cartEmptyText);
        modalId.appendChild(cartEmpty)
}
function removeElement(index)
{   
    cartDetails.splice(index,1)
    cart();//refresh cart
    if(cartDetails.length==0)
    {
        badgeUp(false)    
        // emptyCartAlert()    

    }
    else{
        badgeUp(true);
    }
        // document.getElementById("modal-item-id"+index).remove();
}

function addToCart(index)
{
    
    tilt();//for tilting cart icon
   
    //if productDetails[index].name find in cartdetails.name
    //then only quantity increment
    // oterwise add product in cart

    // to check whether product is in cart
    var check = cartDetails.findIndex(x=>x.name==productDetails[index].name)

    if( check!=-1)
    {
        // cartDetails[check].orderqty = cartDetails[check].orderqty+1
        // var val = parseInt(document.getElementById("qty-view"+check).value,10);
        // console.log(val)
        quantityChange(check,'add')
        // console.log(cartDetails);//check to view cart
    }

    else{
        cartDetails.push({name:productDetails[index].name,price:productDetails[index].price,orderqty:orderqty})
        // console.log(cartDetails);//check to view cart
        badgeUp(true);
    }
    
    
    cart();
    
    
}
function badgeUp(badgeFlag)
{   

    // if true then ++ up
    if(badgeFlag==true)
    {
    document.getElementById('cart-counter').innerText=cartDetails.length; 
    document.getElementById('cart-counter').style.visibility="visible"
    }
    else{
        document.getElementById('cart-counter').style.visibility="hidden";
    }
    // console.log(cartDetails.length);    
}

function tilt()
{
    var id=document.getElementById('cart-image');
    id.classList.add('run-cart-animation');
    setTimeout(()=>{
        id.classList.remove('run-cart-animation')
    },500)
}

///creating items element
window.onload=addElement;
// document.body.onload=addElement;
function addElement () { 
    storageCreate()
    var eles = document.getElementById("items");

    var itemString = "";
    for(i=0;i<productDetails.length;i++)
  { 

    itemString= itemString.concat(`
    <div class="item">
        <img src="${productDetails[i].imageUrl}">
            <p class="product-name">${productDetails[i].name}</p>
            <p class="product-price">Rs. ${productDetails[i].price}</p>
            <button onclick="buy(${i})" id="buy${i}" data-toggle="modal" data-target="#invoice-modal" class="btn btn-primary">BUY</button>
            <button id="add${i}" onclick="addToCart(${i})" class="btn btn-primary">Add to Cart</button>
            <div class="alert alert-warning out-of-stock" id="out-of-stock${i}" style="visibility: hidden;">Out of Stock</div>
    </div>`)
    // var currentDiv = document.getElementById("div1"); 
    // eles.insertBefore(cart, currentDiv);
      //console.log(productDetails[i].name)
  }
  //inserting html elements   
  eles.innerHTML=itemString;
  outOfStockDisplayChange()
  
}
// addElement()

//logic to buy button
function buy(index)
{
    // console.log(index)
    cartDetails = [];
    cartDetails.push({name:productDetails[index].name,price:productDetails[index].price,orderqty:orderqty});
    // console.log(cartDetails)
    badgeUp(true);
    makeInvoice();

}

/// invoice creation
function makeInvoice()
{
   var invoiceid=document.getElementById('modal-invoice');

    //    generate orderid
    orderId = Math.floor(Math.random() * Math.pow(10, 8)) + 1;

    document.getElementById('order-id').innerText="Order Id : "+orderId;



   var totalPrice=0;
    invoiceid.innerHTML=""
//    console.log('check1');
   var orderItemString = ""
   for (i=0;i<cartDetails.length;i++)
   {     
    var itempricevalue=cartDetails[i].orderqty*cartDetails[i].price     
       orderItemString = orderItemString.concat(`
    <div class="order-item" id="order-item-id${i}">
        <p class="order-product-name">${cartDetails[i].name}</p>
        <div class="orderpricecontainer">
            <p class="order-product-rupee">₹​ </p>
            <p id="order-product-price${i}" class="order-product-price">${cartDetails[i].price} X ${cartDetails[i].orderqty} = ${itempricevalue}</p>
        </div>
    </div>`)

       
//    calculating total price
   totalPrice=totalPrice+itempricevalue;
   
   

};
invoiceid.innerHTML = orderItemString;
document.getElementById('final_invoice_price').innerHTML=totalPrice
// console.log(totalPrice);

}

//place your order
function placedOrder(){
    // storageUpdate()
    multipleItemsCheck()
    // console.log(cartDetails);    
    cartDetails = []
    cart()
}
// localStorage.setItem('value', 1);

function storageCreate()
{
    if(localStorage.getItem('stock'))
    {
        stock = JSON.parse(localStorage.getItem('stock'));
        }
    else
    {
        let stockDetails = []
        for(i=0;i<productDetails.length;i++)
        {
          stockDetails.push({name:productDetails[i].name,stockQty:productDetails[i].qty})          
        }
        // console.log(stockDetails)

        localStorage.setItem('stock',JSON.stringify(stockDetails));
        stock = JSON.parse(localStorage.getItem('stock'));
        // console.log("else "+ localStorage.getItem('stock'));
        
    }
    // localStorage.clear()
      
}

function outOfStockDisplayChange()
{
    for(i=0;i<productDetails.length;i++)
    {
      if(stock[i].stockQty==0)
      {    
        document.getElementById("buy"+i).style.display="none"
        document.getElementById("add"+i).style.display="none"
        document.getElementById('out-of-stock'+i).style.visibility="visible"
      }
    }




}

function multipleItemsCheck()
{   
    var multipleItemsFlag=0;
    for(i=0;i<cartDetails.length;i++)
    {
        check=stock.findIndex(x=>x.name==cartDetails[i].name)
        if(stock[check].stockQty-cartDetails[i].orderqty>=0)
        {
            multipleItemsFlag=multipleItemsFlag+1
            console.log(cartDetails[i].name + multipleItemsFlag);            
        }
        else{
            multipleItemsFlag=multipleItemsFlag - 1
            console.log(cartDetails[i].name + multipleItemsFlag);
        }
    }
    console.log(multipleItemsFlag);
    
    if(multipleItemsFlag==cartDetails.length)
    {
        storageUpdate()
    }
    else
    {
        document.getElementById('check-body').style.display="none";
        document.getElementById('exceed').style.display="block"
    }
}

function storageUpdate()
{
    for (i=0;i<cartDetails.length;i++)
        {
            check=stock.findIndex(x=>x.name==cartDetails[i].name)
            if(check>=0)
            {                
                if(stock[check].stockQty-cartDetails[i].orderqty<=0)
                {                    
                    if(stock[check].stockQty-cartDetails[i].orderqty==0)
                    {                        
                        document.getElementById('check-body').style.display="block";
                        document.getElementById('exceed').style.display="none"
                        //buy button remove
                        
                        //product cannot be added it exceeds the stock value
                        //the stock gooes in -ve                    

                        stock[check].stockQty=stock[check].stockQty-cartDetails[i].orderqty;
                        outOfStockDisplayChange()
                    }
                        
                    else{
                        document.getElementById('check-body').style.display="none";
                       
                        document.getElementById('exceed').style.display="block";
                       
                    }

                }
                
                else{
                    // console.log('else');
                    
                    stock[check].stockQty=stock[check].stockQty-cartDetails[i].orderqty;
                    document.getElementById('exceed').style.display="none";
                    document.getElementById('check-body').style.display="block";
                    // console.log('after');
                    
                }
                
                   
            }
        }
        localStorage.setItem('stock',JSON.stringify(stock));
}