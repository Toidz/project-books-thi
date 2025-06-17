// Menu Mobile
const buttonMenuMobile = document.querySelector(".header .inner-menu-mobile");
if(buttonMenuMobile) {
  const menu = document.querySelector(".header .inner-menu");

  // Click vào button mở menu
  buttonMenuMobile.addEventListener("click", () => {
    menu.classList.add("active");
  });

  // Click vào overlay đóng menu
  const overlay = menu.querySelector(".inner-overlay");
  if(overlay) {
    overlay.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  }

  // Click vào icon down mở sub menu
  const listButtonSubMenu = menu.querySelectorAll("ul > li > i");
  listButtonSubMenu.forEach(button => {
    button.addEventListener("click", () => {
      button.parentNode.classList.toggle("active");
    })
  });
}
// End Menu Mobile

// Box Address Section 1
const boxAddressSection1 = document.querySelector(".section-1 .inner-form .inner-box.inner-address");
if(boxAddressSection1) {
  // Ẩn/hiện box suggest
  const input = boxAddressSection1.querySelector(".inner-input");

  input.addEventListener("focus", () => {
    boxAddressSection1.classList.add("active");
  })

  input.addEventListener("blur", () => {
    boxAddressSection1.classList.remove("active");
  })

  // Sự kiện click vào từng item
  const listItem = boxAddressSection1.querySelectorAll(".inner-suggest-list .inner-item");
  listItem.forEach(item => {
    item.addEventListener("mousedown", () => {
      const title = item.querySelector(".inner-item-title").innerHTML.trim();
      if(title) {
        input.value = title;
      }
    })
  })
}
// End Box Address Section 1

// Box User Section 1
const boxUserSection1 = document.querySelector(".section-1 .inner-form .inner-box.inner-user");
if(boxUserSection1) {
  // Hiện box quantity
  const input = boxUserSection1.querySelector(".inner-input");

  input.addEventListener("focus", () => {
    boxUserSection1.classList.add("active");
  })

  // Ẩn box quantity
  document.addEventListener("click", (event) => {
    // Kiểm tra nếu click không nằm trong khối `.inner-box.inner-user`
    if (!boxUserSection1.contains(event.target)) {
      boxUserSection1.classList.remove("active");
    }
  });

  // Thêm số lượng vào ô input
  const updateQuantityInput = () => {
    const listBoxNumber = boxUserSection1.querySelectorAll(".inner-count .inner-number");
    const listNumber = [];
    listBoxNumber.forEach(boxNumber => {
      const number = parseInt(boxNumber.innerHTML.trim());
      listNumber.push(number);
    })
    const value = `NL: ${listNumber[0]}, TE: ${listNumber[1]}, EB: ${listNumber[2]}`;
    input.value = value;
  }

  // Bắt sự kiện click nút up
  const listButtonUp = boxUserSection1.querySelectorAll(".inner-count .inner-up");
  listButtonUp.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.parentNode;
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.innerHTML.trim());
      const numberUpdate = number + 1;
      boxNumber.innerHTML = numberUpdate;
      updateQuantityInput();
    })
  })

  // Bắt sự kiện click nút down
  const listButtonDown = boxUserSection1.querySelectorAll(".inner-count .inner-down");
  listButtonDown.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.parentNode;
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.innerHTML.trim());
      if(number > 0) {
        const numberUpdate = number - 1;
        boxNumber.innerHTML = numberUpdate;
        updateQuantityInput();
      }
    })
  })
}
// End Box User Section 1

