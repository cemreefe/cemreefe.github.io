---
emoji:  🌙
tags:   coding
date:   2024-10-16
---

# Moonscript, and how it killed python

![Image depicting a snake in bits and pieces, early United States progaganda poster "Unite or die", highlighting disunity etween the colonies
](https://github.com/user-attachments/assets/b9fe2fd6-98c5-42ed-b8d9-088761d42c11)

I'm going to start this post off by talking about Lua. I promise it will make sense. This post is made by and made for someone
who enjoys using Python for their projects, and it employs a Python-based evaluation of the languages mentioned.

I started looking into Lua the programming language, because its name sounded cool. Lua means Moon in portuguese. In the official Lua website's own words 
_Lua is a powerful, efficient, lightweight, embeddable scripting language. It supports procedural programming, object-oriented programming, 
functional programming, data-driven programming, and data description._ These are certainly words. But what do they mean?

## Lua is interpreted (too!)

Lua is an interpreted language. Meaning you can execute the code line by line, and you can live-script in the language
using a Lua interpreter. This opens up Lua's usage in **Jupyter notebooks**. For which there is already an open-source solution named 
[xeus-lua](https://github.com/jupyter-xeus/xeus-lua). Jupyter notebooks used to be my programming medium of choice for a long time,
especially when I was doing research & data science, so I could trace back my steps, execute small snippets on the go, or
keep an eye on my results at every step to increase my visibility into the black box that is code.

## Python is slow, and not portable

Python programs **do not compile** into binary require the Python runtime to be installed on your computer to be run. The fact that people would require to install python 
to run the programs I wrote was weird concept to me, a nerd who ahd spent some of his finest hopscotching years writing C++ on Visual Studio and sending his
programs to classmates to wow them (never worked). The fact that I could not Pwn my schoolmates did not make much sense to me. In addition, 
the Python runtime is notoriously slow, and energy inefficient. This is the reason that if you have bootstrapped your startup with Python, and your computational 
complexity is above the O(n) line, boy do I have some stories with you. I am sure this is a common topic of discussion among many startup engineers, 
and you'll wish you never went anywhere near the scaly serpent.

## Lua is fast, and portable

On the other hand Lua _does compile_ into **C**. Which is lightning fast. In addition it is extremely portable. In fact, as a scripting language thats
easy to onboard, Lua has integration layers with a lot of programming languages, making it easy to embed into other applications. Lua is best known for 
its usage in Roblox, where little kids create all sorts of horrors beyond your imagination. 
See [Creating a Script](https://create.roblox.com/docs/tutorials/fundamentals/coding-1/creating-a-script) guide on the roblox website.

## Lua is dynamically typed (too!)

Lua uses dynamic typing, much like Python. So if you're one that jumbles up their types and doesn't like to try and guess what the future
holds for you, you'll love Lua too. I must however, admit that I have grown accustomed to types, and use typed Python, and found peace with it.

## Lua has even less keywords than Python

Python has 33 keywords, words that have a special meaning in the language such as `for`, `in`, `while`. Lua only has 21, meaning it has less stuff to 
go through when you're just booting up. This makes Lua a very good first-timer language.

## However!

### "Types" are loosely defined

Object oriented programming, kinda sucks in Lua if I'm being honest. Lua lacks the notion of a custom type, or a class. Everything in Lua is a loose
Python-dictionary-like object. In these terms, Lua is the anti-typescript. If you're meaning to define a reusable type, well good luck. Check out how to create
such a type in Lua, and witness some madness.

```
Account = { balance=0,
            withdraw = function (self, v)
                         self.balance = self.balance - v
                       end
          }

function Account:deposit (v)
  self.balance = self.balance + v
end

Account.deposit(Account, 200.00)
Account:withdraw(100.00)
```

![Witness my Act and Deed, (FrankPaton, 1882)](https://www.meisterdrucke.at/kunstwerke/1000px/Frank%20Paton%20-%20Witness%20my%20Act%20and%20Deed%20(1882)%20%20-%20(MeisterDrucke-293913).jpg)
<small>Witness my Act and Deed, (Frank Paton, 1882)</small>


### It is a bit ugly, honestly

If you're an old programmer, thats great. You might really be enjoying your "end" keywords, personally, I hate them. Typing those three letters 
every time I want to close a scope is living hell for me. And if my IDE is not handling these automatically, then I might just as well be writing jinja loops.

```
-- find a value in a list
local found = nil
for i=1,a.n do
  if a[i] == value then
    found = i      -- save value of `i'
    break
  end
end
print(found)
```
<small>"--" is for comments.</small>

There are also no update assingments (`+=`). I'm all for conciseness if the functionality is obvious. If anything I think we should have more. 

### Credit where credit is due

Lua is a an early-comer in the scriptable language business. It is 31 years old as I am writing this post (considerably older than myself). It is still
very versatile, easy to onboard with, has good principles, is stable. Compared to its contemporaries I think its a goldmine. And as programming languages 
go, its a respectable one. If Lua had seen the attention it deserved, python would never have made it if it weren't for the crazy simple syntax. 
Not mentioning the likes of R (what the hell even is that?).

We only talked about object oriented programming, but Lua is so much more than that. It is very powerful as a functional language, and quite a good descriptive language
and it incorporates some procedural concepts too. In their own words;

> This paper describes Lua, an extensible procedural language with powerful data description facilities, designed to be used as a general purpose extension language.
> Lua arose as the fusion of two descriptive languages, designed for the configuration of two specific applications: one for scientific data entry [6], the other
> for visualizing lithology profiles obtained from geological probes. When users began to demand increasingly more power in these languages, it became clear that
> real programming facilities were needed. Instead of upgrading and maintaining two different languages in parallel, **the solution adopted was to design a single
> language that could be used not only for these two applications, but for any other application. Therefore, Lua incorporates facilities common to most
> procedural programming languages - control structures (whiles, ifs, etc.), assignments, subroutines, and infix operators - but abstracts out facilities specific
> to any particular domain. In this way, Lua can be used not only as a complete language but also as a language framework**.
>  —— https://www.lua.org/spe.html

## Enter moonscript












