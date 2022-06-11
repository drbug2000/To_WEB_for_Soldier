var screen = document.getElementById('screen');
var main_sign = document.getElementById('main_sign');
var sub_sign = document.getElementById('sub_sign');


var timer;
var start_time;
var end_time;
var result= [];
var temp;


main_sign.textContent='게임을 시작하려면 클릭';
sub_sign.textContent='';


screen.addEventListener('click',function(e){
	var classArry=screen.classList;
	
	if(screen.classList==""){
		//console.log('change');
		screen.classList.add('set');
		main_sign.textContent='준비하세요 클릭하면 시작합니다';
		sub_sign.textContent='';
		
	}else if(screen.classList[0]==="set"){
		
		
		//console.log('change');
		screen.classList='';
		screen.classList.add('ready');
		
		main_sign.textContent='화면이 초록색으로 바뀌면 클릭하세요';
		sub_sign.textContent=result.length+'/3 완료';
		
		timer = setTimeout(function(){
			
			start_time= new Date;
			screen.classList='';
			screen.classList.add('go');
			
			main_sign.textContent='지금 클릭하세요!!!!';
			sub_sign.textContent='';
			
		},Math.floor(Math.random()*9000)+2000);
			
		
	}else if(screen.classList[0]==='ready'){
		
		main_sign.textContent='아직 화면이 초록색이 아닙니다!';
		sub_sign.textContent='클릭하면 처음으로 돌아갑니다';
		
		screen.classList='';
		screen.classList.add('notstart');
		clearTimeout(timer);
		
	}else if(screen.classList[0]==='go'){
		
		end_time= new Date();
		
		temp= end_time - start_time ;
		result.push(temp);
		
		switch(result.length){
			case 0:
				main_sign.textContent='잘하셨습니다. 클릭하면 다시 시작합니다';
				sub_sign.textContent='지난게임 반응 속도:'+temp+'ms';
				break;
			case 1:
				main_sign.textContent='그렇게 계속 하시면 됩니다! 클릭하면 다시 시작합니다';
				sub_sign.textContent='지난게임 반응 속도:'+temp+'ms';
				break;
			case 2:
				main_sign.textContent='마지막입니다. 클릭하면 다시 시작합니다';
				sub_sign.textContent='지난게임 반응 속도:'+temp+'ms';
				break;
				
			case 3:
				temp=0;
				temp=result.reduce(function(add,temp){
					return temp+add;
				});
				main_sign.textContent='게임종료! 당신의 평균 반응속도는'+ parseInt(temp/3)+'입니다';
				sub_sign.textContent='다시 시작하려면 클릭';
				result=[];
				
				screen.classList='';
				break;
			default:
				console.log('error: switch not have case error');
		}
		temp=0;
		
		screen.classList='';
		screen.classList.add('set');
		
		
	}else if(screen.classList[0]==='notstart'){
		
		main_sign.textContent='준비하세요 클릭하면 시작합니다';
		sub_sign.textContent='';
		
		screen.classList='';
		screen.classList.add('set');
		
	}else{
		console.log('no case');
	}
	
	
});