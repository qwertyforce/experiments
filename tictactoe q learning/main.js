class Game {
    constructor(player) {
        this.state = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
        this.available_actions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.player = player;
    }
    check_win() {
        for (var i = 0; i < 3; i++) {
            if (this.state[i][0] === this.state[i][1] && this.state[i][0] === this.state[i][2] && this.state[i][0] !== 0) {
                return true
            }
            if (this.state[0][i] === this.state[1][i] && this.state[0][i] === this.state[2][i] && this.state[0][i] !== 0) {
                return true
            }
        }
        if (this.state[0][0] === this.state[1][1] && this.state[0][0] === this.state[2][2] && this.state[0][0] !== 0) {
            return true
        }
        if (this.state[0][2] === this.state[1][1] && this.state[0][2] === this.state[2][0] && this.state[0][2] !== 0) {
            return true
        }
        return false
    }

    is_draw() {
        if (this.available_actions.length === 0) {
            return true
        } else {
            return false
        }
    }

    make_move(y, x, n) {
        if (isNaN(y) || isNaN(x)) {
            debugger;
        }
        this.state[y][x] = this.player;
        this.player *= -1;
        let index = this.available_actions.indexOf(parseInt(n));
        this.available_actions.splice(index, 1)
    }
}

function best_action(arr, actions) {
    if (actions === undefined) {
        debugger;
    }
    var max_action_score = -Infinity;
    var best_action;
    for (var action of actions) {
        if (arr[action] > max_action_score) {
            best_action = action;
            max_action_score = arr[action];
        }
    }
    return best_action;
}

class q_learning_player {

    constructor() {
        this.q = {};
        this.init_q_value = 1;
        this.learning_rate = 0.3;
        this.gamma = 0.9;
        this.epsilon = 1.0;
        this.max_epsilon = 1.0;
        this.min_epsilon = 0.01;
        this.decay_rate = 0.000001;
        this.max_actions_n = 9;

        this.last_state;
        this.last_action;
    }

    choose_action(state, actions) {
        this.last_state = state;
        let action;
        let r = Math.random();
        var temmmp = this.q[state]
        if (this.q[state] === undefined) {
            this.q[state] = new Array(this.max_actions_n).fill(this.init_q_value)
            action = actions[Math.floor(Math.random() * actions.length)]
        } else {
            if (r > this.epsilon) {
                action = best_action(this.q[state], actions);
            } else {
                action = actions[Math.floor(Math.random() * actions.length)]
            }
        }
        this.last_action = action;
        if (action === undefined) {
            debugger;
        }

        return action;
    }

    update_q_table(state, reward) {
        var last_Q;
        if (this.q[this.last_state] === undefined) {
            this.q[this.last_state] = new Array(this.max_actions_n).fill(this.init_q_value);
            last_Q = this.init_q_value
        } else {
            last_Q = this.q[this.last_state][this.last_action]
        }
        var max_future_q = -Infinity;
        if (this.q[state] === undefined) {
            this.q[state] = new Array(this.max_actions_n).fill(this.init_q_value);
            max_future_q = this.init_q_value;
        } else {
            for (var i = 0; i < this.q[state].length; i++) {
                if (this.q[state][i] > max_future_q) {
                    max_future_q = this.q[state][i];
                }
            }
        }

        this.q[this.last_state][this.last_action] = last_Q + this.learning_rate * (reward + (this.gamma * max_future_q) - last_Q)
    }

    epsilon_decrese(n) {
        this.epsilon = this.min_epsilon + (this.max_epsilon - this.min_epsilon) * Math.exp(-this.decay_rate * (n + 1))
    }

}

function train(agent) {
    for (var i = 0; i < 10000000; i++) {
        let first_player;
        Math.floor(Math.random() * 2) === 0 ? first_player = 1 : first_player = -1
        var game = new Game(first_player);

        while (true) {
            let move;
            if (game.player === 1) {
                move = agent.choose_action(game.state.toString(), game.available_actions)
            } else {
                move = game.available_actions[Math.floor(Math.random() * game.available_actions.length)]
            }
            if (move === undefined) {
                debugger;
            }

            // if (game.state.toString() === "0,-1,1,0,0,1,0,0,-1") {
            //     debugger;
            // }
            game.make_move(Math.trunc(move / 3), move % 3, move);
            var win_detected = game.check_win();
            var draw_detected = game.is_draw();
            if (win_detected || draw_detected) {
                if (win_detected) {
                    agent.update_q_table(game.state.toString(), -game.player)
                    break;
                } else {
                    agent.update_q_table(game.state.toString(), 0.5)
                    break;
                }

            } else {
                agent.update_q_table(game.state.toString(), 0)
            }
        }

        agent.epsilon_decrese(i)
    }
}

function play(agent) {
    let first_player;
    Math.floor(Math.random() * 2) === 0 ? first_player = 1 : first_player = -1
    var game = new Game(first_player);
    while (!game.check_win() && !game.is_draw()) {
        let move;
        if (game.player === 1) {
            move = best_action(agent.q[game.state], game.available_actions)
        } else {
            move = prompt("Choose move: "+ game.available_actions.toString())
        }
        console.log(move)
        game.make_move(Math.trunc(move / 3), move % 3, move);
    }
    console.log(game)
    console.log(game.check_win())
    console.log(game.is_draw())
}
var player = new q_learning_player();
train(player)
console.log(`q length= ${Object.keys(player.q).length}`)