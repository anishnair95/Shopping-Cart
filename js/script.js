



var root = document.getElementsByClassName('cards-container')[0];

const createPanel = () => {
  let cardsPanel = document.createElement('div');
  cardsPanel.classList.add('cards-panel');

  return cardsPanel;
}

const createCard = () => {
  let cards = document.createElement('div');
  cards.classList.add('cards');

  let img = document.createElement('img');

}



//render the element dynamically
const getData = async () => {
  const response = await fetch('../db.json');
  const data = await response.json();
  console.log(data);


  if (data.length != 0) {
    let arr = []
    let panels = "";

    var existItem = JSON.parse(localStorage.getItem('cartItems'));
    data.forEach(element => {

      if (existItem && existItem[element.id] != undefined) {
        arr.push(existItem[element.id])
      }
      else
        arr.push(element);

      if (arr.length == 3) {

        panels += `      <div class="cards-panel">
        <div class="cards" id=${arr[0].id}>
          <img src="${arr[0].img}" class='cards-img' alt="">
          <div class='description'>
            <p>${arr[0].name}</p>
            <p>${arr[0].about}</p>
          </div>

          <div class="add-item">

            <div class="price">
              <p>$${arr[0].price}</p>
            </div>
            <div class="add">
              <button class='btn-counter dec'>-</button>
              <div class="qty">
                <input class='qty-box' type="text" value=${arr[0].qty} >
              </div>
              <button class='btn-counter inc'>+</button>
            </div>

            <button class="${arr[0].btnClasses}" disabled=${arr[0].btnDisabled}>${arr[0].inCart}</button>
          </div>
        </div>

        <div class="cards" id=${arr[1].id}>
          <img src=${arr[1].img} class='cards-img' alt="">
          <div class='description'>
            <p>${arr[1].name}</p>
            <p>${arr[1].about}</p>
          </div>

          <div class="add-item">

            <div class="price">
              <p>$${arr[1].price}</p>
            </div>
            <div class="add">
              <button class='btn-counter dec'>-</button>
              <div class="qty">
                <input class='qty-box' type="text" value=${arr[1].qty} >
              </div>
              <button class='btn-counter inc'>+</button>
            </div>

            <button class="${arr[1].btnClasses}" disabled=${arr[1].btnDisabled}>${arr[1].inCart}</button>
          </div>
        </div>

        <div class="cards" id=${arr[2].id}>
          <img src=${arr[2].img} class='cards-img' alt="">
          <div class='description'>
            <p>${arr[2].name}</p>
            <p>${arr[2].about}</p>
          </div>

          <div class="add-item">

            <div class="price">
              <p>$${arr[2].price}</p>
            </div>
            <div class="add">
              <button class='btn-counter dec'>-</button>
              <div class="qty">
                <input class='qty-box' type="text" value=${arr[2].qty} >
              </div>
              <button class='btn-counter inc'>+</button>
            </div>

            <button class="${arr[2].btnClasses}" disabled=${arr[0].btnDisabled}>${arr[2].inCart}</button>
          </div>
        </div>

      </div>`

        // console.log(arr[0]);
        // console.log(arr[1]);
        // console.log(arr[2]);
        arr.splice(0, 3);
      }


    });

    root.innerHTML = panels;
  }


  localCart = localStorage.getItem('cartNumbers');
  if (localCart) {
    var count = document.getElementById('count');
    count.textContent = localCart;
  }

}



//functionalities for increment and decrement

