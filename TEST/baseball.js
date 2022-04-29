function rand() { return  Math.floor(Math.random()*9)+1;}

/*
var pitch = [ rand(), rand() , rand() ];
*/

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

/*
실험 결과 : s==3을 제외한 1s, 2s를 인식을 못함
		b>1 이상이면 s도 잘 작동 되지만, b=0이면 s 고장



123 -> 0 s 1 b!
456 -> out!
456 -> out!
789 -> 0 s 1 b!
555 -> 1 s 2 b!
456 -> out!         이 경우를 인식을 못함
725 -> 0 s 3 b!
235 -> 1 s 1 b!
345 -> 0 s 1 b!
567 -> 1 s 1 b!
568 -> 0 s 1 b!
456 -> out!
257 -> 3 s 0 b!
*/