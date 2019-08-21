import numpy as np
import gym
import sys
import tensorflow as tf 
model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(128,input_shape=(1,4),activation='relu'),
  tf.keras.layers.Dense(2, activation='softmax')
])
optimizer = tf.keras.optimizers.Adam(learning_rate = 0.01)
#compute_loss = tf.keras.losses.MSE
#compute_loss = tf.keras.losses.BinaryCrossentropy()
compute_loss = tf.keras.losses.CategoricalCrossentropy()
model.summary()
def reset_grad_buffer(grad_buffer):
    for ix,grad in enumerate(grad_buffer):
        grad_buffer[ix] = grad * 0
    return grad_buffer

def discount_normalize_rewards(r, gamma = 0.99):
    discounted_r = np.zeros_like(r)
    running_add = 0
    for t in reversed(range(0, r.size)):
        running_add = running_add * gamma + r[t]
        discounted_r[t] = running_add
        # print(discounted_r)
    discounted_r -= np.mean(discounted_r)
    discounted_r /= np.std(discounted_r)
    return discounted_r
env = gym.make('CartPole-v0')
env.seed(1)
#env._max_episode_steps = 1000
episodes = 500
batch_size = 10

grad_buffer = model.trainable_variables
reset_grad_buffer(grad_buffer)
for e in range(episodes):
  
  state = env.reset()
  
  episode_memory = []
  episode_score = 0
  done = False 
  while not done:
    with tf.GradientTape() as tape:
      #forward pass
      state = state.reshape([1,4])
      logits = model(state)
      a_dist = logits.numpy()
      # Choose random action with p = action 
      a = np.random.choice(a_dist[0],p=a_dist[0])
      a, = np.where(a_dist[0] == a)
      a=a[0]   #need numpy int64
      if(a==0):
      	loss = compute_loss([[1,0]], logits)
      else:
      	loss = compute_loss([[0,1]], logits)
    # make the choosen action 
    state, reward, done, _ = env.step(a)
    episode_score +=reward
    grads = tape.gradient(loss, model.trainable_variables)
    episode_memory.append([grads,reward])
  
  episode_memory = np.array(episode_memory)
  episode_memory[:,1] = discount_normalize_rewards(episode_memory[:,1])
  for grads, r in episode_memory:
    for ix,grad in enumerate(grads):
      grad_buffer[ix] += grad*r

  if e % batch_size == 0:
  	print("Policy Updated")
  	optimizer.apply_gradients(zip(grad_buffer, model.trainable_variables))
  	reset_grad_buffer(grad_buffer)  
  print("Episode  {}  Score  {}".format(e, episode_score))