document.addEventListener('click', function (e) {
  // if(e.target.parentElement.parentElement.parentElement.classList.contains('cards')){
  //   let id1=e.target.parentElement.parentElement.parentElement.id;
  //   // console.log(id1);
  // }


  //for increment
  if (e.target.classList.contains('inc')) {



    let inp = e.target.previousElementSibling.firstElementChild;
    if (inp.value <= 9) {
      inp.value++;

      if (inp.value == 1) {
        e.target.parentElement.nextElementSibling.classList.add('btn-enabled');
        e.target.parentElement.nextElementSibling.disabled = false;
      }

      //inner condition
      if (e.target.parentElement.nextElementSibling.textContent === 'Go To Cart') {
        var id = e.target.parentElement.parentElement.parentElement.id;
        var price = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
        price = Number(price.slice(1));
        console.log('Update the cart');
        updateCart('inc', id);
        cartNumbers('inc', 1);
        totalCost('inc', price);
      }

    }
  }
  //for decrement
  if (e.target.classList.contains('dec')) {
    let inp = e.target.nextElementSibling.firstElementChild;

    if (inp.value > 0) {
      inp.value--;

      if (inp.value == 0) {
        e.target.parentElement.nextElementSibling.classList.remove('btn-enabled');
        e.target.parentElement.nextElementSibling.disabled = true;
        e.target.parentElement.nextElementSibling.textContent = 'Add To Cart';
        var item = JSON.parse(localStorage.getItem('cartItems'));
        var temp = e.target.parentElement.parentElement.parentElement.id;
        delete item[temp];
        cartNumbers('dec', 1);
        localStorage.setItem('cartItems', JSON.stringify(item));
      }

      //inner condition
      if (e.target.parentElement.nextElementSibling.textContent === 'Go To Cart') {
        var id = e.target.parentElement.parentElement.parentElement.id;
        var price = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
        price = Number(price.slice(1));
        console.log('Update the cart');
        updateCart('dec', id);
        cartNumbers('dec', 1);
        totalCost('dec', price);
      }

    }
  }

  //addToCart

  if (e.target.classList.contains('btn-cart') && e.target.textContent == 'Add To Cart') {
    // console.log(e.target);
    var id = e.target.parentElement.parentElement.id;
    var img = e.target.parentElement.parentElement.children[0].src;
    var name = e.target.parentElement.parentElement.children[1].children[0].textContent;
    var about = e.target.parentElement.parentElement.children[1].children[1].textContent;
    var price = e.target.previousElementSibling.previousElementSibling.firstElementChild.textContent;
    var qty = e.target.previousElementSibling.children[1].firstElementChild.value;
    var btnClassList = e.target.classList;
    var btnDisabled = e.target.disabled;

    var btnClasses = "" + btnClassList[0] + " " + btnClassList[1];
    price = Number(price.slice(1));
    qty = parseInt(qty);

    console.log(id);
    console.log(img);
    console.log(name);
    console.log(about);
    console.log(price);
    console.log(qty);
    console.log(btnClasses);
    console.log(btnDisabled);


    var obj = {
      id: id,
      img: img,
      name: name,
      about: about,
      price: price,
      qty: qty,
      btnClasses: btnClasses,
      btnDisabled: btnDisabled,
      inCart: 'Go To Cart'
    }

    e.target.textContent = 'Go To Cart';

    addToCart(obj);
  }

});


//add item to cart- this will execute if item added for first time....
const addToCart = (obj) => {

  var cartItems = JSON.parse(localStorage.getItem('cartItems'));

  //keeping remaining items and adding new object with it
  if (cartItems) {
    cartItems = { ...cartItems, [obj.id]: obj }
  }
  else {
    cartItems = { [obj.id]: obj }
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  //adding quantity for first time so sending inc and quantity
  cartNumbers('inc', obj.qty);
  totalCost('inc', obj.qty * obj.price);

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
  productNumbers = parseInt(productNumbers);


  if (productNumbers) {

    if (cond === 'inc')
      localStorage.setItem('cartNumbers', productNumbers + parseInt(qty));
    else
      localStorage.setItem('cartNumbers', productNumbers - parseInt(qty));

  }
  else {
    localStorage.setItem('cartNumbers', qty);
  }

  var count = document.getElementById('count');
  count.textContent = localStorage.getItem('cartNumbers');



}

const totalCost = (cond, price) => {

  var totalCost = localStorage.getItem('totalCost');

  if (totalCost) {
    //convert to int
    totalCost=Number(totalCost);

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
window.onload = getData();