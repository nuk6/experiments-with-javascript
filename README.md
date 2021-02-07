# experiments-with-javascript

1) [Parsing](https://bitsofco.de/async-vs-defer/#:~:targetText=The%20defer%20attribute%20tells%20the,document%20has%20been%20fully%20parsed.&targetText=Like%20an%20asynchronously%20loaded%20script,HTML%20document%20is%20still%20parsing.)
2) "use strict"; mode - 
    a) doesn't let you delete the variables 
    b) doesen't let you define variable named 'eval'
    c) doesen't let the variables in eval blocks (brackets) to leak out
    d) doesen't let you re-assign args inside a func
    e) if inside a func, only the inner block will be in a strict mode
```javascript
"use strict"
let u = 10;
delete u;
w = 10; 
let eval = 10; 
let x = 5;
eval("let x = 10"); //  but x is still 5
const f = function(arg){
    "use strict"
    arg = 10; // arg can't be re-assigned
};

```
3) Does JS pass by val or by ref? - Primitive Types by val, Non-Premitive type by ref, ref vals can't be modified
4) Rest operator - whenever passing arguments to a function, if we're unsure about the number of args
 -surprisigly, 'argument' variable inside a function looks like an array but for some reason it doesen't have few functions defined like 
 try the snippet below to understand
 ```javascript
 //"use strict";
f = () => {
   const f1 = function(){
       console.log(arguments);
       Array.prototype.mYmap = (it) => { console.log('Hi'); }
       Array.prototype.mYmap.call(arguments);
       arguments.map(it => {
           console.log(it, "\n");
       });
   }
   f1(1, 2, 3);
}
f();
```
5) Spread Operator (... looks just like rest operator but is used in diff context )
```javascript
f = function(){
    "use strict"
    const a1 = [1,2,3];
    const a2 = [ ...a1 ];
    a2[0] = 8;
    console.log(a1,a2);
}
f();
//(3) [1, 2, 3] (3) [8, 2, 3]
```
Another one
```javascript
f = function(){
    "use strict"
    const f1 = (a, ...rest_arg) => {
        console.log(a);
        console.log(rest_arg);
    }
    const arr = [1,2,3];
    const num = 10;
    f1(num, arr);
    f1(num, ...arr);
}
f();
/*
    10
    [Array(3)]
    10
    (3) [1, 2, 3]
*/
```
Btw, I hope you know the difference between 'compilation' & 'pollyfilling' :p
7) Template strings
```javascript
f = function(){
    "use strict"
    const s0 = 'string\'s'
    const s1 = "string's"
    const s2 = `
    S T 
    R I
    N G
    `
    console.log(s0,s1,s2);
}
f();
/*
string's string's 
    S T 
    R I
    N G
*/
```
8) Types & Equality 
NaN is not equal to anything including itself
```javascript
f = function(){
    "use strict"
    console.log( NaN == "1" )
    console.log( NaN == NaN )
    console.log( NaN === 1 )
    console.log( NaN === NaN )
    console.log( isNaN(NaN) );
    console.log( undefined == null );
    console.log( undefined === null )
}
f();
/*
false
false
false
false
true
true
false
*/
*/
```
9) Now my favorite one, Scopes & Variables && IIFE
```javascript
f = function(){
    "use strict"
    f = [];
    for(let i = 0; i < 10; i++){
        f[i] = () => { return i }
    }
    console.log(f[5]());
    const g = [];
    for(var i = 0; i < 10; i++){
        g[i] = () => { return i }
    }
    console.log(g[5]())
}
f();
/*
5
10
*/
```
IIFE example
```javascript
f = function(){
    //"use strict"
    ((i) => {
        console.log(i)
    })(8)
}
f();
/*
8
*/
```
9. Destructuring
```javascript
f = function(){
    "use strict"
    function f({x}){
        console.log(x)
    }
    f({});
    f({x:9})
    f({y:9})
    function g({x = 5}){
        console.log(x)
    }
    g({});
    g({x:9})
    g({y:9})
}
f();
/*
undefined
9
undefined
5
9
5
*/
```
