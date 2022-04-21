function rand() { Math.ceil(Math.random());}


var pitch = [ rand(), rand() , rand() ]


var swing =null;

var s = 0;
var b = 0;
	

while( s!=3 ){

	swing = String( prompt('투수가 공을 던졌습니다!') );
	
	if( swing==='null'){
		break;
	} 
	var i;
	var k;
	for( i=0; i<3 ; i=i+1 ){
		if(swing[i]===pitch[0]){
			s = s+1;
		}	
	}
	
	for(i=0; i<3 ; i=i+1 ){
		
		for(k=0; k<3 ; k=k+1){
			if(swing[i]===pitch[k]){
				b=b+1;
			}		
		} 
	}
	
	b=b-s;
	
	alert(s+' 스트라이크  '+b+' 볼 입니다!');
	
}

				 