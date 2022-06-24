var theme = ["url(frogy/frog_sprite.png) no-repeat","url('sprite50.gif') no-repeat"];

var frogy_toggle=document.getElementById('frogy_toggle');

frogy_toggle.addEventListener('click', function toggle(e){
	
	for (var i of document.getElementsByTagName('td')){
		
		i.style.background = theme[0];
	
		
	}
	
	var temp = theme[0];
	theme[0]=theme[1];
	theme[1]=temp;
	
	
	
});
