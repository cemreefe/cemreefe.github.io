---
date: 2025-01-27
title: Community-based peer-reviewed education concept
emoji: 🎓
tags: software
---

# Community-based peer-reviewed education concept

When I moved to the UK, the cost of university here made me think harder about what a degree actually provides. I started trying to separate the credential from the education, and the more I thought about it, the more they seemed like two different things that just happen to be bundled together.

The lectures are online. The textbooks are online. The research papers are online. A lot of the best educational content out there exists precisely because universities produced the people who made it. The institution enabled the expertise, but the expertise doesn't have to stay locked inside the institution. If you can find the motivation (which is hard!), a physical classroom is no longer required. It's just a respected institution that supplies a path to the credentials.

That led me to this idea: what if getting a degree meant producing real work, having it reviewed by a community of people who know the subject, and accumulating enough approvals to be recognized as competent? No exams, no tuition, no gatekeeping by geography or income. Just you, the material, a set of deliverables, and a community willing to evaluate them honestly.

Here's how it could work, sketched out as a GitHub organization.

## The organization

Everything lives inside a GitHub organization. The organization is the university. It has no president, no registrar, no administration (okay maybe a little). It has repositories, maintainers, and contributors.

Anyone can join. Anyone can contribute. The community governs itself through the same mechanisms that open source software uses, because those mechanisms have proven they work at scale, across time zones and cultures, without central authority.

## Degrees

A degree is a repository. It contains a curriculum: a list of required and optional courses, and a clear description of what completing them means. Maintainers are community members who have themselves completed the degree, or who have demonstrated deep familiarity with the subject matter.

The curriculum can evolve over time through pull requests, just like any other open source project.

## Courses

Each course lives in its own repository, containing the course material: reading lists, problem sets, project prompts, reference implementations. The material is assembled and maintained by the community, improved over time, forked when people disagree on direction. There is no professor and no schedule. You study at your own pace.

## Deliverables

Finishing a course means producing something concrete. A project, a writeup, a working implementation. Something that demonstrates you engaged with the material and came out with real understanding.

You submit your deliverable as a pull request against the course's deliverables directory. The community reviews it, leaves comments, asks questions, pushes back where things aren't right. When enough reviewers approve, the PR gets merged. That's your credit.

The obvious objection here is that no one would volunteer their time for this. That might be true. But it's true of a lot of open source projects too, and many of them found communities anyway, often because the work itself attracted people who cared about it. The threshold for "enough approvals" is defined per course and enforced automatically. What counts as rigorous is up to the community.

## Completion and recognition

A GitHub Actions workflow watches your deliverables. When you've completed all the required ones for a given degree, the workflow opens a PR against the degree repository that adds your name to the list of graduates. That PR gets reviewed and merged by the degree maintainers. Your degree is a commit in a public repository, timestamped and attributable.

Is it accredited? No. Does it carry the same weight as a degree from an established institution? Probably not, at least not yet. But it is verifiable, it is public, and it represents real work that real people reviewed. For a lot of technical roles, that's not nothing.

The goal isn't to replace universities. It's to make serious, community-validated education available to anyone with internet access and the motivation to use it, regardless of where they live or what they can afford.

! include socials
! include other-articles
