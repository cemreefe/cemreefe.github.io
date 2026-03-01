---
title: How I manage my passwords
emoji:  🔐
tags:   computers
        security
        privacy
date:   2025-01-02
image:  /static/img/blog/password-manager.png
description: I hate password managers, and you should too. Let's avoid using them and still not forget our passwords with password functions.
---

# How I manage my passwords

**I. hate. password. managers.** And you should too. Please allow me to teach you to never need them again, not before a quick rant.

## Pwned!

Why would I entrust all my passwords to a single service that is continuously proved to be penetrable [[1]](https://support.lastpass.com/s/document-item?language=en_US&bundleId=lastpass&topicId=LastPass%2Fincident-data.html&_LANG=enus) [[2]](https://blog.1password.com/files/okta-incident/okta-incident-report.pdf) [[3]](https://www.verdict.co.uk/unsecured-databases-nordpass/) ?

Why would I risk getting pwned in all of my accounts everywhere when I can just keep them in my brain where they can't be hacked? Am I just _so_ incapable of coming up with good passwords myself?

## Portability

If I am left without my laptop or my personal mobile device, am I to be locked out of everything I ever signed up to? What if I'm on a friend's phone, somewhere else, on a foreign machine? Do I _need_ to log into 1password to reveal all of my passwords? Do I need to reveal my untypeable password from a mobile app and tediously type it in?

## Single point of failure

![image](https://github.com/user-attachments/assets/d0cc9b55-a485-4dee-9d14-944555fe1802)

There is something we call a "single point of failure" in engineering lingo. And a password manager is simply that. Using a password manager introduces a single point of failure into your online life. Where your logging into any other application is dependent on a shabby corporate tool.

![image](https://github.com/user-attachments/assets/bbbeab43-4078-41e3-b235-aed9b737557c)

Why would you do this to yourself?

## You only need a function

You don't need to use the same password everywhere, nor you need to memorize a new password for everything you sign up to. There is a much better way to go about this. and it is called a function.

![image](https://github.com/user-attachments/assets/8665eeec-bb41-468b-b4ed-1fd432426db2)

You will only need to memorize a single function and what the context is, and that function is going to make all of your passwords (quite possibly) unique across every service you use.

This way, when you are logging into a website, you won't need to know your password. I never do! I only know my password function, and the context (about the service I'm logging into).

## What?

Okay, its actually quite simple. Let me go over it with a simple example.

Here's an example "password function". My context is only the url of the website.


1. `<number of letters in the website name + 5>`
2. `.`
3. `<last 3 letters of the website, reversed>`
4. `<last letter of the website's TLD>`
5. `<! if it ends with a vowel, ? otherwise>`
6. `<number of consonants in the website's name>`


Imagine I'm signing up to `facebook.com`. I'll then have a quick think, and I'll go through these:

| Step                                         | Result  |
|----------------------------------------------|---------|
| Number of letters in the website name + 5    | `13`    |
| `.`                                          | `.`     |
| Last 3 letters of the website name, reversed | `koo`   |
| Last letter of the website's TLD             | `m`     |
| `!` if it ends with a vowel, `?` otherwise.  | `?`     |
| Number of consonants in the website name.    | `4`     |
| **Generated Password**                       | **`13.koom?4`** |

And voila, an example password; `13.koom?4`

As a second example let's say I'm logging into `amnesty.org`.

| Step                                       | Result  |
|--------------------------------------------|---------|
| Number of letters in the website name + 5  | `12`    |
| `.`                                        | `.`     |
| Last 3 letters of the website name, reversed | `yts` |
| Last letter of the website's TLD           | `g`     |
| `!` if it ends with a vowel, `?` otherwise | `!`     |
| Number of consonants in the website name   | `4`     |
| **Generated Password**                     | **`12.ytsg!4`** |

And voila, an example password; `12.ytsg!5`

Of course this is a simple function, there's no limit to how complex you can go. There are a lot of small building blocks you can use to create your passwords. I'll try to provide a tool to create your own combination if I have the time.

It might feel counter-intuitive at first, but I've been using this for a long time and have gotten quite used to executing the funciton without thinking about it. Often I don't know what my passwords are for anything. I only know what my function is.

## Wouldn't people be able to infer all your passwords from a single password?

![image](https://github.com/user-attachments/assets/2c64d3bd-afa8-4ccf-913d-6b3411c99af6)
<small>People can see patterns where they are not, and may not see them where they are.</small>

No, genius. They would not. First of all hacking doesn't really work like that anymore, we're not in 2005. Nobody "hacks your password". They get you to change it by pretending they are police officers who think you're a terrorist. But even if someone were to get a hold of your password for facebook, `12.koom?4`, do you think they would go "hold on a second!!!! 12 is exactly 5 more than the number of letters in facebook! If this has a `!` in it, surely a website with a vowel at the end of their name would have a `?`"? No.

! include socials
! include other-articles

