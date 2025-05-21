---
title: "Project Introduction"
date: "2025-19-05"
description: "What am I building & aim of the series."
series: "Mini Kahoot"
part: 1
---

Welcome to this series of blog posts where I undertake the task of building my very own **Kahoot clone**, which I'm
calling "Mini Kahoot".

I've decided to build this project for a few reasons:
1. It's been a little while now since I've done a full-stack project. My recent projects have either been on the 
lower-level side of things or rapid prototyping at hackathons. I'd like to get back into the swing of building end-to-end 
full-stack projects and I see this summer as a good time to do exactly that!

2. Cloning Kahoot is great since it covers so many different areas of full-stack development. It's a good way to shake 
off any rust, learn a ton of new things & write about it all.

3. Kahoot was something that made lessons fun back in school, so why not build my own version of it?

## What is Kahoot?

For those that don't know, Kahoot is a real-time, multiplayer quiz application that turns multiple-choice questions into an 
interactive, competitive game. Players join a live session using a unique game PIN and answer questions on their own 
devices, with points awarded for speed and accuracy.

## What exactly will I be building?

I will be cloning Kahoot with some variations of my own:

1. **Game Creation**
* A host creates a game by writing a short description of the quiz they want to create. This description is used to fetch
relevant questions from the database for the host to choose from. This is instead of selecting from pre-made quizzes as 
seen in real Kahoot.
* **Why?** This allows for a more tailored game creation experience. It also presents the opportunity to work with 
Language Models, finetuning and vector databases which are all interesting to learn & write about! 

2. **Live Game**
* During live games, questions will be shown on all the player devices instead of just the host screen.
* **Why?** This means players aren't required to be in the same physical location / on a shared call to play together.

## Aim of this series

The aim of this series is less to show how I built a Kahoot clone, but more to **explore the concepts and technologies
behind the project** so you can apply them to your own ideas and creations.

With this considered, I'll be diving into topics including:
* **Backend Design**: Exploring API design, WebSockets and more.
* **Frontend & Software Engineering Design**: Exploring how React's features can help us follow the principles of
writing clean and maintable code.
* **Database Design**: Looking at trade-offs between types of databases and how data for this project is structured and
stored
* **ML Concepts**: Focussing on how I'll be using language models + finetuning to optimise the question search feature
of this project.
* **DevOps**: Writing CI/CD pipelines to automate workflows and ensure code pushed to production is reliable.

Hope you enjoy the series!