

var frogy_toggle=document.getElementById('frogy_toggle');
var tbody = document.getElementsByTagName('tbody')[0];

frogy_toggle.addEventListener('click', function toggle(){
	
	var tbody = document.getElementsByTagName('tbody')[0];
	tbody.classList.toggle("frogy");
	
	
	
	if(frogy_toggle.classList.toggle("active_mode")){//when inactive
		frogy_toggle.textContent="개구리 모드 종료";	
		
		
		
	}else{
		frogy_toggle.textContent="개구리 모드 시작";	
	}
	
	frogy_toggle.classList.toggle("inactive_mode")
	
	
	
	
	
});
