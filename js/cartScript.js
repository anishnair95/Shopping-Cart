// import {updateCart,cartNumbers,calCost} from './script.js'

const getCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  var panel = '<h3 id="cart-head">My Cart</h3>';
  if (cartItems) {
    Object.values(cartItems).map(item => {
      panel += `        
        <div class="cart-item" id=${item.id}>
           <div class="citem-img">
             <img src=${item.img} class='cards-img cart-inside' alt="">
             <div class="add cart-add">
               <button class='btn-counter dec'>-</button>
               <div class="qty">
                 <input class='qty-box' type="text" value=${item.qty}>
               </div>
               <button class='btn-counter inc'>+</button>
             </div>
 
           </div>
 
           <div class="citem-detail">
             <div class="citem-name">
               <p>${item.name}</p>
             </div>
             <div class="citem-about">
               <p>${item.about}</p>
             </div>
             <div class="citem-price">
               <p>₹${item.price}</p>
             </div>
             <button class='btn-remove'>X Remove</button>
           </div>
         </div>`
    })
    var itemCheckout = document.querySelector('.item-checkout');
    itemCheckout.innerHTML = panel;
  }
  else {
    console.log("no data");
  }


  var localCart = localStorage.getItem('cartNumbers');
  if (localCart) {
    var count = document.getElementById('count');
    count.textContent = localCart;
  }
}

const addFunction = () => {


  //for increment
  var inc = Array.from(document.getElementsByClassName('inc'));
  inc.forEach((ele) => {
    ele.addEventListener('click', (e) => {
      console.log('clicked');
      if (e.target.classList.contains('inc')) {

        let inp = e.target.previousElementSibling.firstElementChild;
        if (inp.value <= 9) {
          inp.value++;

          //inner condition
          var id = e.target.parentElement.parentElement.parentElement.id;
          var price = e.target.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.textContent;
          price = price.replace(/\s/g, '');
          price = Number(price.slice(1));
          console.log('Update the cart');

          updateCart('inc', id);
          cartNumbers('inc', 1);
          calCost('inc', price);
        }
      }

    })
  })



  //for decrement
  var dec = Array.from(document.getElementsByClassName('dec'));
  dec.forEach((ele) => {
    ele.addEventListener('click', (e) => {
        // console.log('clicked');
        let inp = e.target.nextElementSibling.firstElementChild;

        if (inp.value > 1) {
          inp.value--;
          //inner condition
            var id = e.target.parentElement.parentElement.parentElement.id;
            var price = e.target.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.textContent;
            price = price.replace(/\s/g, '');
            price = Number(price.slice(1));
            console.log('Update the cart');
            //changes requireds
            updateCart('dec', id);
            cartNumbers('dec', 1);
            calCost('dec', price);
        } 
      })
    });

    //for remove
    var removeBtn=Array.from(document.querySelectorAll('.btn-remove'));
    removeBtn.forEach((remove)=>{
       remove.addEventListener('click',(e)=>{

            var cartItems=JSON.parse(localStorage.getItem('cartItems'));
            var id=e.target.parentElement.parentElement.id;
            var price=cartItems[id].price;
            var qty=cartItems[id].qty;
            
            delete cartItems[id];

            
            cartNumbers('dec', qty);
            calCost('dec', qty*price);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            loadData();
       })
    })

}


//update items of cart with each increment
const updateCart = (cond, id) => {
  var cartItems = JSON.parse(localStorage.getItem('cartItems'));

  var item = cartItems[id];

  if (cond === 'inc')
    item.qty++;
  else
    item.qty--;
  console.log(item);

  cartItems = { ...cartItems, [id]: item };
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

}

//count items in cart
const cartNumbers = (cond, qty) => {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = Number(productNumbers);


  if (productNumbers) {

    if (cond === 'inc')
      localStorage.setItem('cartNumbers', productNumbers + Number(qty));
    else
      localStorage.setItem('cartNumbers', productNumbers - Number(qty));

  }
  else {
    localStorage.setItem('cartNumbers', qty);
  }

  var count = document.getElementById('count');
  count.textContent = localStorage.getItem('cartNumbers');

}

//calculates total cost of items
const calCost = (cond, price) => {

  var totalCost = localStorage.getItem('totalCost');

  if (totalCost) {
    //convert to int
    totalCost = Number(totalCost);

    if (cond === 'dec') {
      totalCost -= price;
      localStorage.setItem('totalCost', totalCost);
    }
    else {
      totalCost += price;
      localStorage.setItem('totalCost', totalCost);
    }

  }
  else {
    console.log(price);
    localStorage.setItem('totalCost', price);
  }

}


const loadData = () => {
  getCartItems();
  addFunction();
}


loadData();
