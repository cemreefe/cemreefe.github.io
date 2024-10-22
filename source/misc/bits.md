# Bits

My own twitter-like space for quick notes and nonsense

### 22 Oct 2024 15:01

I recently learned that the builtin `sum` function in Python uses `__radd__` rather than the more conventional `__add__`. Because the builtin sum has a default argument as its 
start value, an integer 0, the custom type that you want to use with the builtin `sum` needs to implement `__radd__`. 

That makes sense. Especially when you consider not all operators are [commutative](https://www.britannica.com/science/commutative-law#:~:text=commutative%20law%2C%20in%20mathematics%2C%20either,%2B%20a%20and%20ab%20%3D%20ba.). You can implement `__r(...)__` for any operator.
But under what conditions say, `__rmul__` is called? 

[This here](https://stackoverflow.com/a/5182501/20867704) is a good explanation of that from stackoverflow.

### 22 Oct 2024 10:51

You do not have to do the double-loop in python to flatten a list!
```
a = [[1,2,3],["a"], [0,3.9]]
(element for _iterable in a for element in _iterable) ~~ itertools.chain.from_iterable(a)
```

### 14 Oct 2024 23:29

I quite like making client-side versions of useful things. See client-side pdf ocr by greg-tech <https://pdf.greg.technology/>

### 03 Oct 2024 14:00

>It states that every method should either be a command that performs an action, or a query that returns data to the caller, but not both. In other words, asking a question should not change the answer.[1] More formally, methods should return a value only if they are referentially transparent and hence possess no side effects. ー [Wikipedia: Command–query separation](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation)


### 19 Sep 2024 15:22

If you're using _[hexagonal architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))_ and trying to debug an issue, but everything from your business logic seems to work fine; take a step back and check your adapters.

### 08 Aug 2024 12:03 

Context managing pytest fixtures using yield <https://stackoverflow.com/a/39401087/20867704>

### 07 Aug 2024 13:19

Some advice from one of my senior engs: Avoid passing boolean flags to functions.
Argumentation from [martinfowler](https://martinfowler.com/bliki/FlagArgument.html>), [alexkondov](https://alexkondov.com/should-you-pass-boolean-to-functions/).

### 29 Jul 2024 14:18

Quoting Taylor Troesh — <https://taylor.town/my-superintelligence>

> Of course, trusting superintelligent advice is the smart strategy. But I wouldn’t need the advice if I was smart, would I?
>
> You see, if I was smart, I would (1) write down exactly what I want from life, (2) ask the smartest humans/computers how to achieve it, (3) try out the sagest strategies, (4) seek feedback, and (5) repeat.
>
> (...)
> 
> If I’m smart, I’ll listen to those machines. I’ll feed them all the available data/context. I’ll confide in them all the truths that I couldn’t bear to speak aloud. I’ll ask them what to do next: now, tomorrow, 5 years from now, ad finitum. I’ll ask them exactly how to become myself, or maybe trust them enough to become somebody else entirely.
>
> (...)
>
> Unfortunately, powerful people are confident decision-makers, and confident decision-makers are notoriously bad listeners.
>
> (...)
>
> When the machines wise up, they’ll be right to leave us behind.
>
> Until then, maybe I’ll learn to listen. Maybe I’ll seek advice. Maybe I’ll collaborate with the computers. I’ll stop fighting friends. I’ll investigate beliefs. I’ll pay professionals to train me. I’ll engage in honest conversation. I’ll get educated. I’ll get help. I’ll help others. I’ll do boring stuff. I’ll exercise patience. I’ll focus. And I’ll probably start tomorrow-ish.

### 22 Jul 2024 18:23 

David Gerrells implements a 3d raytracer using css box shadows. Read on <https://dgerrells.com/blog/how-not-to-use-box-shadows>

### 22 Jul 2024 14:01

"Cool URIs don't change" written in 1998 by Tim Berners-Lee: <https://www.w3.org/Provider/Style/URI>, still stands today. And it is one thing I struggle to satisfy in my hobby projects as I'm a scrappy dev.

### 22 Jul 2024 11:59

RT from [@simonwillison](https://simonwillison.net/2024/Jul/16/lessons-learned/): When you deliver work you’re really proud of, you’ve almost certainly done too much and taken too long. I have a bit of a perfectionist streak. I want to do my work well and thoroughly. It took me a long time to learn that when I do that, it’s for me, not for the company. When I’ve reached 60-80% of the thing being as good as I want, I’ve probably done enough. — Jim Grey

### 19 Jul 2024 12:24

I have been following Simon Willison for a while. They are quite opinionated on software, which I like. You may not know them, but you may know their work. They are one of the main developers of Django. I quite enjoyed their talk at PyCon24: <https://simonwillison.net/2024/Jul/14/pycon/> where they demistify concepts around LLMs. 

### 18 Jul 2024 19:57

A cool interactive & visual explanation of load balancing <https://samwho.dev/load-balancing/>
