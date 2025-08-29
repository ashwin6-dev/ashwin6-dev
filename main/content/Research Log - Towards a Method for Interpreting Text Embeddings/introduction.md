---
title: "Introduction"
description: "The idea we are working towards."
---

During my summer internship, I conducted research on AI maintainability and had the opportunity to author my first two research papers. Much of my work focused on analyzing vectors in latent spaces and exploring how to interpret their meaning. Given the limited time frame of the internship, I implemented all experiments using simple image data, where latent spaces are more intuitive to interpret thanks to their inherently visual nature.

However, as my internship came to an end, I was thinking about how much more impactful it would've been to test my research on text embeddings given the prominence of LLMs today. Since text embeddings aren't as straightforward to interpret, I wanted to figure out a method to reveal what a given embedding semantically means in a user-given context. And, hopefully, I'd build a tool that'll enable people to interpret text embeddings using this method.

That brings me to the purpose of this series: a **research log**. As I learn and work towards this idea, I want to document the journey. My hope is that it not only helps me stay on track, but also provides something useful and interesting for anyone else who’s curious about the process.

# The Idea

I've talked about what to expect from this series of articles, so now I want to add more detail on the idea I want to work towards.

One of the datasets I was working with during my internship was the MNIST dataset. Below is an image of one of the visualizations of the latent vectors in one of my experiments.

![Alt text](/images/mnist-components.png)

The image shows a prototype of a trained classifier's internal representation for the digit **2** (right). This vector was produced by a weighted sum of the components on the left. Due to the visual nature of this task, we can easily interpret what each component means. So, essentially, we are can understand the vector on the right **linear combination of interpretable vectors**.

This simple idea sparks the question: *can we do something similar with text embeddings?*

Instead of visual decompositions, components in text embeddings would correspond to interpretable properties of language. For example, this could be **semantics** (topics, entities, relations), **syntax** (grammar, tense) or **style** (formality, tone).

At a high level, the idea is to identify vector directions in the embedding space that consistently add or remove a particular linguistic property when applied to inputs. Any vector in the embedding space should be representable as a weighted sum of these vector directions, which informs what language properties this vector consists of.

With a sufficiently labeled dataset, these directions could be determined in a fairly straightforward way. The more challenging (and more interesting) problem is figuring out **how to uncover the most interpretable vector directions in an unsupervised way**, or with as little supervision as possible.

**In one sentence:** the idea is to develop an unsupervised method for uncovering a basis of the embedding space, where each vector corresponds to a distinct and interpretable linguistic feature, given a collection of texts and their embeddings.

# Next Steps

The immediate next step is to break the problem down into smaller sub-questions that can guide the very first phase of research. At this stage, the focus isn’t on running full experiments, but on hypothesizing what “interpretable vector directions” should look like and building some intuition for how they might behave in the embedding space.

Once I’ve settled on a set of guiding sub-questions, I’ll start looking into existing methods; both to see what can be applied directly and to learn from approaches that have tackled similar problems in different contexts. The aim is to use these early explorations as stepping stones, gradually shaping a clearer picture of what’s possible and what’s worth pursuing.
