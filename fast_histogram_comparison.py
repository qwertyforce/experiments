import numba
from numba import jit
import heapq
@jit(nopython=True,fastmath=True)
def find_bruteforce(IN_MEMORY_HISTS,target_image_id,k):
    query_hist=IN_MEMORY_HISTS[target_image_id]
    similarity2=np.sum(np.minimum(query_hist,IN_MEMORY_HISTS[1]))
    heap = [(similarity2,1) for x in range(0)]
    for key in IN_MEMORY_HISTS:
        similarity=np.sum(np.minimum(query_hist,IN_MEMORY_HISTS[key]))
        if len(heap) < k or similarity > heap[0][0]:
            # If the heap is full, remove the smallest element on the heap.
            if len(heap) == k: heapq.heappop(heap)
            # add the current element as the new smallest.
            heapq.heappush( heap, (similarity,key) )
    heap=[heapq.heappop(heap) for i in range(len(heap))]
    return heap
for x in range(100000):
    IN_MEMORY_HISTS[x]=np.random.randint(1,256,4096).astype("float32")
d1 = numba.typed.Dict.empty(numba.types.int64,numba.typeof(IN_MEMORY_HISTS[1]))
for k, v in IN_MEMORY_HISTS.items():
    d1[k] = v
    
for m in range(10):
    start = timer()
    find_bruteforce(d1,3248,10)
    end = timer()
    print((end - start)*1000) # Time in seconds, e.g. 5.38091952400282