// Clock Expire
const clockExpire = document.querySelector("[clock-expire]");
if(clockExpire) {
  const expireDateTimeString = clockExpire.getAttribute("clock-expire");

  // Chuyển đổi chuỗi thời gian thành đối tượng Date
  const expireDateTime = new Date(expireDateTimeString);

  // Hàm cập nhật đồng hồ
  const updateClock = () => {
    const now = new Date();
    const remainingTime = expireDateTime - now; // quy về đơn vị mili giây
    
    if (remainingTime > 0) {
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      // Tính số ngày, 24 * 60 * 60 * 1000 Tích của các số này = số mili giây trong 1 ngày

      const hours = Math.floor((remainingTime / (60 * 60 * 1000)) % 24);
      // Tính số giờ, 60 * 60 * 1000 Chia remainingTime cho giá trị này để nhận được tổng số giờ.
      // % 24 Lấy phần dư khi chia tổng số giờ cho 24 để chỉ lấy số giờ còn lại trong ngày.

      const minutes = Math.floor((remainingTime / (60 * 1000)) % 60);
      // Tính số phút, 60 * 1000 Chia remainingTime cho giá trị này để nhận được tổng số phút.
      // % 60 Lấy phần dư khi chia tổng số phút cho 60 để chỉ lấy số phút còn lại trong giờ.

      const seconds = Math.floor((remainingTime / 1000) % 60);
      // Tính số giây, 1000 Chia remainingTime cho giá trị này để nhận được tổng số giây.
      // % 60 Lấy phần dư khi chia tổng số giây cho 60 để chỉ lấy số giây còn lại trong phút.

      // Cập nhật giá trị vào thẻ span
      const listBoxNumber = clockExpire.querySelectorAll('.inner-number');
      listBoxNumber[0].innerHTML = `${days}`.padStart(2, '0');
      listBoxNumber[1].innerHTML = `${hours}`.padStart(2, '0');
      listBoxNumber[2].innerHTML = `${minutes}`.padStart(2, '0');
      listBoxNumber[3].innerHTML = `${seconds}`.padStart(2, '0');
    } else {
      // Khi hết thời gian, dừng đồng hồ
      clearInterval(intervalClock);
    }
  }

  // Gọi hàm cập nhật đồng hồ mỗi giây
  const intervalClock = setInterval(updateClock, 1000);
}
// End Clock Expire

// Box Filter
const buttonFilterMobile = document.querySelector(".section-9 .inner-filter-mobile");
if(buttonFilterMobile) {
  const boxLeft = document.querySelector(".section-9 .inner-left");
  buttonFilterMobile.addEventListener("click", () => {
    boxLeft.classList.add("active");
  })

  const overlay = document.querySelector(".section-9 .inner-left .inner-overlay");
  overlay.addEventListener("click", () => {
    boxLeft.classList.remove("active");
  })
}
// End Box Filter

// Box Tour Info
const boxTourInfo = document.querySelector(".box-tour-info");
if(boxTourInfo) {
  const buttonReadMore = boxTourInfo.querySelector(".inner-read-more button");
  buttonReadMore.addEventListener("click", () => {
    boxTourInfo.classList.add("active");
  })

  new Viewer(boxTourInfo);
}
// End Box Tour Info

// Khởi tạo AOS
AOS.init();
// Hết Khởi tạo AOS

// Swiper Section 2
const swiperSection2 = document.querySelector(".swiper-section-2");
if(swiperSection2) {
  new Swiper('.swiper-section-2', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
    },
    loop: true,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
}
// End Swiper Section 2

// Swiper Section 3
const swiperSection3 = document.querySelector(".swiper-section-3");
if(swiperSection3) {
  new Swiper('.swiper-section-3', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
}
// End Swiper Section 3

// Swiper Box Images
const boxImages = document.querySelector(".box-images");
if(boxImages) {
  const swiperBoxImagesThumb = new Swiper(".swiper-box-images-thumb", {
    spaceBetween: 5,
    slidesPerView: 4,
    breakpoints: {
      576: {
        spaceBetween: 10,
      },
    },
  });

  const swiperBoxImagesMain = new Swiper(".swiper-box-images-main", {
    spaceBetween: 0,
    thumbs: {
      swiper: swiperBoxImagesThumb,
    },
  });
}
// End Swiper Box Images

// Zoom Box Images Main
const boxImagesMain = document.querySelector(".box-images .inner-images-main");
if(boxImagesMain) {
  new Viewer(boxImagesMain);
}
// End Zoom Box Images Main

// Box Tour Schedule
const boxTourSchedule = document.querySelector(".box-tour-schedule");
if(boxTourSchedule) {
  new Viewer(boxTourSchedule);
}
// End Box Tour Schedule
// Email Form
const emailForm = document.querySelector("#email-form");
if(emailForm) {
  const validation = new JustValidate('#email-form');

  validation
    .addField('#email-input', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email của bạn!',
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .onSuccess((event) => {
      const email = event.target.email.value;
      const dataFinal = {
        email:email
      }

      fetch(`/contact`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(dataFinal)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.code=="error"){
          Swal.fire({
            icon: 'error',
            title: 'Thất bại!',
            text: 'Email này đã được đăng ký!',
            timer: 3000,
            showConfirmButton: false
          });
        }
        else{
          window.location.reload()
        }
      })
    })
  ;
}
// End Email Form

