function rand() { return  Math.floor(Math.random()*9)+1;}

/*
var pitch = [ rand(), rand() , rand() ];
*/

var pitch = [];
for(var i=0;i<3;i++){
	pitch.push( rand() );
}

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
		if(swing[i]==pitch[0]){//자료형이 달라 '=='으로 비교함
			s++;
		}
	}
	
	for(var i=0; i<3 ; i=i+1 ){
		
		for(k=i; k<3 ; k=k+1){
			if(swing[i]==pitch[k]){//자료형이 달라 '=='으로 비교함
				b++;
			}
		} 
	}
	
	b = b - s;//중복 제거
	
	alert(s+' 스트라이크  '+b+' 볼 입니다!');
	
	
}

				 