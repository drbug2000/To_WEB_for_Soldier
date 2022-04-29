function rand() { return  Math.floor(Math.random()*9)+1;}

/*
var pitch = [ rand(), rand() , rand() ];
*/

var altergameButton = document.createElement('button');
altergameButton.textContent ='대화창으로 게임시작';
document.body.append(altergameButton);

altergameButton.addEventListener('click',function () { 
	altergameStart()
});




function altergameStart(){

	var pitch = [];//같은 숫자 중복 회피 필요
	for(var i=0;i<3;i++){
		pitch.push( rand() );
		/*
		for(var k=0;k<i;k++){
			if(pitch[i]===pitch[k]){
				pitch.pop();
				pitch.push( rand() );
				continue;	
			}
			
		}
		*/
		var k=0;
		while(k !== i){
			if(pitch[i]===pitch[k]){
				pitch.pop();
				pitch.push( rand() );
				continue;	
			}
			k++;	
		}
	}


	var billboard = null;

	var swing =null;

	var s ;
	var b ;
	

	while( s!=3 ){
	
		s = 0 ;
		b = 0 ; 
	
		swing =  String(prompt('투수가 공을 던졌습니다!') );
	
		if( swing==='null'){
			break;
		} //취소시 종료
	
	
	
		for( var i=0; i<3 ; i=i+1 ){
			if(swing[i]==pitch[i]){//자료형이 달라 '=='으로 비교함
				s++;
			}
		}
	
		for(var i=0; i<3 ; i=i+1 ){
		
			for(k=0; k<3 ; k=k+1){
				if(swing[i]==pitch[k]){//자료형이 달라 '=='으로 비교함
					b++;
				}
			} 
		}
	
		b = b - s;//중복 제거
	
		if( s===0 && b===0){
			alert('아웃!');
		
			billboard = 'out';
		}else{
			alert(s+' 스트라이크  '+b+' 볼 입니다!');
			billboard = s + ' s  ' +b+ ' b'; 
		}
	
		document.write(swing + ' -> ' +billboard+'!'+'<br>');
	}

	if(s===3){
		alert('3스트라이크! 게임 끝!');
	}

	
	
	
}