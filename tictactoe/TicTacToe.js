class Game {
    constructor(player) {
        this.state = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
        this.available_actions=[0,1,2,3,4,5,6,7,8];
        this.player=player;
    }
   check_win(){
   	for (var i = 0; i < 3; i++) {
   		if(this.state[i][0]===this.state[i][1]&&this.state[i][0]===this.state[i][2]){
     	return true
     }
     if(this.state[0][i]===this.state[1][i]&&this.state[i][i]===this.state[2][i]){
     	return true
     }
   	}
   	if(this.state[0][0]===this.state[1][1]&&this.state[0][0]===this.state[2][2]){
     	return true
     }
     if(this.state[0][2]===this.state[1][1]&&this.state[0][2]===this.state[2][0]){
     	return true
     }
     return false
   }
   make_move(x,y,player){
    state[y][x]=player;
   }
}