const menuBtn = document.getElementById("menu-btn");
const mobileMenuEl = document.getElementById("mobileMenu");
const selectSeatEl = document.getElementById('selected-seat');
const totalBookedEl = document.getElementById('total-booked');
const availableSeatEl = document.getElementById('available-seat');
const totalPriceEl = document.getElementById('total-price');
const couponFieldEl = document.getElementById('coupon-field');
const couponBtnEl = document.getElementById('coupon-btn');
const idDefaultTextEl = document.getElementById('default-text');
const grandTotalEl = document.getElementById('grand-total');
const phoneNumberEl = document.getElementById('phone-number');
const nextButtonEl = document.getElementById('nextButton');

// Menu icons
menuBtn.addEventListener('click', function () {
    menuBtn.children[0].classList.toggle("hidden")
    const menuCloseBtn = document.getElementById("close-icon");
    menuCloseBtn.classList.toggle("hidden")
    mobileMenuEl.classList.toggle("hidden")
    mobileMenuEl.classList.toggle("flex")
})

let selectSeat = [];
let totalPrice = 0;
// select seat
function handleSelectSeat(event){
    const value = event.innerText;

    // remove no seat booked text
    idDefaultTextEl.classList.add('hidden');

    // fixed selected seat only single time
    if(selectSeat.includes(value)){
        return alert("Seat already booked");
    }
    else if(selectSeat.length < 4){
   
        // button clickable color fixed
        event.classList.add('bg-primary');
        event.classList.add('text-white');

        // count seat in right
        selectSeat.push(event.innerText);
        totalBookedEl.innerText = selectSeat.length;

        // decrise seat in top
        const availableSeatValue = parseFloat(availableSeatEl.innerText);
        const newAvailableSeatValue = availableSeatValue - 1;
        availableSeatEl.innerText = newAvailableSeatValue;

        selectSeatEl.innerHTML += `<li class="text-base font-normal flex justify-between">
            <span>${event.innerText}</span>
            <span>Economy</span>
            <span>550</span>
        </li>`

        // update total price
        totalPrice += 550;
        totalPriceEl.innerText = parseFloat(totalPrice).toFixed(2);

        // coupon field and button active 
        if(selectSeat.length > 3){
            couponFieldEl.removeAttribute('disabled');
            couponBtnEl.removeAttribute('disabled');
        }
    }
    else if(selectSeat.length > 3){
        return alert("Maximum you can booked 4 seat.");
    }

}

// apply coupon
document.getElementById('coupon-btn').addEventListener('click', function(){
    const couponInputValue = couponFieldEl.value;
    console.log(couponInputValue);
    let couponSave = 0;

    if(couponInputValue !== 'NEW15' && couponInputValue !== 'Couple 20'){
        return alert("Your provided coupon is not valid");
    }
    
    else if(couponInputValue === 'NEW15'){
        couponSave = totalPrice * .15;
    }
    else if(couponInputValue === 'Couple 20'){
        couponSave = totalPrice * .20;
    }

    // show coupon price
    const showCouponPriceEL = document.getElementById('show-coupon-price');
        showCouponPriceEL.innerHTML = `
            <p>Discount </p>
            <p>
                <span>BDT: </span>
                <span>${couponSave.toFixed(2)}</span>
            </p>
        `

    // show grand total price
    const grandTotalValue = totalPrice - couponSave;
    grandTotalEl.innerText = grandTotalValue.toFixed(2);
});

// form section
phoneNumberEl.addEventListener('input', function(e){
    const inputValuePhone = e.target.value;
    if(inputValuePhone.length >= 11){
        nextButtonEl.removeAttribute('disabled');
    }
});

// reload full site
document.getElementById('btn-continue').addEventListener('click', function(){
    window.location.reload();
})