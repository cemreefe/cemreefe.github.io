---
date: 2025-01-27
title: Community-based peer-reviewed education concept
---

# Community-based peer-reviewed education concept 

This blog post proposes a new framework to approach university-level education
based on community-reviewed deliverables.

All of this will be conceptualized as a github organization. Implementation details and
specifics are left to the discretion of community builders.

## The _University_

The university is a self-managing github organization.

## Degrees

There can be multiple degrees offered by the university. A degree is a collection of courses
(curriculum) with required & optional courses. All degrees live on their own repository, with
their一

## Curricula

Every degree will have a curricula, that lives on the degree's repository. The curricula will list
required and optional courses, and provide a clear determinator for the course sets, the completion
of which, entitles the completor to the associated degree.

The degree & curricula repositories are managed by community members associated with said degree.
Only these members can approve pull requests for the degree repositories.

## Courses

Courses live on their own repositories. They are managed by community members associated with the course
or, in the case of lack thereof, with the members associated degree. All course repositories will have their own
deliverables directory, or, a separate repository for their deliverables to be committed to.

## Deliverables

Completion of every course is dependent on a set of deliverables being, well, delivered. Every course is
studied as self-study, and the students are to produce the deliverables required for the course. The deliverables
are opened as pull-requests against the course's deliverables directory. The deliverable PRs are reviewed by the
community, and, they are merged with _enough_ approvals.

## Completion

A github actions cronjob checks deliverables against courses' required deliverables, when all deliverables are
committed to the repository, the cronjob adds the user to the list of completors that live on the course
repository.

When all courses are completed, a degree for the user is committed to the degrees repository. And the user
will have access to their completely uncredited degree from the Peer Review University.

! include socials
! include other-articles
