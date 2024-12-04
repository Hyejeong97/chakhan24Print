$(document).ready(function(){

	$(".mainPage").on("click", function() {
		location.href = '../index.html';
	});

	$(".storePage").on("click", function() {
		location.href = 'store.html';
	});
	
	$(".aboutPage").on("click", function() {
		location.href = 'about.html';
	});
	
	$(".consultPage").on("click", function() {
		location.href = 'consult.html';
	});
	
	
	/*
	inspiration
	https://dribbble.com/shots/4684682-Aquatic-Animals
	*/
	
	$("[class*=why]").css("font-family", "'yg-jalnan', verdana, tahoma");
	
	var swiper = new Swiper(".swiper", {
	  effect: "coverflow",
	  grabCursor: true,
	  centeredSlides: true,
	  coverflowEffect: {
	    rotate: 0,
	    stretch: 0,
	    depth: 100,
	    modifier: 3,
	    slideShadows: true
	  },
	  keyboard: {
	    enabled: true
	  },
	  mousewheel: {
	    thresholdDelta: 70
	  },
	  loop: true,
	  pagination: {
	    el: ".swiper-pagination",
	    clickable: true
	  },
	  breakpoints: {
	    640: {
	      slidesPerView: 2
	    },
	    768: {
	      slidesPerView: 1
	    },
	    1024: {
	      slidesPerView: 2
	    },
	    1560: {
	      slidesPerView: 3
	    }
	  }
	});
	
	const menuToggle = document.querySelector('.menu-toggle');
	const bxMenu = document.querySelector('.bx-menu');
	const bxX = document.querySelector('.bx-x');
	
	const navBar = document.querySelector('.navbar');
	
	// --- open menu ---
	
	bxMenu.addEventListener('click', (e)=> {
	    if(e.target.classList.contains('bx-menu')){
	        navBar.classList.add('show-navbar');
	        bxMenu.classList.add('hide-bx');
	        bxX.classList.add('show-bx');
	    }
	})
	
	// --- close menu ---
	
	bxX.addEventListener('click', (e)=> {
	    if(e.target.classList.contains('bx-x')){
	        navBar.classList.remove('show-navbar');
	        bxMenu.classList.remove('hide-bx');
	        bxX.classList.remove('show-bx');
	    }
	});
	
	





	document.addEventListener("DOMContentLoaded", function () {
	    const menuToggle = document.getElementById("menuToggle");
	    const menu = document.querySelector("ul.menu");
	
	    menuToggle.addEventListener("click", function () {
	        menu.classList.toggle("active");
	    });
	});


	var x = 126.868904;
	var y = 37.5355793;
	setMap(x, y);
	
	$("span.store").on("click", function(){
		x = $(this).attr("x");
		y = $(this).attr("y");
		setMap(x, y);
	});





/*********************/

    setInterval(function () {
        moveRight();
    }, 4000);
  
	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;
	
	$('#slider').css({ width: slideWidth, height: slideHeight });
	
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });


});

function setMap(x, y){
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	    mapOption = { 
	        center: new kakao.maps.LatLng(y, x), // 지도의 중심좌표
	        level: 3 // 지도의 확대 레벨
	    };
	
	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	
	// 마커가 표시될 위치입니다 
	
	var markerPosition  = new kakao.maps.LatLng(y, x); 
	
	// 마커를 생성합니다
	var marker = new kakao.maps.Marker({
	    position: markerPosition
	});
	
	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);
	
	// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
	// marker.setMap(null);   
}