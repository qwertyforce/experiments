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
factors=fermat(160203630710383183830478363853066808489975629956718066858588163415799677807831441514573863426734589607441557510596265096183)
print(factors)
print(min(factors))