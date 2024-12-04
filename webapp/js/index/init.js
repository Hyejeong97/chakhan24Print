$(document).ready(function(){

	var sections = $('section')
	  , nav = $('nav')
	  , nav_height = nav.outerHeight();
	
	$(window).on('scroll', function () {
	  var cur_pos = $(this).scrollTop();
	  
	  sections.each(function() {
	    var top = $(this).offset().top - nav_height,
	        bottom = top + $(this).outerHeight();
	    
	    if (cur_pos >= top && cur_pos <= bottom) {
	      nav.find('a').removeClass('active');
	      sections.removeClass('active');
	      
	      $(this).addClass('active');
	      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    }
	  });
	});
	
	nav.find('a').on('click', function () {
	  var $el = $(this)
	    , id = $el.attr('href');
	    
	  
	  $('html, body').animate({
	    scrollTop: $(id).offset().top - nav_height
	  }, 500);
	  
	  return false;
	});

	var x = 126.868904;
    var y = 37.5355793;
   // setMap(x, y);   
        
    $("span.store").on("click", function(){
		x = $(this).attr("x");
		y = $(this).attr("y");
		setMap(x, y);
	}); 
	
	$(".sms a").on("click", function(){
		var content = $(".content").val();
		if($(".content").val().length == 0){
			alert("전송할 문자 내용을 입력해 주세요.");
			return false;
		}else{
			$(".sms a").attr("href", "sms:010-6280-8125&body=" + content);
		}
		
	});
	
	// 폐점률 도넛 차트
	var dataset = {
	    label : ['폐점률'],
	    backgroundColor : ['#ffd950'],//라벨별 컬러설정
	    data: [0.0001], // 데이터 값 (합이 100%)
	}
	
	
	var labels = ['폐점률(%)']; 
	  
	var datasets = { datasets : [dataset], labels : labels}
	
	var config = {
	    type: 'doughnut',
	    data: datasets, //데이터 셋 
	    options: {
	        responsive: false,
	        maintainAspectRatio: false, //true 하게 되면 캔버스 width,height에 따라 리사이징된다.
	        legend: {
	            position: 'top',
	            fontColor: 'black',
	            align: 'center',
	            display: true,
	            fullWidth: false,
	            labels: {
	                fontColor: 'rgb(0, 0, 0)'
	            }
	        },
	        plugins: {
	            labels: {//두번째 script태그를 설정하면 각 항목에다가 원하는 데이터 라벨링을 할 수 있다.
	                render: 'value',
	                fontColor: 'black',
	                fontSize: 15,
	                precision: 2
	            },
	        }
	    }
	}
	
	// var canvas=document.getElementById('pieChart');
	// canvas.width = 300;
	// canvas.height = 300;
	// var pieChart = new Chart(canvas,config);
	
	
	var dataset = {
	    label: "재계약률",
	    backgroundColor: ['#28c3d7'],//라벨별 컬러설정
	    //borderColor: '#22252B',
	    data: [40]
	}
	
	var labels = ['재계약률(%)']; 
	  
	var datasets = { datasets:[dataset], labels:labels }
	
	var config = {
	    type: 'doughnut',
	    data: datasets, //데이터 셋 
	    options: {
	        responsive: false,
	        maintainAspectRatio: false, //true 하게 되면 캔버스 width,height에 따라 리사이징된다.
	        legend: {
	            position: 'top',
	            fontColor: 'black',
	            align: 'center',
	            display: true,
	            fullWidth: false,
	            labels: {
	                fontColor: 'rgb(0, 0, 0)'
	            }
	        },
	        plugins: {
	            labels: {//두번째 script태그를 설정하면 각 항목에다가 원하는 데이터 라벨링을 할 수 있다.
	                render: 'value',
	                fontColor: 'black',
	                fontSize: 15,
	                precision: 2
	            },
	
	        }
	    }
	}
	
	// var canvas = document.getElementById('pieChart2');
	// canvas.width = 300;
	// canvas.height = 300;
	// var pieChart2 = new Chart(canvas, config);
	
});

function setMap(x, y){
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	    mapOption = { 
	        center: new window.kakao.maps.LatLng(y, x), // 지도의 중심좌표
	        level: 3 // 지도의 확대 레벨
	    };
	
	var map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	
	// 마커가 표시될 위치입니다 
	
	var markerPosition  = new window.kakao.maps.LatLng(y, x); 
	
	// 마커를 생성합니다
	var marker = new window.kakao.maps.Marker({
	    position: markerPosition
	});
	
	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);
	
	// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
	// marker.setMap(null);   
}