// Coupon Form
const couponForm = document.querySelector("#coupon-form");
if(couponForm) {
  const validation = new JustValidate('#coupon-form');

  validation
    .onSuccess((event) => {
      const coupon = event.target.coupon.value;
      console.log(coupon);
    })
  ;
}
// End Email Form

// Order Form
const orderForm = document.querySelector("#order-form");
if(orderForm) {
  const validation = new JustValidate('#order-form');

  validation
    .addField('#full-name-input', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên!'
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
      },
    ])
    .addField('#phone-input', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập số điện thoại!'
      },
      {
        rule: 'customRegexp',
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        errorMessage: 'Số điện thoại không đúng định dạng!'
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const method = event.target.method.value;
      const cart = JSON.parse(localStorage.getItem("cart"))
      const itemCart = cart.filter(item => item.checkItem ==true)
      if(itemCart.length>0){
        const cartList = []
        itemCart.forEach(item=>{
          const dataCart = {
            id:item.id,
            numberBook:item.numberBook
          }
          cartList.push(dataCart)
        })

        const dataFinal = {
          fullName,
          phone,
          note,
          method,
          cart:cartList
        }
        fetch(`/order/create`,{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(dataFinal)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.code=="error"){
            Swal.fire({
              icon: 'error',
              title: 'Đặt sách thất bại!',
              text: `Số lượng đã vượt quá số lượng sách hiện có!`,
              timer: 3000,
              showConfirmButton: false
            });
          }
          else{
            const cart = JSON.parse(localStorage.getItem("cart"));
            const newCart = cart.filter(item => item.checkItem !== true);
            localStorage.setItem("cart", JSON.stringify(newCart));
            switch (method) {
              case "money": case "bank":
                window.location.href = `/order/success?orderId=${data.orderId}&phone=${phone}`
                break;
            
              case "zalopay":
                window.location.href = `/order/payment-zalopay?orderId=${data.orderId}`
                break;
            }
          }
        })

      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Đặt sách thất bại!',
          text: 'Vui lòng chọn ít nhất 1 sản phẩm!',
          timer: 3000,
          showConfirmButton: false
        });
      }
    })
  ;

  // List Input Method
  const listInputMethod = orderForm.querySelectorAll("input[name='method']");
  const elementInfoBank = orderForm.querySelector(".inner-info-bank");

  listInputMethod.forEach(inputMethod => {
    inputMethod.addEventListener("change", () => {
      if (inputMethod.value == "bank") {
        elementInfoBank.classList.add("active");
      } else {
        elementInfoBank.classList.remove("active");
      }
    })
  })
  // End List Input Method
}
// End Order Form

///-----------book----------

//asc button
const buttonAsc = document.querySelector("[button-asc]")
if(buttonAsc){
  const url = new URL(window.location.href)
  buttonAsc.addEventListener("click",()=>{
    url.searchParams.delete("sort")
    url.searchParams.set("sort",buttonAsc.value)
    window.location.href = url.href
  })

}
//desc button
const buttonDesc = document.querySelector("[button-desc]")
if(buttonAsc){
  const url = new URL(window.location.href)
  buttonDesc.addEventListener("click",()=>{
    url.searchParams.delete("sort")
    url.searchParams.set("sort",buttonDesc.value)
    window.location.href = url.href
  })

}
//filter-price
const filterPrice = document.querySelector("[filter-price]")
if(filterPrice){
  const url = new URL(window.location.href)
  // const selectCategory  = filterPrice.querySelector("[category]")
  const selectPrice = filterPrice.querySelector("[price]")
  const button = filterPrice.querySelector("[excute]")
  const buttonClear = filterPrice.querySelector("[clear]")
  if(button){
    button.addEventListener("click",()=>{
      if(selectPrice.value){
        // url.searchParams.set("category",selectCategory.value)
        url.searchParams.set("price",selectPrice.value)
      }
      else{
        // url.searchParams.delete("category")
        url.searchParams.delete("price")
      }
      window.location.href = url.href
    })
    // const currentCategory = url.searchParams.get("category")
    // if(currentCategory) selectCategory.value =currentCategory
    const currentPrice = url.searchParams.get("price")
    if(currentPrice) selectPrice.value =currentPrice
  }
  if(buttonClear){
    buttonClear.addEventListener("click",()=>{
      url.search= ""
      window.location.href = url.href
    })
  }
}
//end filter-price

