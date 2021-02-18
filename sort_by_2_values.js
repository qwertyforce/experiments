const data=[
    {a:1,b:1},
    {a:2,b:6},
    {a:4,b:2},
    {a:2,b:7},
    {a:5,b:9},
]
data.sort((a,b)=>a.a - b.a || a.b - b.b);
console.log(data)

//{a: 1, b: 1}
//{a: 2, b: 6}
//{a: 2, b: 7}
//{a: 4, b: 2}
//{a: 5, b: 9}