var tableSize =3;


var body = document.body;
var table = document.createElement('table');
//행 row 열 column / cell

var matrix =[];
var turn='X';


//본문 게임판 생성
for(var i =0;i< tableSize; i++){
	var rowTag = document.createElement('tr');
		
		matrix.push([]);
	for(var j=0;j<tableSize; j++){
		//cell == colTag
		var cell = document.createElement('td');
		cell.addEventListener('click',Fclick);
		matrix[i].push(cell);
		//cell.textContent = String(i)+String(j);
		rowTag.appendChild(cell);
		
		
	}
	
	table.appendChild(rowTag);
		
}
body.appendChild(table);


//cell 클릭시 일어나는 반응
function Fclick(e){
	console.log("click work");
	console.log(e.target);//그줄 
	//console.log(matrix.indexOf(e.target));
	console.log(Findindex(e.target));
	
	if( (e.target.textContent !== 'X')&&(e.target.textContent !== 'O')){
		e.target.textContent = turn;
		turn = Turnswitch(turn);//call-by-value
	}else{//이미 O혹은 X가 있는 경우	
		return;
	}
	
	if(Checkwin(e.target)){
		turn = Turnswitch(turn);
		alert(turn+'의 승리!');
	}
	
	
}


function Checkwin(target){
	
	var coor =Findindex(target);
	
	//[col,row]
	var col=coor[0];
	var row=coor[1];
	
	console.log(col,row);
	
	//공통적으로 행과 열 확인
	if(Checkcol(col)||Checkrow(row)){
		console.log('행렬 체크 승리');
		return true;
	}
	
	
	//대각선에 포함된 cell의 경우, 대각선도 계산
	var cross = false;
	
	if( row===col ){//  \이런 대각선에 속해있는 경우
		cross=cross||Checkcross(1);
		
		if(row+col===tableSize-1){//중앙에 속해있는 경우(tableSize가 짝수면 만족 X)
			cross=cross||Checkcross(-1);	
		}
		
	}else if( (row+col) === (tableSize-1) ){
		cross= ( cross||Checkcross(-1) );		
	}
	
	
	//대각선 계산//  return을 한 번에 모으면 효율적이지 못하고, 매번하면 코드가 무거워져서 대안으로 행,열 / 대각선 나눠처리
	if(cross){
		console.log('대각 체크 승리');
		return true;	
	}
	
	console.log('체크 이상무');
	return false;
}



function Turnswitch(turn){
	
	if(turn==='X'){
		turn = 'O';		
	}else{
		turn= 'X';
	}
	return turn;
}




function Checkarray(array){
	
	result =true;
	for(var i=0;i<tableSize-1;i++){
		for(var j=i+1;j<tableSize;j++){
		result = result && (array[i].textContent===array[j].textContent);
		//console.log('기본어레이'+result+':'+i+j);
		}
	}
	return result;
}

function Checkrow(row){
	
	var temp=[];
	
	for(var i=0;i<tableSize; i++){
		temp.push(matrix[i][row]);
		console.log('Checkrow :' + temp[i].textContent);
	}
	
	return Checkarray(temp);
}

function Checkcol(col){
	
	var temp=[];
	
	for(var i=0;i<tableSize; i++){
		temp.push(matrix[col][i]);
		//console.log('Checkcol 결과 : '+temp);
		console.log('Checkcol :' + temp[i].textContent);
	}
	return Checkarray(temp);
	
}
// 대각선 확인 함수  /:-1  \:1
function Checkcross(c){
	
	var temp = [];
	var s;
	
	if(c>0){// \이런 대각선의 경우
		s=0;
	}else if(c<0){// /이런 대각선의 경우
		s=tableSize-1;
	}else{
		console.log('function Checkcross error');
	}
	
	for(var i =0;i<tableSize;i++){
		temp.push(matrix[Math.abs(s-i)][i]);
	}
	
	return Checkarray(temp);
}

/*
8가지를 검사 (행3 열3 대각2)
3가지 유형
	1)꼭지점 
		자기 속한 행1,열1 + 대각1
	2)변
		자기 속한 행1, 열1
	3)중앙
		자기 속한 행1,열1+ 대각 2
		
	if(Findindex===[1,1]){
	중앙값	
	}else if(var sum=Findindex[0]+Findindex[1]%2===0){
	꼭지값
	}else {
	변각
	}
	
	검사식
	행 [row][i] 
	
	열 [j][col]
	
	0,2/1,1/2,0
	2,2/1,1/0,0
	대각 sum===2 -> s=0	
		else    -> s=tableSize
				
				for(var i =0;i<tableSize;i++){
				 [Math.abs(s-i)][tableSize-i]
				}
*/






function Findindex(target){
	
	var row = null;
	var col = null;
	
	for(var i =0 ; i<tableSize; i++){
		
		col = matrix[i].indexOf(target);
		if( col !== -1 ){
			row = i; 
			break;	
		}
	}
	return [row,col];
}





/*
cross 함수 맛이감 /는 인덱스 오류, \는 계속 true 반복 = 해결

Checkarray => 계속 true만 출력했으나, .textContent 로 어느 레벨에서 해야하는 지의 문제로 판명남

행렬체크 승리 오류 = 잘되는거 같다가도 계속 하다보면 이상함
	Checkcol true는 나오는데 왜지
	한타이밍 늦게 뜨는거 같은디 || row, col이 잘못 되어있는거 같기도

===> col과 row가 뒤집어짐
=> 그냥 함수 이름/인수 헷갈림.....

2차원 다룰시 [][]과 (n,n) 잘 정리 후 사용 하자.....(자꾸 처음 부터 뒤지고, 다시 정리 해야함)
이 함수도 다시 해야할듯....


종료부분만 만들면 될듯
*/