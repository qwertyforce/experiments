"use strict";
let bool = true;
let nmbr = 12345;
let str = 'Hello_world';
let arr_of_str = ['1', '2', '3'];
let arr_of_str2 = ['1', '2', '3'];
let tuple = ['1', 2];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let color = Color.Green;
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
let color2 = Color2.Green;
let notSure = 4;
let notSure2 = [1, "1", { a: 1 }];
function return_nothing() {
    console.log("text");
}
let str1 = 'qwfqwf';
let str1_len = str1.length;
let str2 = 'qwfqwf';
let str2_len = str1.length;
function fn(a) {
    return a;
}
function fn1(a) {
    return a;
}
console.log(fn(1)); //1
console.log(fn('2')); //2
let x = { a: 1, b: 2 };
let y = { c: 1, x: 2 };
function isY(x) {
    return x.c !== undefined;
}
console.log(isY(x));
console.log(isY(y));
