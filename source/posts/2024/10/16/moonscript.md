---
emoji:  🌙
tags:   coding
date:   2024-10-16
image:  https://github.com/user-attachments/assets/bac1a8f8-2fb3-4f70-9331-d1d7d62ce398
---

# Moonscript: why it could be the Python killer (and why not)

![Image depicting a snake in bits and pieces, early United States progaganda poster "Unite or die", highlighting disunity etween the colonies
](https://github.com/user-attachments/assets/bac1a8f8-2fb3-4f70-9331-d1d7d62ce398)



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

On the other hand Lua _kinda compiles_ into C *. Which is lightning fast. In fact, as a scripting language thats
easy to onboard, Lua has integration layers with a lot of programming languages, making it easy to embed into other applications. Lua is best known for 
its usage in Roblox, where little kids create all sorts of horrors beyond your imagination. 
See [Creating a Script](https://create.roblox.com/docs/tutorials/fundamentals/coding-1/creating-a-script) guide on the roblox website.

\* LuaJIT (just-in-time compiler) converts Lua expressions to C and executes in real time. So it does not really compile into a `.c` program.
Lua is written in C, and you can integrate Lua with C programs easily (bidirectionally), but this isn't the same as Moonscript directly compiling down to C. 

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
> 
>  —— https://www.lua.org/spe.html

## Enter Moonscript

Moonscript has been around for a good number of years (See this reddit post from 13 yrs ago where people discuss if a translation layer above Lua is a good idea, 
thats a good discussion to have). But its a fairly young language still. As Lua compiles to C, Moonscript compiles to Lua, and then to C.

This means that the translation layer aside, Moonscript carries all the same benefits that Lua has. It is a lightning-fast scripting language, that can compile to C.

Moonscript has, in my personal opinion, cleared up much of the boilerplate clutter in Lua. And has added some nice abstraction layers to make it suitable to everyday-writing
OOP. It also brings in many syntax properties that I love in Python, and also builds on top of them. Stuff like update assignments, default arguments, and no "end" keyword :).

Check out some code comparisons between the two:

**Default arguments**

<table cellpadding="0" cellspacing="0" class="code-split" width="100%">
            <thead><tr><th>MoonScript</th><th>Lua</th></tr></thead>
            <tbody><tr><td class="code-split-left">
<pre><code class="moon-code"><span class="n">func</span> <span class="o">=</span> <span class="kt">(</span><span class="n">name</span><span class="o">=</span><span class="s2">"</span><span class="s">boo</span><span class="s2">"</span><span class="p">,</span> <span class="n">height</span><span class="o">=</span><span class="mi">100</span><span class="kt">)</span> <span class="nf">-&gt;</span>
  <span class="nb">print</span> <span class="s2">"</span><span class="s">Hello I am</span><span class="s2">"</span><span class="p">,</span> <span class="n">name</span>
  <span class="nb">print</span> <span class="s2">"</span><span class="s">My height is</span><span class="s2">"</span><span class="p">,</span> <span class="n">height</span></code></pre></td>
<td class="code-split-right">
<pre><code class="lua-code"><span class="kd">local</span> <span class="n">func</span>
<span class="n">func</span> <span class="o">=</span> <span class="k">function</span><span class="p">(</span><span class="n">name</span><span class="p">,</span> <span class="n">height</span><span class="p">)</span>
  <span class="k">if</span> <span class="n">name</span> <span class="o">==</span> <span class="kc">nil</span> <span class="k">then</span>
    <span class="n">name</span> <span class="o">=</span> <span class="s2">"</span><span class="s">boo"</span>
  <span class="k">end</span>
  <span class="k">if</span> <span class="n">height</span> <span class="o">==</span> <span class="kc">nil</span> <span class="k">then</span>
    <span class="n">height</span> <span class="o">=</span> <span class="mi">100</span>
  <span class="k">end</span>
  <span class="nb">print</span><span class="p">(</span><span class="s2">"</span><span class="s">Hello I am"</span><span class="p">,</span> <span class="n">name</span><span class="p">)</span>
  <span class="k">return</span> <span class="nb">print</span><span class="p">(</span><span class="s2">"</span><span class="s">My height is"</span><span class="p">,</span> <span class="n">height</span><span class="p">)</span>
<span class="k">end</span></code></pre></td></tr>
</tbody></table>

**Simple function definition**

<table cellpadding="0" cellspacing="0" class="code-split" width="100%">
            <thead><tr><th>MoonScript</th><th>Lua</th></tr></thead>
            <tbody><tr><td>
<pre><code class="moon-code"><span class="n">func_a</span> <span class="o">=</span> <span class="nf">-&gt;</span> <span class="nb">print</span> <span class="s2">"</span><span class="s">hello world</span><span class="s2">"</span>

<span class="n">func_b</span> <span class="o">=</span> <span class="nf">-&gt;</span>
  <span class="n">value</span> <span class="o">=</span> <span class="mi">100</span>
  <span class="nb">print</span> <span class="s2">"</span><span class="s">The value:</span><span class="s2">"</span><span class="p">,</span> <span class="n">value</span></code></pre></td>
<td class="code-split-right">
<pre><code class="lua-code"><span class="kd">local</span> <span class="n">func_a</span>
<span class="n">func_a</span> <span class="o">=</span> <span class="k">function</span><span class="p">()</span>
  <span class="k">return</span> <span class="nb">print</span><span class="p">(</span><span class="s2">"</span><span class="s">hello world"</span><span class="p">)</span>
<span class="k">end</span>
<span class="kd">local</span> <span class="n">func_b</span>
<span class="n">func_b</span> <span class="o">=</span> <span class="k">function</span><span class="p">()</span>
  <span class="kd">local</span> <span class="n">value</span> <span class="o">=</span> <span class="mi">100</span>
  <span class="k">return</span> <span class="nb">print</span><span class="p">(</span><span class="s2">"</span><span class="s">The value:"</span><span class="p">,</span> <span class="n">value</span><span class="p">)</span>
<span class="k">end</span></code></pre></td></tr>
</tbody></table>

**Update assignments**

Moonscript takes update assignments to the level I always wish Python had. The `+=`-like syntax can be used for any operator in Moonscript.

<table cellpadding="0" cellspacing="0" class="code-split" width="100%">
            <thead><tr><th>MoonScript</th><th>Lua</th></tr></thead>
            <tbody><tr><td class="code-split-left">
<pre><code class="moon-code"><span class="n">x</span> <span class="o">=</span> <span class="mi">0</span>
<span class="n">x</span> <span class="o">+=</span> <span class="mi">10</span>

<span class="n">s</span> <span class="o">=</span> <span class="s2">"</span><span class="s">hello </span><span class="s2">"</span>
<span class="n">s</span> <span class="o">..=</span> <span class="s2">"</span><span class="s">world</span><span class="s2">"</span>

<span class="n">b</span> <span class="o">=</span> <span class="kc">false</span>
<span class="n">b</span> <span class="k">and</span><span class="o">=</span> <span class="kc">true</span> <span class="k">or</span> <span class="kc">false</span></code></pre></td>
<td class="code-split-right">
<pre><code class="lua-code"><span class="kd">local</span> <span class="n">x</span> <span class="o">=</span> <span class="mi">0</span>
<span class="n">x</span> <span class="o">=</span> <span class="n">x</span> <span class="o">+</span> <span class="mi">10</span>
<span class="kd">local</span> <span class="n">s</span> <span class="o">=</span> <span class="s2">"</span><span class="s">hello "</span>
<span class="n">s</span> <span class="o">=</span> <span class="n">s</span> <span class="o">..</span> <span class="s2">"</span><span class="s">world"</span>
<span class="kd">local</span> <span class="n">b</span> <span class="o">=</span> <span class="kc">false</span>
<span class="n">b</span> <span class="o">=</span> <span class="n">b</span> <span class="ow">and</span> <span class="p">(</span><span class="kc">true</span> <span class="ow">or</span> <span class="kc">false</span><span class="p">)</span></code></pre></td></tr>
</tbody></table>

**Object-oriented-programming abstraction layer**

This is one of the examples they have on the landing page of the moonscript website, but I do believe it sells it quite well.

<details>

<summary>

Click to here to see the compiled Lua code.
            
```
class Thing
  name: "unknown"

class Person extends Thing
  say_name: => print "Hello, I am #{@name}!"

with Person!
  .name = "MoonScript"
  \say_name!
```

</summary>

```
local Thing
do
  local _class_0
  local _base_0 = {
    name = "unknown"
  }
  _base_0.__index = _base_0
  _class_0 = setmetatable({
    __init = function() end,
    __base = _base_0,
    __name = "Thing"
  }, {
    __index = _base_0,
    __call = function(cls, ...)
      local _self_0 = setmetatable({}, _base_0)
      cls.__init(_self_0, ...)
      return _self_0
    end
  })
  _base_0.__class = _class_0
  Thing = _class_0
end
local Person
do
  local _class_0
  local _parent_0 = Thing
  local _base_0 = {
    say_name = function(self)
      return print("Hello, I am " .. tostring(self.name) .. "!")
    end
  }
  _base_0.__index = _base_0
  setmetatable(_base_0, _parent_0.__base)
  _class_0 = setmetatable({
    __init = function(self, ...)
      return _class_0.__parent.__init(self, ...)
    end,
    __base = _base_0,
    __name = "Person",
    __parent = _parent_0
  }, {
    __index = function(cls, name)
      local val = rawget(_base_0, name)
      if val == nil then
        local parent = rawget(cls, "__parent")
        if parent then
          return parent[name]
        end
      else
        return val
      end
    end,
    __call = function(cls, ...)
      local _self_0 = setmetatable({}, _base_0)
      cls.__init(_self_0, ...)
      return _self_0
    end
  })
  _base_0.__class = _class_0
  if _parent_0.__inherited then
    _parent_0.__inherited(_parent_0, _class_0)
  end
  Person = _class_0
end
do
  local _with_0 = Person()
  _with_0.name = "MoonScript"
  _with_0:say_name()
end
```

</details>

## Moonscript on production

According to [@leafo](https://leafo.net), they are using moonscript in their company, everything in production. I'm guessing the CI/CD process
would not have had as much love as something like Python did. But there is great promise.

A quick [github search](https://github.com/search?q=language%3AMoonScript&type=repositories) returns exactly 669 projects online that use
Moonscript (as of me writing this post). So employing Moonscript you could _still_ be one of the earlycomers. 

## Honorary mention

Moonscript files have a `.moon` extension. How cool is that?

## The caveat TM

Although it looks like a match made in heaven, there is one problem with moonscript. Its speed gains are unfortunately only there when it is compiled to Lua.
So you moonscript-scripts, running on the moon interpreter will be, in reality slower than even notorious Python. However, if your code ever needs to make it
to production, or if your code will be reused and is not a single-use dumpscript, then its compilation to Lua gives it an amazing edge over Python.

### Some time-performance analysis

I have run some tests to see how our trio (Python, Lua, MoonScript) compare to each other in terms of speed.

P.S.: The `.lua` files are all generated by the moonscript compiler `moonc`, so they are indicative of compiled moonscript performance.

**Execution Times (in seconds)**:

| Task                             | Python   | MoonScript | Lua      |
|----------------------------------|----------|------------|----------|
| **Task 1: Print string**         | 0.011557 | 0.014555   | 0.001001 |
| **Task 2: Fibonacci**            | 0.019740 | 0.021610   | 0.007640 |
| **Task 3: String concatenation** | 0.025190 | 0.060460   | 0.026840 |

Side note: Lua is actually known for being able to handle giant string manipulation tasks so I'm not sure what's really happenning here.

Lua consistently outperforms the two in terms of speed, particularly for simple tasks like printing a string.
MoonScript is noticeably slow when executed with the moon interpreter.


<details>
            <summary>
            <b>Code for print string task</b>            
            </summary>
            
```
# python
print("Hello mom!")
```

```
-- moonscript
print "Hello mom!"
```

```
-- lua
return print("Hello mom!")
```

</details>

<details>
            <summary>
            <b>Code for fibonacci task</b>            
            </summary>
            
```
# python
def fibonacci(n):
    if n == 0:
        return 0
    if n == 1 or n == 2:
        return 1
    return fibonacci(n-1) + fibonacci(n-2)
fibonacci(25)
```

```
-- moonscript
fibonacci = (n) ->
    if n == 0
        return 0
    if n == 1 or n == 2
        return 1
    return fibonacci(n-1) + fibonacci(n-2)
fibonacci(25)
```

```
-- lua
local fibonacci
fibonacci = function(n)
  if n == 0 then
    return 0
  end
  if n == 1 or n == 2 then
    return 1
  end
  return fibonacci(n - 1) + fibonacci(n - 2)
end
return fibonacci(25)
```

</details>

<details>
            <summary>
            <b>Code for string concatenation task</b>            
            </summary>
            
```
# python
s = ""
for i in range(1, 10000):
    s += f"{i * i}"
```

```
-- moonscript
s = ""
for i = 1, 10000
    -- defaults to expr if invalid expr?
    s ..= "#{i*i}"
```

```
-- lua
local s = ""
for i = 1, 10000 do
  s = s .. tostring(i * i)
end
```

</details>

Here are the results plotted out for better comparison;

![Performance test results plotted](https://github.com/user-attachments/assets/a61fb737-a84f-40d1-9290-d631ebdbecd4){style="max-width: 500px"}

## Getting started

If you looked at that above graph and said;

_Welp! thats fair enough. I only need an **okay** speed when developing my programs. And I love that they'd be lightning-fast when compiled and receiving user traffic!_

My best advice is to follow @leafo's own getting started guide [here](https://leafo.net/posts/getting_started_with_moonscript.html#linux). I found it best in terms of pace and thoroughness.

## Personal goals

Personally, I'm tasking myself with playing around with Moonscript, and possibly using it in stead of Python for any fun project where it
can handle a well-suited task.

Lua is also pretty cool in the way it can be embedded within other languages. See [Lupa](https://pypi.org/project/lupa/0.9/) and 
[LunaticPython](https://labix.org/lunatic-python). So I might consider using this to run chunks of logic where computational efficiency
is of concern inside my Python programs.

I would also urge you to take a look, try it out, see how it feels. Feel free to send me an email about how you found it, or drop a comment.

! include socials

! include other-articles





