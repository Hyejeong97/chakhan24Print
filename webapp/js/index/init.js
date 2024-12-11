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

	//도움말 클릭시
	$(".problem").on("click", function(){
		openModal("qDialog", "도움말", "800", "600", null, null, null);
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

	// 프린트 버튼 클릭 시
	$('.prtBtn').on('click', function() {
		// 로딩바 시작
		$('#prtOverlay').show();
		$('#loading-container').show();
		$('#loading-bar').width(0);
		
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

		// PDF 저장 전에 로딩바 업데이트
    		$('#loading-bar').width('100%'); // 로딩 완료 상태로 설정
	
	        pdf.save('착한가게24_가격표_' + dateString + '.pdf');

		// 다운로드 완료 후 로딩바 숨김
		setTimeout(function() {
			$('#prtOverlay').hide();
			$('#loading-container').hide();
		}, 500);
     

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


/**
	 * 모달창
	 */
function openModal( id, title, width, height, fnConfirm, fnCancel, fnAddBtn  ) {
	var $div = $("#" + id);
	var $contents = $div.find(".contents");
	$contents.css("overflow", "auto");
	
	// 확인, 닫기 제외 추가 버튼이 필요할 때(리스트 {버튼명 : 클릭시 발생할 함수})
	if(fnAddBtn != null){
		var list = fnAddBtn;
		$.each(list, function(key, value){
			// 이전에 등록된 클릭 이벤트 핸들러 제거
			$div.find("#" + key + ", ." + key + "").off("click");
			$div.find("#" + key + ", ." + key + "").on("click", function(e){
				if(eval(value) == false){
					// false인 경우 아무 작업도 하지 않음
				}else{
					$("#" + id).hide();
					$overlay.remove();
				}
			});
		});
	}
	var btn = "";
	/** 확인 **/
	btn += "<div style='text-align:center;' class='btn'>";
	if(fnConfirm != null){
		btn += '<a id="confirm" class="defaultBtn mT10" style="margin-right:3px;background-color:#2A93F7;color:#fff" href="javascript:;" onclick=""><span>확인</span></a>';
	}
	/** 취소 **/
	if(fnCancel != null){
		btn += '<a id="cancel" class="defaultBtn mT10" href="javascript:;"><span>취소</span></a>';
	}
	btn += "</div>";
	if($contents.find(".btn").length == 0){
		$contents.append(btn);
	}
	// 이전에 등록된 클릭 이벤트 핸들러 제거
	$div.find("#confirm").off("click");
	$div.find("#confirm").on("click", function(e){
		if(eval(fnConfirm) == false){
			// false인 경우 아무 작업도 하지 않음
		}else{
			$("#" + id).hide();
			$overlay.remove();
		}
	});
	if($contents.find("div.title").length == 0){
		var titleDiv = "";
		if(title != "" && title != null){
			titleDiv += "<div style='border-bottom:1.5px solid black;margin-bottom:15px;' class='title'>";
			titleDiv += "<div style='float:left;'><h1 class='' style='font-size:18px;font-weight:bold;margin-top:10px;color:black;'>" + title + "</h1></div>";
			titleDiv += "<div style='float:right;'><a href='javascript:;' class='closeBtn' style='cursor:pointer;text-decoration:none;'>✖️</a></div><br><br>";
			titleDiv += "</div>";
			$contents.prepend(titleDiv);
		}
	}
	
    // 배경을 덮는 요소 추가
    var $overlay = $('<div class="overlay"></div>');
    $('body').append($overlay);
	
	/** 여러 모달창을 띄우는 경우 **/
	var contents = $(".contents").not($contents);
	if($(".overlay").length > 1){
		$.each(contents, function(i, item){
			$(item).closest(".dpNone").css("z-index", "9998");
		});
	}

    $overlay.css({
	'position': 'fixed',
	'top': '0',
	'left': '0',
	'width': '100%',
	'height': '100%',
	'background-color': 'rgba(0, 0, 0, 0.5)',
	'z-index': '9997'  // 모달 창보다 낮은 z-index
    });
	
    $div.css({
	'display': 'none',
	'position': 'fixed',
	'top': '50%',
	'left': '50%',
	'transform': 'translate(-50%, -50%)',
	'width': width + 'px',
	'height': height + 'px',
	'background-color': 'rgba(0,0,0,0.5)',
	'justify-content': 'center',
	'align-items': 'center',
		'z-index': '9999'  // 모달 창보다 높은 z-index
    });

    $contents.css({
	'background-color': '#fff',
	'width': '100%',
	'height': '100%',
	'padding': '20px',
	'border-radius': '5px',
	'box-shadow': '0 0 10px rgba(0, 0, 0, 0.5)'
    });	
	
	$div.show();
	
	$div.find("#confirm").on("click", function(e){
	    if(fnConfirm === true) {
		$("#" + id).hide();
		$overlay.remove();
	    }
	});
	
	$div.find("#cancel, .closeBtn").on("click", function(e){
		$("#" + id).hide();
		$overlay.remove();
	});
	
}