//box-pagination
const boxPagination = document.querySelector("[box-pagination]")
if(boxPagination){
  const url = new URL(window.location.href)
  const buttons = boxPagination.querySelectorAll("button")
  buttons.forEach(button => {
    button.addEventListener("click",()=>{
      const page = button.getAttribute("page")
      url.searchParams.set("page",page)
      window.location.href = url.href
    })
    const current = url.searchParams.get("page")
    if(current){
      buttons.forEach(btn =>btn.classList.remove("active"));
      buttons.forEach(btn =>{
        if(btn.getAttribute("page")==current){
          btn.classList.add("active")
        }
      });
    }
  });
}
//End box-pagination
///End -----------book----------

// Alert
const alertTime = document.querySelector("[alert-time]");
if(alertTime) {
  let time = alertTime.getAttribute("alert-time");
  time = time ? parseInt(time) : 4000;
  setTimeout(() => {
    alertTime.remove(); // Xóa phần tử khỏi giao diện
  }, time);
}
// End Alert

//find Book
const findBook = document.querySelector("[find-book]")
if(findBook){
  const url = new URL(`${window.location.href}search`)
  findBook.addEventListener("keyup",(event)=>{
    if(event.code=="Enter"){
      if(findBook.value){
        url.searchParams.set("keyword",findBook.value)
      }
      else{
        url.searchParams.delete("keyword")
      }
      window.location.href = url.href
    }
  })
}
//End find Book

//detail - book
const numberDetail = document.querySelector("[number-detail]");
if (numberDetail) {
  numberDetail.addEventListener("input", (event) => {
    let value = event.target.value.replace(/[^0-9]/g, "");

    if (value !== "") {
      const stock = document.querySelector("[stock]")
      const valueStock = parseInt(stock.getAttribute("stock"))
      let number = parseInt(value, 10);
      if (number >= valueStock) {
        number = valueStock;
      }
      value = number.toString();
    }
    event.target.value = value;
  });

  numberDetail.addEventListener("change", () => {
    const number = document.querySelector("[number]");
    number.innerHTML = numberDetail.value;
    const priceBook = document.querySelector("[priceBook]")
    const totalPrice = document.querySelector("[totalPrice]")
    totalPrice.innerHTML = (parseInt(numberDetail.value) * parseInt(priceBook.getAttribute("priceBook"))).toLocaleString("vi-VN")
  });
}

const bookDetail = document.querySelector("[book-detail]")
if(bookDetail){
  const btn = bookDetail.querySelector("[idBook]")
  btn.addEventListener("click",()=>{
    const idBook = btn.getAttribute("idBook")
    const input = bookDetail.querySelector("[number-detail]")
    const numberBook = input.value
    const dataFinal ={
      id:idBook,
      numberBook,
      checkItem:true                                                                   
    }
    const cart = JSON.parse(localStorage.getItem("cart"))
    console.log(cart)
    const findIndex = cart.findIndex(book => book.id == dataFinal.id)
    if(findIndex!=-1){
      cart[findIndex] = dataFinal
    }
    else{
      cart.push(dataFinal)
    }
    localStorage.setItem("cart",JSON.stringify(cart))
    window.location.href ="/cart"
  })
}

//End detail - book

//cart
const cart = localStorage.getItem("cart")
if(!cart){
  localStorage.setItem("cart",JSON.stringify([]))
}
//End cart

//const minicart
const miniCart = document.querySelector("[mini-cart]")
if(miniCart){
  const cart = JSON.parse(localStorage.getItem("cart"))
  miniCart.innerHTML = cart.length
}
//const minicart

