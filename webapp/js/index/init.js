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

	// tbody 안에 있는 tr 요소들을 sortable로 설정
	$("#table01 tbody").sortable({
	        items: "tr", // 테이블 행(tr)만 드래그 가능하도록 설정
	        cursor: "move", // 마우스를 드래그할 때 커서를 "이동"으로 설정
	        axis: "y", // Y축 방향으로만 드래그 가능하도록 설정
	        update: function(event, ui) {
	        }
	}).disableSelection(); // 텍스트 선택 방지

	//도움말 클릭시
	$(".problem").on("click", function(){
		openModal("qDialog", "도움말", "800", "600", null, null, null);
	});


	// 버튼 클릭 시
    $('.pdBtn').click(function() {
	// 새로운 div 생성
	var newDiv = $('<div>', {
	    id: 'text-box',
	    class: 'edit-mode',
	    contenteditable: 'true',
	    text: '이곳에 텍스트를 입력하세요.'
	});

	// 생성한 div를 body에 추가
	$('body').append(newDiv);
    });

	

	var isDragging = false;
        var offset = { x: 0, y: 0 }; // 드래그 시 

             // 드래그 관련 이벤트 추가
      $('#text-box').on('mousedown', function(e) {
         isDragging = true;
         offset.x = e.pageX - $(this).offset().left;
         offset.y = e.pageY - $(this).offset().top;
      });

      $(document).on("mousemove", function(e) {
         if (isDragging) {
            	let newLeft = e.pageX - offset.x;
	        let newTop = e.pageY - offset.y;
	
	        // 부모 요소의 크기와 위치를 계산
	        let parentOffset = $('#formImg02').offset();
	        let parentWidth = $('#formImg02').outerWidth();
	        let parentHeight = $('#formImg02').outerHeight();
	        let textBoxWidth = $('#text-box').outerWidth();
	        let textBoxHeight = $('#text-box').outerHeight();
	
	        // 부모 영역 내에서만 이동하도록 제한
	        if (newLeft < parentOffset.left) newLeft = parentOffset.left;
	        if (newLeft + textBoxWidth > parentOffset.left + parentWidth) newLeft = parentOffset.left + parentWidth - textBoxWidth;
	        if (newTop < parentOffset.top) newTop = parentOffset.top;
	        if (newTop + textBoxHeight > parentOffset.top + parentHeight) newTop = parentOffset.top + parentHeight - textBoxHeight;
	
	        // 텍스트 박스 이동
	        $('#text-box').offset({
	            top: newTop,
	            left: newLeft
	        });
         }
      });

      $(document).on("mouseup", function(e) {
         isDragging = false;
      });

            // 저장 버튼 클릭 시 텍스트 저장
            $('#save-btn').on('click', function() {
                var updatedText = $('#text-box').text();
                alert('저장된 텍스트: ' + updatedText);
                $('#text-box').removeClass('edit-mode');
                $('#text-box').attr('contenteditable', 'false');
            });


	$("input[name=imgWidth]").on('input', function(){
		var value = $(this).val();
		if(value == ""){
			$("#formImg02").css("width", "100%");
		}else{
			$("#formImg02").css("width", value + "px");
		}
	});

	$("input[name=imgHeight]").on('input', function(){
		var value = $(this).val();
		if(value == ""){
			$("#formImg02").css("height", "100vh");
		}else{
			$("#formImg02").css("height", value + "px");
		}
		
	});

	$(".cleBtn").on('click', function(){
		$("input[name=imgWidth]").val("");
		$("input[name=imgHeight]").val("");
		$("#formImg02").css({
			width : "100%",
			height : "100vh"
		});
	});



	

	//엑셀업로드 클릭시
	$(".exuBtn").on("click", function(){
		$("input[name=upMth][value=D]").prop("checked", true);
		$('#excel-file').val('');
		openModal("exuDialog", "엑셀 업로드", "500", "260", "exupload()", null, null);
	});

	//엔터 클릭시
	$(".srch").on('keypress', function(e){
		if (e.key === "Enter") {
			var text = $(this).closest("div").find("input").val();
			var table = $("#table01");
			var tbody = table.find("tbody");
			var tr = tbody.find("tr");
	
			if(text == ""){
				alert("검색어를 입력해 주세요.");
				return false;
			}
			
			// 모든 항목에서 깜빡이는 효과 제거
	    		tr.find(".productNm").removeClass("blinking-border");
			tr.find(".productNm").css({
				"borderColor" : "black",
				"border-width" : "2px",
				"border-style" : "solid"
			});
	
			
			$.each(tr, function(i, item){
				var name = $(item).find(".productNm").val();
				if(name.indexOf(text) > -1){
					// 검색된 항목에 깜빡이는 경계선 효과 적용
	            			$(item).find(".productNm").addClass("blinking-border");
					$(item).find(".productNm").css({
						"borderColor" : "#FFEB3B",
						"border-width" : "5px",
						"border-style" : "solid"
					});
					lastFoundItem = $(item).find(".productNm"); // 마지막으로 찾은 항목 저장
				}
			});
			// 마지막으로 찾은 항목에 포커스
			if (lastFoundItem) {
				lastFoundItem[0].focus();
			}
		}
	});

	//검색 클릭시
	$(".schBtn").on('click', function(){
		var text = $(this).closest("div").find("input").val();
		var table = $("#table01");
		var tbody = table.find("tbody");
		var tr = tbody.find("tr");

		if(text == ""){
			alert("검색어를 입력해 주세요.");
			return false;
		}
		
		// 모든 항목에서 깜빡이는 효과 제거
    		tr.find(".productNm").removeClass("blinking-border");
		tr.find(".productNm").css({
			"borderColor" : "black",
			"border-width" : "2px",
			"border-style" : "solid"
		});

		
		$.each(tr, function(i, item){
			var name = $(item).find(".productNm").val();
			if(name.indexOf(text) > -1){
				// 검색된 항목에 깜빡이는 경계선 효과 적용
            			$(item).find(".productNm").addClass("blinking-border");
				$(item).find(".productNm").css({
					"borderColor" : "#FFEB3B",
					"border-width" : "5px",
					"border-style" : "solid"
				});
				lastFoundItem = $(item).find(".productNm"); // 마지막으로 찾은 항목 저장
			}
		});
		// 마지막으로 찾은 항목에 포커스
		if (lastFoundItem) {
			lastFoundItem[0].focus();
		}
		
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
	
			if(tbody.find("tr").length == 0){
				tbody.append('<tr class="noData" style=""><td colspan="4">자료가 없습니다.</td></tr>');
			}
		}
	);

	// 프린트 버튼 클릭 시
	$('.prtBtn').on('click', function() {
		// 로딩바 시작
		$('#prtOverlay').show();
		$('#loading-container').show();
		$('#loading-percent').show();
		$('#loading-bar').width(0);
		$('#loading-percent').text('0%'); // 퍼센트 초기화

		// 약간의 대기 후에 로딩바 시작
    		setTimeout(function() {
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
		        var space = -2;
		        var imagesPerPage = 18; // 한 페이지에 들어갈 이미지 개수
		        var imagesCount = 0; // 페이지에 추가된 이미지 개수
			var stdWidth = 0;
	
		        for (var i = 0; i < listItems.length; i++) {
				if(listItems[i].yn){
					imgWidth = 50;
					imgHeight = 30;
				}else{
					imgWidth = 60;
					imgHeight = 38;
				}
				if(i == 0 || i % 3 == 0){
						stdWidth = imgHeight + 1;
					}
		            	if (imagesCount >= imagesPerPage) {
			                pdf.addPage();
			                imagesCount = 0;
			                positionX = margin + 10;
			                positionY = margin;
		            	}
		
			        if (positionX + imgWidth > pageWidth) {
					positionX = margin + 10;
					positionY += 39;
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
		              var nmYMargin = 13;
				var lengthFlag = false;
		            
		        	nmYMargin = nmYMargin != 13 ? 13 : nmYMargin;
		            if(itemTagNm1.length > 5){
				    var nm1 = itemTagNm1.substring(0,7);
						var nm2 = itemTagNm1.substring(7,itemTagNm1.length);
						if(!listItems[i].yn){
							if(nm2 != ''){
								lengthFlag = true;
								nmYMargin -= 5.5;
								pdf.setFontSize(19); // ITEM_NM의 폰트 크기 설정
							}else{
								
								pdf.setFontSize(22); // ITEM_NM의 폰트 크기 설정
							}
						}else{
							if(nm2 != ''){
								lengthFlag = true;
								nmYMargin -= 7;
								pdf.setFontSize(16); 
							}else{
								nmYMargin -= 3;
								pdf.setFontSize(18); 
							}
						}
					}else{
						if(!listItems[i].yn){
							pdf.setFontSize(30); // ITEM_NM의 폰트 크기 설정
						}else{
							nmYMargin -= 3;
							pdf.setFontSize(26); 
						}
					}
				
					if(lengthFlag){
						// 텍스트의 너비 계산
						var textWidth = pdf.getTextWidth(nm1);
						// 이미지의 중앙 위치를 기준으로 텍스트의 위치 조정
						var centeredX = positionX + (imgWidth - textWidth) / 2;
						pdf.text(centeredX, positionY + nmYMargin, nm1);

						// 텍스트의 너비 계산
						var textWidth = pdf.getTextWidth(nm2);
						// 이미지의 중앙 위치를 기준으로 텍스트의 위치 조정
						var centeredX = positionX + (imgWidth - textWidth) / 2;
						if(!listItems[i].yn){
							nmYMargin += 6.5;
						}else{
							nmYMargin += 5.5;
						}
						pdf.text(centeredX, positionY + nmYMargin, nm2);
					}else{
						// 텍스트의 너비 계산
						var textWidth = pdf.getTextWidth(itemTagNm1);
						// 이미지의 중앙 위치를 기준으로 텍스트의 위치 조정
						var centeredX = positionX + (imgWidth - textWidth) / 2;
						pdf.text(centeredX, positionY + nmYMargin, itemTagNm1);
					}
						 
		            
					
					// 금액 설정
					pdf.setTextColor(255, 0, 0); // 빨간색
					var amtYMargin = 30;
					amtYMargin = amtYMargin != 30 ? 30 : amtYMargin;
				    if(listItems[i].amt.length > 4){
						if(!listItems[i].yn){
							positionX += 3;
							pdf.setFontSize(38); // ITEM_NM의 폰트 크기 설정
						}else{
							positionX += 3;
							amtYMargin -= 6;
							pdf.setFontSize(32); 
						}
						
				    }else{
					    space = space != -2 ? -2 : space;
						if(!listItems[i].yn){
							positionX += 3;
							pdf.setFontSize(48); // ITEM_NM의 폰트 크기 설정
						}else{
							amtYMargin -= 5;
							//positionX -= 2;
							space += 2;
							pdf.setFontSize(41); // ITEM_NM의 폰트 크기 설정
						}
						
				    }
		            pdf.text(positionX + 5, positionY + amtYMargin, listItems[i].amt);
		
		
		            // 원래의 폰트 크기로 되돌리기 (다음 루프에 영향을 주지 않게 하기 위해)
		            pdf.setFontSize(20);
		
		            positionX += imgWidth + space;
	
				    // 로딩바 진행 업데이트
				    var progress = Math.floor(((i + 1) / listItems.length) * 100); // 진행률 계산
				    $('#loading-bar').width(progress + '%'); // 로딩바 업데이트
				    $('#loading-percent').text(progress + '%'); // 퍼센트 업데이트
		        }
				var today = new Date();
				var year = today.getFullYear();
				var month = ('0' + (today.getMonth() + 1)).slice(-2);
				var day = ('0' + today.getDate()).slice(-2);
				
				var dateString = year + month  + day;
	
				// PDF 저장 전에 로딩바 업데이트
	    		$('#loading-bar').width('100%'); // 로딩 완료 상태로 설정
				$('#loading-percent').text('100%'); // 퍼센트 완료
		
		        pdf.save('착한가게24_가격표_' + dateString + '.pdf');
	
				// 다운로드 완료 후 로딩바 숨김
				setTimeout(function() {
					$('#prtOverlay').hide();
					$('#loading-container').hide();
					$('#loading-percent').hide();
				}, 500);
     		}, 100); // 약간의 대기 후 PDF 작업 시작

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

/** 엑셀업로드 **/
function exupload(){
	const file = $('#excel-file')[0].files[0];
	if(file == undefined){
		alert('업로드할 파일이 선택되지 않았습니다.');
		return false;
	}
	if (file) {
		var upMth = $("input[name=upMth]:checked").val();
		// 파일 타입 체크 (엑셀 파일인지 확인)
                const fileExtension = file.name.split('.').pop().toLowerCase();
                const validExtensions = ['xlsx', 'xls'];

                if ($.inArray(fileExtension, validExtensions) === -1) {
                    alert('엑셀 파일만 업로드 가능합니다.'); // 엑셀 파일이 아니면 경고
                    return false;
                }

		if(upMth == "D"){
			confirm("엑셀 파일을 업로드하면 기존에 입력된 데이터가 모두 초기화됩니다.\n정말로 진행하시겠습니까?");
		}else{
			confirm("엑셀 파일을 업로드 하시겠습니까?");
		}

		// 로딩바 시작
		$('#prtOverlay').show();
		$('#loading-container').show();
		$('#loading-percent').show();
		$('#loading-bar').width(0);
		$('#loading-percent').text('0%'); // 퍼센트 초기화
		
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const data = e.target.result;
                        
                        // 엑셀 파일을 읽어서 워크북으로 변환
                        const workbook = XLSX.read(data, { type: 'binary' });
                        
                        // 첫 번째 시트만 읽기
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        
                        // 시트 데이터를 JSON으로 변환
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                        // 리스트에 데이터 추가
                        if(upMth == "D"){
				$('#table01 tbody').empty(); // 이전 리스트 초기화
			}
			if($("#table01 tbody tr.noData").length > 0 ){
				$("#table01 tbody tr.noData").remove();
			}
                        $.each(jsonData, function(i, item){
				var tr = $('#table01 tfoot tr').clone();
				if(i != 0){
					tr.find("input.productNm").val(item[4]);
					tr.find("input.productAmt").val(item[12]);

					if(item[0] == '음료'){
						tr.find("input.drinkYn").prop("checked", true);
					}
					
					// 클론한 tr을 tbody에 추가
	    				$('#table01 tbody').append(tr);
				}
				// 로딩바 진행 업데이트
			    var progress = Math.floor(((i + 1) / jsonData.length) * 100); // 진행률 계산
			    $('#loading-bar').width(progress + '%'); // 로딩바 업데이트
			    $('#loading-percent').text(progress + '%'); // 퍼센트 업데이트
			});
			    // PDF 저장 전에 로딩바 업데이트
	    		$('#loading-bar').width('100%'); // 로딩 완료 상태로 설정
			$('#loading-percent').text('100%'); // 퍼센트 완료
                    };
		

                    // 엑셀 파일을 바이너리로 읽기
                    reader.readAsBinaryString(file);

		// 다운로드 완료 후 로딩바 숨김
		setTimeout(function() {
			$('#prtOverlay').hide();
			$('#loading-container').hide();
			$('#loading-percent').hide();
		}, 500);
                }
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
	btn += "<div style='text-align:center;margin-top:20px;' class='btn'>";
	if(fnConfirm != null){
		btn += '<a id="confirm" class="" style="padding:5px;border-radius:8px;text-decoration:none;margin-right:3px;background-color:#2A93F7;color:#fff" href="javascript:;" onclick=""><span>확인</span></a>';
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
