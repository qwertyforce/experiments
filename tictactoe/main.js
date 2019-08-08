function indexOfMax(arr) {
    var max = -Infinity;
    var maxIndex = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max){
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

class q_learning_player {

	constructor() {
        this.q={};
        this.init_q_value=1;
        this.learning_rate=0.3;
        this.gamma=0.9;
        this.epsilon = 1.0;
        this.max_epsilon = 1.0;
        this.min_epsilon = 0.01;
        this.decay_rate = 0.01;
        this.max_actions_n = 9;

        this.last_state;
        this.last_action;
    }
	
    choose_action(state,actions){
    let r=Math.random();
    let empty=false;
    if(this.q[state]!==undefined){
          var max_i=indexOfMax(this.q[state]);
          action=actions[i]
    }else{  
    	    empty=true;
    		this.q[state]=new Array(this.max_actions_n).fill(this.init_q_value)
    		action=actions[Math.floor(Math.random()*actions.length)]
    }
    if(empty){
       return actions[Math.floor(Math.random()*actions.length)]
    }else{
    	if(r>this.epsilon){
    	 var index=indexOfMax(this.q[state]);
          return actions[index]
    	}else{
          return actions[Math.floor(Math.random()*actions.length)]
    	}
    }
    }

    reward(){

    }

}