//draw cart
const drawCart = ()=>{
  const cart = JSON.parse(localStorage.getItem("cart"))
  if(cart){
    fetch(`/cart/detail`,{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(cart)
    })
    .then(res=>res.json())
    .then(data=>{
    if(data.code=="error"){
      alert(data.message)
    }
    else{
      const htmlCart = data.cart.map(item=>
      `
        <div class="inner-tour-item">
          <div class="inner-actions">
            <button class="inner-delete" button-delete=${item.id}>
              <i class="fa-solid fa-xmark"></i>
            </button>
            <input class="inner-check" 
              type="checkbox" ${item.checkItem == true ? "checked" : "" } 
              checkItem
              idBook = ${item.id}
            >
          </div>
          <div class="inner-product">
            <div class="inner-image">
              <a href="/book/detail/${item.slug}">
                <img alt=${item.name} src=${item.avatar}>
              </a>
            </div>
            <div class="inner-content">
              <div class="inner-title">
                <a href="/book/detail/${item.slug}">${item.name}</a>
              </div>
              <div class="inner-meta">
                <div class="inner-meta-item">Mã sách: <b>${item.bookCode}</b>
                </div>
                <div class="inner-meta-item">Tên tác giả: <b>${item.author}</b>
                </div>
                <div class="inner-meta-item">Nhà xuất bản: <b>${item.produce}</b>
                </div>
              </div>
            </div>
          </div>
          <div class="inner-quantity">
            <div class="inner-list">
              <div class="inner-item">
                <div class="inner-item-label">Số lượng mua:</div>
                <div class="inner-item-input">
                  <input 
                    value=${item.numberBook} 
                    min="1" 
                    type="number"
                    numberInput 
                    book-id =${item.id}
                  >
                </div>
                <div class="inner-item-price">
                  <span stockAdult>${item.numberBook} </span>
                  <span>x</span>
                  <span class="inner-highlight">
                    ${item.priceBook.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      )
      localStorage.setItem("cart",JSON.stringify(data.cart))
      const cartList = document.querySelector("[cart-list]")
      cartList.innerHTML = htmlCart.join("")

      const filterCheck = data.cart.filter(item=>
        item.checkItem == true
      )
           
      // gia
      const pay = filterCheck.reduce((sum,item)=>{
        if(item.checkItem){
          return sum + parseInt(item.numberBook) * parseInt(item.priceBook)
        }
      },0)
      const payPrice = document.querySelector("[pay-price]")
      if(payPrice) payPrice.innerHTML = pay.toLocaleString("vi-VN")
    
      

      //chinh so luong
      const numberInput = document.querySelectorAll("[numberInput]")
      if(numberInput){  
        numberInput.forEach(input => {
          input.addEventListener("change",(event)=>{
            let value = event.target.value.replace(/[^0-9]/g,"");
            event.target.value = value;
            if(input.value){
              console.log(input.value)
              cart.map(item=>{
                if(item.id == input.getAttribute("book-id")){
                  item.numberBook = input.value
                  return item
                }
              })
              localStorage.setItem("cart",JSON.stringify(cart))
              drawCart()
            }
          })
        });
      }

      //check
      const checkItem = document.querySelectorAll("[checkItem]")
      if(checkItem){
        checkItem.forEach(item => {
          item.addEventListener("click",()=>{
            const id = item.getAttribute("idBook")
            const cartFind = cart.find(it=>it.id == id)
            cartFind.checkItem = item.checked
            localStorage.setItem("cart",JSON.stringify(cart))
            drawCart()
          })
        });
      }

      //xoa
      const buttonDelete = document.querySelectorAll("[button-delete]")
      if(buttonDelete){
        buttonDelete.forEach(item => {
          item.addEventListener("click",()=>{
            const id = item.getAttribute("button-delete")
            const index = cart.findIndex(it=>it.id == id)
            cart.splice(index,1)
            localStorage.setItem("cart",JSON.stringify(cart))
            drawCart()
          })
        });
      }

    }
  })
  }
}
//end draw cart

const cartList = document.querySelector("[cart-list]")
if(cartList){
  drawCart()
}
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.inner-menu > ul > li > ul').forEach(ul => {
    if (ul.children.length > 5) {
      ul.classList.add('multi-column');
    }
  });
});