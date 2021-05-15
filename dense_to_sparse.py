def dense_to_sparse(arr):
  return [[i, v] for i, v in enumerate(arr) if v > 0] 
