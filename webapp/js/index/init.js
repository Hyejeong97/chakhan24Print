$(document).ready(function(){

	$("input[type=text]").css({
		"font-size" : "20px",
		"font-weight" : "bold"
	});
	$("input[type=checkbox]").css("cursor", "pointer");
	$(".type07 thead th").css("font-size", "24px");
	$("[class*=Btn]").css("font-size", "20px");
	$("input.productAmt").css({
		"text-align": "right", 
		"padding-right" : "3px"
	});

	//추가 클릭시
	$(".addBtn").on('click', function(){
		var table = $("#table01");
		var tbody = table.find("tbody");
		var tfoot = table.find("tfoot");
		var tr = tfoot.find("tr").clone();
		if(tbody.find(".noData").length > 0){
			tbody.find(".noData").remove();
		}
		tbody.append(tr);
		}
	);

	//삭제 클릭시
	$(".delBtn").on('click', function(){
		var table = $("#table01");
		var tbody = table.find("tbody");
		var tfoot = table.find("tfoot");
		var chk = $(".chkYn:checked");
		if(chk.length == 0){
			alert("삭제할 목록을 선택해 주세요.");
			return false;
		}
		$.each(chk, function(){
			$(this).closest("tr").remove();
		});
		}
	);

	$('.prtBtn').on('click', function() {
                // jsPDF 객체 생성
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

		var table = $("#table01");
		var tbody = table.find("tbody");
		var tr = tbody.find("tr");
		
                // 리스트 항목 가져오기
		var listItems = new Array();
		$.each(tr, function(i, item){
			var obj = new Object();
			var name = $(item).find(".productNm").val();
			var amt = $(item).find(".productAmt").val();
			var yn = $(item).find(".drinkYn").prop("checked");
			obj.name = name;
			obj.amt = amt;
			obj.yn = yn;
			listItems.push(obj);
		});
	var pdf = new jsPDF();
    	var img = new Image();
   	var imgSrc = './webapp/img/form.jpg';

        var imgWidth = 60;
        var imgHeight = 38;
        var positionX = 15;
        var positionY = 5;
        var pageWidth = 210;
        var pageHeight = 297;
        var margin = 5;
        var space = 1;
        var imagesPerPage = 18; // 한 페이지에 들어갈 이미지 개수
        var imagesCount = 0; // 페이지에 추가된 이미지 개수

        for (var i = 0; i < listItems.length; i++) {
		if(listItems[i].yn){
			imgWidth = 50;
		}else{
			imgWidth = 60;
		}
            if (imagesCount >= imagesPerPage) {
                pdf.addPage();
                imagesCount = 0;
                positionX = margin + 10;
                positionY = margin;
            }

            if (positionX + imgWidth > pageWidth) {
                positionX = margin + 10;
                positionY += imgHeight + space;
            }

            // 이미지를 추가한 후에 이미지 개수를 증가시킴
            imagesCount++;

            //폰트 추가
            pdf.addFileToVFS('Cafe24Ohsquare.ttf', _cafe24Ohsquare);
            pdf.addFont('Cafe24Ohsquare.ttf','Cafe24Ohsquare', 'normal');
            pdf.setFont('Cafe24Ohsquare');

            // 테두리 추가
            pdf.setLineWidth(1);
            pdf.rect(positionX, positionY, imgWidth, imgHeight);

            // 이미지 추가
            pdf.addImage(imgSrc, 'PNG', positionX, positionY, imgWidth, imgHeight);

            // ITEM_NM에 대한 폰트 및 스타일 설정 (검정색)
            pdf.setTextColor(0, 0, 0); // 검정색
            pdf.setFontSize(20);

            var itemTagNm1 = listItems[i].name;
            var itemTagNm2 = listItems[i].name;
             if(listItems[i].amt != ""){
                if(itemTagNm1.length > 5){
			pdf.setFontSize(22); // ITEM_NM의 폰트 크기 설정
		}else{
			pdf.setFontSize(30); // ITEM_NM의 폰트 크기 설정
		}
                
		// 텍스트의 너비 계산
		var textWidth = pdf.getTextWidth(itemTagNm1);
		// 이미지의 중앙 위치를 기준으로 텍스트의 위치 조정
		var centeredX = positionX + (imgWidth - textWidth) / 2;
		pdf.text(centeredX, positionY + 13, itemTagNm1);
            } else {
                pdf.setFontSize(24); // 기본 폰트 크기로 설정
                pdf.text(positionX + 4, positionY + 13, itemTagNm1); // ITEM_NM 출력
            }
			
            // ITEM_PRICE에 대한 폰트 및 스타일 설정 (빨간색)
            pdf.setTextColor(255, 0, 0); // 빨간색
            //pdf.setFontSize(50);
	    if(listItems[i].amt.length > 4){
		pdf.setFontSize(45); // ITEM_NM의 폰트 크기 설정
	    }else{
		    space = space != 1 ? 1 : space;
		if(!listItems[i].yn){
			positionX += 3;
			
		}else{
			positionX -= 2;
			space += 2;
		}
		pdf.setFontSize(48); // ITEM_NM의 폰트 크기 설정
	    }
            pdf.text(positionX + 5, positionY + 30, listItems[i].amt);


            // 원래의 폰트 크기로 되돌리기 (다음 루프에 영향을 주지 않게 하기 위해)
            pdf.setFontSize(20);

            positionX += imgWidth + space;
        }
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	
	var dateString = year + month  + day;

        pdf.save('착한가게24_가격표_' + dateString + '.pdf');
     

	});
                
		

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
