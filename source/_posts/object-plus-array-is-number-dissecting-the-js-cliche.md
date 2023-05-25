---
title: Object + Array is a Number? Dissecting the JS type casting clichè
excerpt: >
  The JS type system might be quirky and sometimes even funny, but it is not by random {} + [] is equal to 0. In this article I'm dissecting why that is the case.
date: 2023-05-25 21:55:58
tags:
- javascript
- explained
---

I don't like bashing on software, but let's talk about JavaScript and its type system. For me, it's a bit of a cliché;

We all know it's quirky, gives unexpected - sometimes even funny - conversions. The [famous talk WAT](https://www.destroyallsoftware.com/talks/wat) by Gary Bernhardt highlights it a humorous and interesting way, and I would recommend anyone with a bit of coding skills to watch it - it's a total blast. But it also got me curious how it _actually_ works. There must be an explanation to why, if you add up an object and an array for example, it doesn't give a type error - but a number.

## The wat

I chose to focus on a particular line to keep it simple;

```js
{} + [] === 0 // Evaluates to true
```

To quote Gary Bernhardt;

> "Who in their right mind would construct something like this?"

## Un-wat-ing the wat

### Using an AST

Breaking down the example, we can see that eventually, it will make sense (or well... it's at least not by coincidence).

Let's run the expression through an [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) visualizer (I chose [astexplorer.net](https://astexplorer.net), in [this example](https://astexplorer.net/#/gist/f0b48068008893a66c86341d55606792/latest)).

We can quickly get some very interesting insights from the result:

```txt
Program {
  body: [
    BlockStatement {
      body: []
    }
    ExpressionStatement {
      UnaryExpression {
        operator: '+'
        prefix: true
        argument: ArrayExpression {
          elements: []
        }
      }
    }
  ]
}
```

### The object is not an object - wat

From the AST we can learn that the empty object is in fact *not* parsed as an object, but an empty [block statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block). Wat?

A block statement is a relatively unknown (yet, very widely used) feature of JS that lets you combine statements where you can otherwise only fit one. The most common one is probably fitting multiple statements into an `if` like so:

```js
if (true) // if statement
{ // beginning of block statement, letting us call two functions conditionallly
  doSomethingConditionally()
  doSomethingElseConditionally()
} // end of block statement
```

What we thought was an empty object, is really just an empty block statement. It means it is not an expression - which in its turn means it doesn't have a value. So what *does* it evaluate to? The answer is; nothing. It's simply not an expression - so it's not even `undefined` or `null`. From an evaluation perspective, it could be removed and give the same result.

### The addition operator is not an addition operator - wat

So if we don't have a value on the left hand side of the addition operator, it turns out it is actually not parsed as an addition operator, but a [unary plus operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus). Wat?

Unary plus is simply used as a way of casting the right-hand side expression to a number (so it does the same thing as `Number(<expression>)`).

### Casting any type to number

> The conversion abstract operations [type casts] are polymorphic; they can accept a value of any ECMAScript language type.
> 
> ECMAScript specification

What this means is that any type in JS can be type casted, following a very clear set of rules. What happens when you try to type cast an empty array to a number is;

1. Since the `Array` prototype doesn't have a `toNumber()` method, it is casted to a string. `toString()` is implemented like `[].join('')`, meaning empty array becomes empty string
2. Empty string is cast to a number, which will become `0`
3. Thus, `{} + [] === 0`

## Confirming the un-wat

We can confirm the above is true by trying a few variations:

```js
{} + [1337] // 1337
{} + ['abc123'] // NaN
{ var thing = '1' } + [thing] // 1

// By adding parenthesis around the curly braces, we can force them to mean empty object instead of block statement
({}) + [] // "[object Object]"

// ...or by assigning it to a variable
const obj = {}
obj + [] // "[object Object]"
```

So what's the key takeaway here? IMO; Stay away from juggling types, and cast them explicitly :) 

-----

Sources:

- [ECMA Addition Operator Plus](https://262.ecma-international.org/13.0/#sec-addition-operator-plus) (which eventually calls [ApplyStringOrNumericBinaryOperator](https://262.ecma-international.org/13.0/#sec-applystringornumericbinaryoperator))
- [ECMA Type Conversion](https://262.ecma-international.org/13.0/#sec-type-conversion)
- [ECMA Array.prototype.toString](https://262.ecma-international.org/13.0/#sec-array.prototype.tostring)
