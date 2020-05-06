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
    
    // console.log("cart clicked");
    var modalId= document.getElementById('modal-body');
    
    
    modalCount=modalId.childElementCount;
    // console.log("before removing"+modalCount);
    // console.log("cartdetails"+cartDetails.length)

    
   
    if(modalCount>=0)
    {
        // let modId=document.getElementById('modal-item-id');
        // modId.remove();
        var modalId= document.getElementById('modal-body');
        modalId.innerHTML=""
    }
    if(cartDetails.length==0)
    {   
        document.getElementById('cart-counter').style.visibility="hidden";
        // console.log(modalId);
        var cartEmpty = document.createElement('p');
        var cartEmptyText = document.createTextNode('Your Cart is empty...');
        cartEmpty.classList.add('alert-danger','alert')
        cartEmpty.setAttribute("id","empty-id")
        cartEmpty.appendChild(cartEmptyText);
        modalId.appendChild(cartEmpty)      

        
    }
    // var id= document.getElementById('modal-body');
    // modalCount=id.childElementCount;
    // console.log("after removing"+modalCount);    
    
    // cartDetails.forEach(element => 
        for (i=0;i<cartDetails.length;i++)
        {        
        var modalCart = document.createElement("div");
        modalCart.classList.add("modal-item") 
        modalCart.setAttribute("id","modal-item-id"+i)

        //item name
        var itemName = document.createElement('p')
        var itemNameText = document.createTextNode(cartDetails[i].name)
        itemName.classList.add('modal-product-name')
        itemName.appendChild(itemNameText)
        modalCart.appendChild(itemName)

        //qty decrement button
        var sub = document.createElement('button');
        var subText = document.createTextNode('-');
        sub.classList.add('modal-sub');
        sub.setAttribute("onclick","quantityChange("+i+",'sub')");
        sub.appendChild(subText);
        modalCart.appendChild(sub);
        
        //qty display
        var qtyView= document.createElement('input');
        // var qtyViewText = document.createTextNode(cartDetails[i].orderqty);
        qtyView.setAttribute("id","qty-view"+i)
        qtyView.setAttribute("type", "number");
        qtyView.setAttribute("onchange","quantityChange("+i+",'changePrice')");
        qtyView.setAttribute("value",cartDetails[i].orderqty);
        qtyView.classList.add('modal-qty')
        // qtyView.appendChild(qtyViewText)
        modalCart.appendChild(qtyView)
        
        //plus button qty increment
        var plus = document.createElement('button');
        var plusText = document.createTextNode('+');
        plus.appendChild(plusText);
        plus.setAttribute("onclick","quantityChange("+i+",'add')");
        plus.classList.add('modal-plus');
        modalCart.appendChild(plus);

        //rupee
        var rupee= document.createElement('p')
        var rupeeText = document.createTextNode("₹​ ")
        rupee.classList.add("modal-product-rupee")
        rupee.appendChild(rupeeText)
        modalCart.appendChild(rupee)

        //item price
        var itemprice = document.createElement('p')
        var itempriceText = document.createTextNode(cartDetails[i].orderqty*cartDetails[i].price)
        itemprice.setAttribute("id","model-product-price"+i)
        itemprice.classList.add('modal-product-price')
        itemprice.appendChild(itempriceText)
        modalCart.appendChild(itemprice)

        //removing item from the list
        var removeitem=document.createElement('button');
        var removeitemText=document.createTextNode('Remove Item')
        removeitem.appendChild(removeitemText);
        removeitem.setAttribute("onclick",'removeElement('+i+')')
        removeitem.classList.add('btn','btn-danger','modal-remove');
        modalCart.appendChild(removeitem)



        modalId.appendChild(modalCart)
    };
    
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

