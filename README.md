# experiments-with-javascript

1) [Parsing](https://bitsofco.de/async-vs-defer/#:~:targetText=The%20defer%20attribute%20tells%20the,document%20has%20been%20fully%20parsed.&targetText=Like%20an%20asynchronously%20loaded%20script,HTML%20document%20is%20still%20parsing.)
2) "use strict"; mode - 
    a) doesn't let you delete the variables 
    b) doesen't let you define variable named 'eval'
    c) doesen't let the variables in eval blocks (brackets) to leak out
    d) doesen't let you re-assign args inside a func
    e) if inside a func, only the inner block will be in a strict mode
    f) in sctict mode, default value of 'this' in a function within an Object (context) won't be 'window' but 'undefined'
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
```javascript
{
  const f = (k) => { 
    k = {}; 
    k.t = 6; 
    console.log(k)  // k.t == 6
  }
  const u = {t:9};
  let v = {t:9};
  f(u)
  f(v)
  console.log(u) // t == 9
  console.log(v) // t == 9, k = {t: 9}  doesn't change, doesn't throw
}
```
5) Rest operator - whenever passing arguments to a function, if we're unsure about the number of args
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
Destructuring array
```javascript
f = function(){
    "use strict"
    const arr = [2,3,4,5]
    const [a,b,c,d,e] = arr
    console.log(a,b,c,d,e)
}
f();
/*
2 3 4 5 undefined
*/
```
10. This 
the value of this depends on the calling context
```javascript
f = function(){
    const obj = {
        f1: function() {
            console.log(this)
        }
    }
    obj.f1();
    const f1 = obj.f1;
    f1();
    const obj1 = {
        f2: function() {
            //"use strict"
            this.prop1 = "abc"
            console.log(this)
        }
    }
    obj1.f2()
    const f2 = obj1.f2;
    f2();
}
f();
/*
The first call prints obj Object while the next call prints Window object
A good way is to use use-strict so that it sets the value of this within an execution context from 'Window' to 'undefined'
At line 210, uncomment & check
*/
```
```javascript
{
  const a = {
  p1 : 'Dummy Object param!',
  f1 : function() {
    console.log(this.p1) // 'Dummy Object param!
    {
      // Just a block
      console.log(`Inside - ${this.p1}`) // Inside - Dummy Object param!
    }
    function a2() {
      console.log(`Func - ${this.p1}`)
    }
    a2() // Func - undefined
    a2.call(this) // Func - Dummy Object param!
    a3 = () => {
      console.log(`Fat Arrow -  ${this.p1}`)
    }
    a3() // Fat Arrow -  Dummy Object param!
  }
}
a.f1()
}
```
11. Call, Apply
```javascript
f = function(){
    const obj = {
        a : 10,
        f : function(b,c,d){
            "use strict"
            console.log(this)
            console.log(b)
            console.log(c)
            console.log(d)
        }
    }
    obj.f(2,3,4)
    obj.f.call(1,2,3,4)
    obj.f.apply(1, [2,3,4])
}
f();
/*
The first call prints obj Object while the next call prints Window object
A good way is to use use-strict so that it sets the value of this within an execution context from 'Window' to 'undefined'
*/
```
12. Bind
```javascript
f = function(){
    const a = function(){
        "use strict"
        console.log(this)
    }.bind(1)
    a()
}
f();
/*
1
*/
```
13. Prototype based inheritance in javascript
```javascript
{
"use strict"

function Person(f_name, l_name) {
  this.first_name = f_name
  this.last_name = l_name
}

Person.prototype.full_name = function() {
  return this.first_name + "  " + this.last_name
}

var p1 = new Person("Nidhi", "Kumari")

function Prof(f_name, l_name, job) {
  Person.apply(this, [f_name, l_name])
  this.job = job
}

Prof.prototype = Object.create(Person.prototype) // Creating prototype chain

Prof.prototype.get_full_name = function(){
  return `${this.job}, ${this.first_name} ${this.last_name}`
}

console.log(p1.full_name())

const p2 = new Prof("Nidhi", "Kumari", "Analyst")
debugger
console.log(p2.get_full_name())
console.log(p2.full_name())
debugger;
}
```
14. Modules in JS [https://www.youtube.com/watch?v=qJWALEoGge4]
