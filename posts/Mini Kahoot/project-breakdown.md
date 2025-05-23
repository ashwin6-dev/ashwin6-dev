---
title: "Breaking It Down"
date: "2025-19-05"
description: "Breaking the project down into a clear specification"
series: "Mini Kahoot"
part: 2
---

In any project, before you can begin writing any code or designing the system, you need a clear idea of what you're 
building (assuming you want to build it well).

In this post, I will be going over the exact features that I'd like the Kahoot clone to have, to develop a 
clearer picture of what the project's design will look like.

## Two "Types" of Users

In Mini Kahoot, there will be two kinds of users:
1. Those who want to create a game (let's call them **hosts**).
2. Those who want to join and play in a game (let's call them **players**).

I use the term “types” loosely here — not in the sense of authenticated user roles with different permissions. 
Mini Kahoot doesn’t include user authentication since there’s no real need for user accounts or profiles. Instead, 
“type” simply refers to the user’s intention when interacting with the platform.

With these two types in mind, I'll draw out how I want the user workflow to work for each.

### Hosts

![Host Userflow](/assets/project-breakdown/host-userflow.png)

### Players

![Player Userflow](/assets/project-breakdown/player-userflow.png)

## Game Lobby

Both host and player user workflows end up with the **game lobby**.

The game lobby is a simple page where the host and joined users wait before the host starts the game. It shows a list of
all the current players in the game and adds to the list in realtime whenever a new player joins.

## Live Games

A live game in Mini Kahoot rotates between three screens:
* **Question Screen:** The current question + answer options are shown to the user.
* **Post-Question Screen:** When a round completes, this screen shows the user's current position and top players
on the leaderboard.
* **End Screen:** Screen that shows final results when the game is done.

So, the userflow for live games would like something like this:

![Live Game Userflow](/assets/project-breakdown/live-game-userflow.png)

## Question API


To support this, the system must provide an internal API with the following capabilities:
* Add new questions to the database (used internally by administrators or automated tools).
* Retrieve questions based on a natural language description (used during game creation to match relevant content).

## Overall Workflow

With each component workflow now covered, it is quite simple to put together the overall workflow of the application.

![Overall Userflow](/assets/project-breakdown/overall-user-workflow.png)


## Feature Specification

With a clearer understanding of the user workflow, we can specify the concrete features Mini Kahoot will have. This
specification will serve as the technical foundation for implementation decisions moving forward.

### 1. Game Creation

* **Quiz Description Input:** Hosts should be able to enter descriptions for the quiz they want to create.
* **Question Fetching:** Based on the description, the system must be able to fetch relevant questions from the 
question database (will use the Question API).
* **Question Selection:** Hosts can select/de-select questions from the fetched list before creating the game.
* **Game PIN Generation:** The system should be able to generate unique game codes for each game.

### 2. Game Joining

* **PIN Entry:** Players should be able to enter a game code and nickname to join an existing game.
* **Validation:** The system should validate whether the PIN is valid and the game is still joinable.

### 3. Game Lobby

* **Synchronised Player List:** Lobby must display the live list of players who have joined a game room. All players 
waiting for the game to start see this page.
* **Host Start Button:** Only the host has a button to start the game.

### 4. Gameplay

* **Synchronised Question Display:** All players and the host should see the same question simultaneously.
* **Answer Submission:** Players can select their answers and the system must capture responses and timestamps.
* **Scoring Logic:** Players should be awarded points based on speed and correctness.
* **Post-Question Feedback:** After each question, players should see how they performed and where they stand.
* **Leaderboard Tracking:** A running leaderboard should be maintained and shown after each round.
* **Final Results Screen:** When the game ends, players should see their final positions.

### 5. Question API

Although users won’t be able to create their own questions in Mini Kahoot, the platform still requires a set of
questions to function effectively.

To support this, the system must provide an internal API with the following capabilities:
* **Question Creation:** Add new questions to the database (used internally by administrators or automated tools).
* **Question Fetching:** Retrieve questions based on a natural language description (used during game creation to match 
relevant content).

This feature specification provides an explicit "what" for this project. I can begin to design the architecture and 
think about how to implement this much easier now, having well-defined, concrete parts of the application laid in front 
of me.

## What's Next?

In the next few posts, I’ll dive into the design of Mini Kahoot’s backend and explore the key concepts that drive it, 
explaining how it’s built and why it works the way it does.