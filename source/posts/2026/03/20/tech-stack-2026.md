---
date: 2026-03-20
title: My personal tech stack in 2026 (now with IDE & AI)
emoji: 🛠️
description: Providers, platforms and software I use, want to use and tried before. Email, drive, search, blogging. IDE, ai agent etc.
---

# My personal tech stack in 2026

[I previously did a post like this in the beginning of 2025](/posts/2024/12/31/tech-stack). This is updated version for 2026.

[TOC]

<img width="1800" height="945" alt="image" src="https://github.com/user-attachments/assets/339eb416-5af1-4f85-8862-3fc91c374460" />


### Email
- **Current:** Gmail, (+)Posteo
- **Desired:** ?  
- **Others Tried:** Yahoo, Mail.com, Outlook

2026 update: I wanted to try posteo in 2025. I now have both posteo and gmail, and I still have gmail as my daily driver. 
This boils down to personal preference. I really like what posteo offers, but I don't like standalone email apps.
And posteo's web ui is just repulsive for me. Also I seem to have an irrational fear of tediously migrating all my apps' emails.
I'm wary about being stuck in an inbetween state, not able to ditch neither, and have to use both indefinitely.

### Drive
- **Current:** Google Drive  
- **Desired:** ?  

### Search
- **Current:** Google  
- **Desired:** Kagi  
- **Others Tried:** DuckDuckGo, Yandex, Kagi

2026 update: I tried Kagi. Its nice, I really like it. It feels like the first ever usable google alternative. But the price tag is simply not for me.

### Blogging
- **Current:** SimplyMarkdown  
- **Desired:** -  
- **Others Tried:** Tumblr, Blogger, Blogcu, Substack, Bearblog

### Microblogging
- **Current:** Twitter, Mastodon  
- **Desired:** (+)Mastodon with twitter bridge / a social media aggregator  
- **Others Tried:** Threads, Bluesky

See my post [Why I left Twitter & why I chose Mastodon over Bluesky](/posts/2025/01/17/leaving-twitter-for-mastodon). 
I was in fact not able to leave twitter completely, simply because a lot of creators whom I care about. To remove myself from the
hold of the twitter algorithm, I need a social media aggregator of sorts. Have to think about this a bit more.

### Picture Sharing
- **Current:** My personal blog?
- **Desired:** ?  
- **Others Tried:** Instagram, Flickr. Pixelfed

Left pixelfed because the project owner turned out to have questionnable ethics.

### Operating Systems
- **Personal OS:**  
  - **Current:** ~~Linux~~, (+)MacOS (_I bought a mac mini for personal use._)
  - **Desired:** MacOS  
- **Work OS:**  
  - **Current:** MacOS  
  - **Desired:** MacOS  

### Browser
- **Current:** ~~Chrome~~, (+)Helium
- **Desired:** -
- **Others Tried:** Chromium, Vivaldi, Firefox, Brave

Helium is just what i was looking for. A lightweight chromium browser without the bloatware. Happy with it so far.

### (New Section‼️) IDE
- **Current:** ~~VSCode~~, (+)Zed
- **Desired:** -
- **Others Tried:** PyCharm, VSCode, XCode

Zed is lightweight, gets the job done. Easy on the RAM (ram freezing is a real problem I'm having with multiple Claude code instances scrabbling to get my work done)

### (New Section‼️) AI Agent
- **Current:** Claude Code
- **Desired:** -
- **Others Tried:** Cursor

I like Cursor. I used it with Claude Opus 4.6, but my company simply offers better rates with the Claude code product. So I switched to that. I'm still using my Cursor budget,
But to run automations for our sentries /production errors.

### Note Taking
- **Current:** Pen & Paper, Notion  
- **Desired:** Pen & Paper > Journal Callback (project in progress)  

! include socials
! include other-articles

<style>
  /* Styling for strikethrough text */
  del, s, strike {
    color: darkred;
    text-decoration-color: darkred;
  }
  /* Class for the (+) words */
  .added-word {
    color: darkgreen;
    font-weight: bold; /* Optional: makes it pop more */
  }
</style>
<script>
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Select all elements that might contain text (excluding scripts/styles)
    const elements = document.querySelectorAll('p, li, span, h1, h2, h3, div');
    elements.forEach(el => {
      // Only process elements that have direct text and no complex children 
      // to avoid breaking existing HTML structures.
      if (el.children.length === 0 && el.innerText.includes('(+)')) {
        el.innerHTML = el.innerHTML.replace(/(\(\+\)\w+)/g, '<span class="added-word">$1</span>');
      }
    });
  });
</script>
