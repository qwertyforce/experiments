let bool: boolean = true
let nmbr: number = 12345
let str: string = 'Hello_world'

let arr_of_str: string[] = ['1', '2', '3']
let arr_of_str2: Array<string> = ['1', '2', '3']

let tuple: [string, number] = ['1', 2]

enum Color { Red, Green, Blue }
let color: Color = Color.Green
enum Color2 { Red = 1, Green = 2, Blue = 3 }
let color2: Color2 = Color2.Green

let notSure: any = 4;
let notSure2: any[] = [1, "1", { a: 1 }]

function return_nothing(): void {
    console.log("text");
}

let str1: any = 'qwfqwf'
let str1_len: number = (<string>str1).length
let str2: any = 'qwfqwf'
let str2_len: number = (str1 as string).length

function fn(a: string | number): number {
    return <number>a
}
type str_or_num = string | number;
function fn1(a: str_or_num): number {
    return <number>a
}
console.log(fn(1)) //1
console.log(fn('2'))  //2

let x:object={a:1,b:2}
let y:object={c:1,x:2}
interface Y{
   c:number
}
function isY(x: any): x is Y {
    return x.c!==undefined
}

console.log(isY(x))
console.log(isY(y))