function removeElement(index)
{   
    cartDetails.splice(index,1)
    cart();//refresh cart
    if(cartDetails.length==0)
    {
        badgeUp(false)
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
    for(i=0;i<productDetails.length;i++)
  { 
    var cart = document.createElement("div");
    cart.classList.add("item") 
    
    //image tag
    var newImg=document.createElement("IMG");
    newImg.setAttribute("src",productDetails[i].imageUrl)
    cart.appendChild(newImg)
    
    //p tag
    var newP = document.createElement("p")
    var newPText =document.createTextNode(productDetails[i].name); 
    newP.appendChild(newPText)
    newP.classList.add("product-name")
    cart.appendChild(newP);

    //price tag
    var price=document.createElement("p");
    var priceText = document.createTextNode("Rs. "+productDetails[i].price);
    price.appendChild(priceText);
    price.classList.add("product-price");
    cart.appendChild(price);

    //buy button
    var buyBtn = document.createElement("button");
    var buyBtnText = document.createTextNode("BUY");
    buyBtn.appendChild(buyBtnText);
    buyBtn.setAttribute("onclick","buy("+i+")");
    buyBtn.setAttribute("id","buy"+i);
    buyBtn.setAttribute("data-toggle","modal")
    buyBtn.setAttribute("data-target","#invoice-modal")
    buyBtn.classList.add("btn","btn-primary");
    cart.appendChild(buyBtn);

    //add to cart button 
    var cartBtn = document.createElement("button");
    var cartBtnText = document.createTextNode("Add to Cart");
    cartBtn.appendChild(cartBtnText);
    cartBtn.setAttribute("id","add"+i);
    cartBtn.setAttribute("onclick","addToCart("+i+")");
    cartBtn.classList.add("btn","btn-primary");
    cart.appendChild(cartBtn);

    var outOfStock=document.createElement('div');
    var outOfStockText=document.createTextNode('Out of Stock');
    outOfStock.classList.add('alert','alert-warning','out-of-stock');
    outOfStock.style.visibility="hidden";
    outOfStock.setAttribute('id','out-of-stock'+i)
    outOfStock.appendChild(outOfStockText);
    cart.appendChild(outOfStock);

    eles.appendChild(cart)

    if(stock[i].stockQty==0)
    {
        outOfStockDisplayChange(i)
    }

    // var currentDiv = document.getElementById("div1"); 
    // eles.insertBefore(cart, currentDiv);
      //console.log(productDetails[i].name)
  }

   
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
   
   for (i=0;i<cartDetails.length;i++)
   {        
   var orderlist = document.createElement("div");
   orderlist.classList.add("order-item") 
   orderlist.setAttribute("id","order-item-id"+i)

   //item name
   var itemName = document.createElement('p')
   var itemNameText = document.createTextNode(cartDetails[i].name)
   itemName.classList.add('order-product-name')
   itemName.appendChild(itemNameText)
   orderlist.appendChild(itemName)
    
   //rupee container
   var orderpricecontainer=document.createElement('div')
   orderpricecontainer.classList.add('orderpricecontainer')

   //rupee
   var rupee= document.createElement('p')
   var rupeeText = document.createTextNode("₹​ ")
   rupee.classList.add("order-product-rupee")
   rupee.appendChild(rupeeText)
   orderpricecontainer.appendChild(rupee)
   
   //item price
   var itemprice = document.createElement('p')
   var itempricevalue=cartDetails[i].orderqty*cartDetails[i].price
   var itempriceText = document.createTextNode(cartDetails[i].price+" X "+cartDetails[i].orderqty+" = "+itempricevalue)
   itemprice.setAttribute("id","order-product-price"+i)
   itemprice.classList.add('order-product-price')
   itemprice.appendChild(itempriceText)
   orderpricecontainer.appendChild(itemprice)

   orderlist.appendChild(orderpricecontainer)
   
//    calculating total price
   totalPrice=totalPrice+itempricevalue;
   
   invoiceid.appendChild(orderlist)

};
document.getElementById('final_invoice_price').innerHTML=totalPrice
// console.log(totalPrice);

}

//place your order
function placedOrder(){
    storageUpdate()
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

function outOfStockDisplayChange(check)
{
    document.getElementById("buy"+check).style.display="none"
    document.getElementById("add"+check).style.display="none"
    document.getElementById('out-of-stock'+check).style.visibility="visible"
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
                        outOfStockDisplayChange(check)
                        //product cannot be added it exceeds the stock value
                        //the stock gooes in -ve                    
                    
                        // document.getElementById('order-confirm-modal').removeAttribute('id');                   
                        // document.getElementById('order-confirm-modal').setAttribute('data-dismiss','modal')
                        
                        stock[check].stockQty=stock[check].stockQty-cartDetails[i].orderqty
                    }
                        
                    else{
                        document.getElementById('check-body').style.display="none";
                        // document.getElementById("buy"+check).style.display="none";
                        // document.getElementById("add"+check).style.display="none";
                        document.getElementById('exceed').style.display="block";
                        // document.getElementById('out-of-stock'+check).style.visibility="visible";
                    }

                }
                
                else{
                    // console.log('else');
                    
                    stock[check].stockQty=stock[check].stockQty-cartDetails[i].orderqty;
                    document.getElementById('exceed').style.display="none";
                    // console.log('after');
                    
                }
                
                    // console.log('in stock'+stock[check].name +"  "+stock[check].stockQty)
                   
                   
            }
        }
        localStorage.setItem('stock',JSON.stringify(stock));
    
}