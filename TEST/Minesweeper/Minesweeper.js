var tableSize =5;//게임판의 크기
var minecounts =4; //지뢰의 개수


var body = document.body;
var table = document.createElement('table');
//행 row 열 column / cell

var underground =[];//실제 지뢰 위치
var gameboard =[];//보여지는 게임판 (구 matrix)
//var turn='X';

//underground 생성
for(var i=0; i<tableSize ; i++){
		underground.push([]);
		for(var j=0;j<tableSize;j++){	
		underground[i].push(0);
		
		}
	
	
	}

burial();
settingNum();


//본문 게임판 생성
for(var i =0;i< tableSize; i++){
	var rowTag = document.createElement('tr');
		
		gameboard.push([]);
	for(var j=0;j<tableSize; j++){
		var cell=document.createElement('td');
		cell.addEventListener('click',Fclick);
		gameboard[i].push(cell);
		//cell.textContent = String(i)+String(j);
		rowTag.appendChild(cell);
	}
	
	table.appendChild(rowTag);
		
}
body.appendChild(table);




//cell 클릭시 일어나는 반응
function Fclick(e){
	//console.log(e.target);//그줄 
	//console.log(matrix.indexOf(e.target));
	console.log(Findindex(e.target));
	
	var coor=Findindex(e.target);
	var row = coor[0];
	var col = coor[1];
	console.log(row);
	console.log(col);
	//e.target.textContent = underground[row][col];
	
	
	
	//판단 및 도굴함수
	if(Excavate(row,col)===-1){
			
		
		
	}
}


function Excavate(row,col){
	
	
	//벽인가
	if( (row<0)||(col<0)||(row>=tableSize)||(col>=tableSize)){//벽(게임판 밖 제거)
		console.log(row+'/'+col+'out of board');
		return 0;
	}
	//지뢰인가
	if(underground[row][col]<0){
		var boom = document.createElement('img');
		boom.src = "boom.PNG";
		gameboard[row][col].appendChild(boom);
		
		alert('지뢰가 터졌습니다! 게임 종료');
		return -1;
	}
	
	//이미 열렸는가
	if(gameboard[row][col].style.backgroundColor==='white') {
		console.log(row+'/'+col+'already open');
		return 0;
	}
	
	if( underground[row][col] > 0 ){//숫자인 경우
		
		gameboard[row][col].textContent = underground[row][col];
		gameboard[row][col].style.backgroundColor = 'white';
		console.log(row+'/'+col+'num');
		return 0;
		
	}else{//아직 열리지 않은 0인경우
		
		underground[row][col]=null;
		gameboard[row][col].style.backgroundColor = 'white';
		console.log(row+'/'+col+'');
		Excavate(row-1,col);
		Excavate(row,col-1);
		Excavate(row+1,col);
		Excavate(row,col+1);

		return 0;
	}
	
	console.log('Excavate function error : have no case');
	return -2;
	/*
	ii.i)벽인가?
	iii) 0<숫자인가?
	iv) 0인가? 
	*/
	
	
	
}


function Findindex(target){
	
	var row = null;
	var col = null;
	
	for(var i =0 ; i<tableSize; i++){
		
		col = gameboard[i].indexOf(target);
		if( col !== -1 ){
			row = i; 
			break;	
		}
	}
	return [row,col];
}


//지뢰코드 -1
function burial() {
	
	//지뢰 개수 오류
	if( (tableSize**2) <= minecounts ){
		console.log('minecounts errorr : too many mine');
		return -1;
	}
	
	var counts = minecounts;
	var row;
	var col;
	while(counts != 0){
		
		row = Math.floor(Math.random()*tableSize);
		col = Math.floor(Math.random()*tableSize);
		
		if(underground[row][col] < 0)
			continue;
		
		underground[row][col] = -1 ;//지뢰 매설
		counts--;
	}
	
	

    /*
	for(var i=0; i<tableSize ; i++){
		for(var j=0;j<tableSize;j++){	
		}
	}
	*/
}


//지뢰 주변 3*3으로 +1을 뿌리는 함수
function sprinkle(row,col){
		
		for(var i=-1; i<2 ; i++){
			for(var j=-1; j<2;j++){	
				if( (row+i<0)||(col+j<0)||(row+i>=tableSize)||(col+j>=tableSize))//벽(게임판 밖 제거)
					continue;
				if(underground[row+i][col+j] === -1)
					continue;
				underground[row+i][col+j]++;
			}
	}
}

//지뢰주변에 숫자를 +1 뿌리기위해 지뢰를 찾는 함수(지뢰 매설 함수와 합쳐도 좋을듯 하다)
function settingNum(){
	
	for(var i=0; i<tableSize ; i++){
		for(var j=0;j<tableSize;j++){
			if(underground[i][j]<0)
				sprinkle(i,j);
		}
	}
	
}

//2차 배열을 보여주는 디버깅용 함수(인데....console에서는 그냥 보여주네....)
function showArray( array ){
    
	for(var i=0; i<tableSize ; i++){
		var line=[];
		
		for(var j=0;j<tableSize;j++){	
			line.push( Number(array[i][j]) );
		}
		console.log(line);
	}
	
}


//underground 시각으로 디버깅위한 함수 (only console)(show())
function show(){
	var temp=[];
	for(var i =0;i< tableSize; i++){
			var rowTag = document.createElement('tr');
		
			temp.push([]);
		for(var j=0;j<tableSize; j++){
			var cell=document.createElement('td');
			cell.addEventListener('click',Fclick);
			temp[i].push(cell);
			cell.textContent = underground[i][j];
			rowTag.appendChild(cell);
		
		
		}
	
		table.appendChild(rowTag);
		
	}
	body.appendChild(table);
}

/*
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

*/











