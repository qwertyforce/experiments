import math
from decimal import *
getcontext().prec = 250
def fermat(n):
    x=Decimal(n).sqrt().__ceil__()
    if x**2==n:
        return [x,x]
    for i in range(80000):
        print(f'iteration {i}')
        l=x**2-n
        y=Decimal(l).sqrt()
        if(y%1==0):
            return [x-y,x+y]
        x+=1
print(fermat(42349*48527))

