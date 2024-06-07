---
emoji:  🌳
tags:   software
        llm
        concept
date:   2024-06-06
title:  Graph managed LLM conversations - concept
image:  cherry-blossoms-in-blue.png
---

# Managing LLM Conversations Using a Graph Structure

![Cherry blossoms in blue by Van Gogh, depicting a cherry blossom branch with its many branchettes.](./cherry-blossoms-in-blue.png)

## Introduction

Ever felt frustrated when a chatbot loses context after you explore a side topic? Current LLM (Large Language Model) conversation models are limited by their linear structure, which hinders context preservation and flexibility in branching and merging conversations. To overcome this, I propose a graph-managed LLM conversation approach, allowing for broader discussions with specific side topics while maintaining the full context.

## Setting the Glossary

### The Conversation Node

In human-LLM conversations, the basic building block is a **question-answer (or input-output) pair**. We’ll refer to this as a conversation node.

![A conversation node, input and output pair](./1-conversation-node.png)

### Conversation History

A **sequence of conversation nodes** forms a conversation history. This history can be authentic (real input-output pairs) or fabricated (synthetic data).

![A sequence of conversation nodes](./2-conversation-history.png)

### Transforming Conversation History into API Input

The sequence of conversation nodes is typically converted into a JSON format to be used as input for an LLM API. This process is open to manipulation.

![Conversion of conversation history to llm input, a sequence of nodes and the corresponding json structure (pseudocode)](./3-llm-input.png)

### Branching Conversations

When branching off from an earlier node, the context from the existing branch is often lost, which is expected. However, exploring new concepts in a new branch can be useful. Eventually, you might want to return to the main conversation, but its context remains isolated from the current branch.

![Branching off and losing context](./4-branching-off.png)

![Conversation ongoing in two branches](./5-two-branches-contd.png)

## Proposal

### Merging Priorities

To merge two or more branches back into a single conversation, the order of merging is crucial as it affects the LLM’s context. Users should have the ability to specify the order of merging, effectively setting the priority of each branch.

![Merging branches with priorities](./6-merging-priorities.png)

### Background Summarization and Prompt Compression

During the merging of branches, the LLM may have too much context to consider. To manage this, techniques such as background summarization can rebase the deprioritized branch closer to the prioritized one. Prompt compression, like the LLMLingua method, can also help manage the context effectively.

![Background summarization and prompt compression](./7-background-summarization.png)

## Conclusion

Graph-managed LLM conversations enable broader discussions with specific side topics while maintaining full context, much like human-to-human conversations. This approach improves the context-awareness of LLM agents, allowing for more precise and in-depth discussions.

By adopting graph-managed conversations, you can explore various topics in depth without losing context, ultimately enhancing your interaction with LLMs. I am yet implement this as an MVP but feel free to experiment with this approach and share your experiences! 

! include socials

! include other-articles
