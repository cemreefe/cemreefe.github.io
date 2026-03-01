---
title: Link seals - self-testing links proof of concept
date:  2025-01-14
emoji: ⛓️‍💥
tags:  coding
       security
       automation
description: Link seals provide a quick soft-check utility for link health on your web spaces.
---

# Link seals - self-testing links proof of concept

[TOC]

What if we could construct our outgoing hrefs with testability from T0?

I was reading [How bad is link rot on my blog?](https://shkspr.mobi/blog/2024/12/how-bad-is-link-rot-on-my-blog/){linksealkey='Terence Eden'}
on Terence Eden's blog. It’s an article where he shares his experience tending to outgoing links in his blog. He shares
some [interesting data](https://shkspr.mobi/blog/link-rot/) on it as well. I encourage you to have a read.

This is an interesting topic. Let me quote some relevant bits for me to set the scene if you're not bothering to read his full post.  

> Why don't I just cURL the URL and see if it responds with a 2xx HTTP code?  
>  
> I used to use an automated checker to test my links. But spam sites lie. Lots of the dead sites have been taken over by scammers, spammers, and AI grifters. They return an HTTP OK and then serve up advertising. Yeuch! So now I spend each morning Tending To My Digital Garden and manually checking the links.  

So I'm sat here thinking, what if... the scammers could not lie? Or rather, what if you could detect it when they did? Enter⸺  

## What is a link seal

### Premise  

My proposal is simple; hyperlinks on a webpage could carry information that's going to make it possible to verify if the
source linked contains the expected content. The web page that has the link should define a **link seal check** function, which can be used
to programmatically run through the content on the target page to verify if its content has changed drastically.  

### Example  

Let’s assume our target page is the following simple hello world page, and it lives on <https://my.site/>{linksealkey='Hello World'}

```html
<html>  
  <head>  
    <title>Hello world</title>  
  </head>  
  <body>  
      <p>Hello world!</p>  
      <p>I'm a website.</p>  
  </body>  
</html>  
```  

Take the following key function.  

```javascript
function linkSealCheck(href, key) {  
  return fetch(href)
    .then(response => response.text())
    .then(content => content.includes(key))
    .catch(() => false); // Return false if the fetch fails
}
```  

The link on our webpage would look like:  

```html
<a href='https://my.site/' linksealkey='Hello world'>My awesome site</a>  
```  

When we want to verify the links on our blog, we can go through all `<a>` tags and call the **linkSealCheck** function for each one:  

```javascript
function keySealVerifier() {
  const links = document.querySelectorAll('a[linksealkey]');
  links.forEach(link => {
    const href = link.href;
    const key = link.getAttribute('linksealkey');
    linkSealCheck(href, key).then(isValid => {
      if (!isValid) {
        console.warn(`Link ${href} failed the LinkSeal check!`);
      } else {
        console.log(`Link ${href} passed the LinkSeal check.`);
      }
    });
  });
}
```

P.S.: This is a very simple implementation of a seal-key pair and a verifier function and it is for illustrative purposes.
Don't come into my inbox saying muh security. I'm talking about you, @infosec.exchange.

## Public or Private Seal Check Functions  

One (semi) important consideration is whether your **link seal** check function should be public or private.  

### Public  
A public **link seal** function allows anyone to verify the content of your links. This improves transparency and helps others keep integrity checks
on your website indefinitely. However, it also opens the possibility for abuse, as malicious actors could use the function to scrape information or
exploit your verification mechanism. However, this is highly unlikely except for very specific cases. This is in no way a completely trustable verification
method, but it should do the trick most of the time.

### Private  
A private **link seal** function is less exposed and can help protect your implementation from misuse. However, this approach limits the ability of third 
parties (e.g., search engines or link-checking tools) to independently verify your links, potentially reducing the reach of your verification mechanism.
However, this is rarely a case for concern, as you'll be doing the gardening for the foreseeable future.

## Applications  

- **Gardening**: Reduce link rot and ensure outgoing links still point to accurate, relevant information.
- **Web Archives**: Cross-check preserved versions of websites against original content snapshots. In theory, you could programmatically go back in time
  on the internet archive until you find a version that satisfies your link seal key.
  Inspired by, again;
  > (...)
  > 2. If the site is dead, or the content isn't there, I stick the URl into the WayBack Machine and pick the archive closest to the publication date.
  > (...)
  > 一 Terrence Eden, 'How bad is link rot on my blog?'

## Challenges  

- **Dynamic Content**: Some sites have rapidly changing content or content that they load with javascript.
- **Tampering**: A malicious actor could attempt to mimic the expected content to pass checks. 

With these challenges in mind |I think **link seal** could serve as a simple, programmatic way to provide an extra layer of trust for hyperlinks.
I'm sure we'd be able to find anchor terms in dynamically loaded websites. The worst case for a false negative is someone clicking on an ad, and the
worst case for a false positive is you having to update your **link seal** key.

What do you think? Any ideas? Concerns? Do you think this is a big pile of bull? Reach out to tell me and let's discuss. Find me on [mastodon](https://mastodon.social/@cemre){linksealkey='some nonsense i would not say'}.

## Live Demo 🚨

Here's an MVP implementation of linkseal running on your browser! (I hope this is working because it would be so embarassing if not)

## For Posteriority

I've since found <https://unrot.link/> which seems to automate the archive check process, but not against checkable logic to determine plausible temporality of the content to get from the archive.

! include linkseal_checker

! include socials
! include other-articles
