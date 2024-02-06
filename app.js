let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let slider = document.getElementById('slider');
let thumbnails = document.querySelectorAll('.thumbnail .item');
let showLink = document.querySelector('.menu li:nth-child(3) a');
let LoginBox = document.querySelector('.login-box');
let crossBtn = document.querySelector('.cross-btn');
let loginForm = document.getElementById("login-form");

loginForm.onsubmit = async function(event){
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var formData = {
        email: email,
        password: password
    };

    await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            
            throw new Error('Server is not responding');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        var successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = 'Login Successfully';
        document.body.appendChild(successMessage);

        setTimeout(function() {
            successMessage.remove();
        }, 2000);

        LoginBox.classList.remove('show');
     slider.classList.remove('blur-background');
    })
    .catch(error => {
        alert("server is not responding");
        console.error('There was a problem with the login:', error);
    });
}

showLink.onclick = function(event){
    event.preventDefault();
     LoginBox.classList.toggle('show');
     slider.classList.toggle('blur-background');
}
crossBtn.onclick = function(event){
    event.preventDefault();
     LoginBox.classList.remove('show');
     slider.classList.remove('blur-background');
}

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})


// section 2


let nextButton = document.getElementById('nex');
let prevButton = document.getElementById('pre');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('bac');

nextButton.onclick = function(){
    showSlider2('nex');
}
prevButton.onclick = function(){
    showSlider2('pre');
}
let unAcceppClick;
const showSlider2 = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('nex', 'pre');
    let items = document.querySelectorAll('.carousel .list .item2');
    if(type === 'nex'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('nex');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('pre');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('nex', 'pre');
        carousel.classList.add('showDetail');
    }
});
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
}