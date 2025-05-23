---
title: "Database Design"
date: "2025-05-19"
description: "How will the data look in Mini Kahoot?"
series: "Mini Kahoot"
part: 5
---

It is vital to see how data is going to be structured in Mini Kahoot before designing the backend API. This determines
what data the backend should expect and what data it should send back in responses.

## Choice of Database

For this project, I've decided to use MongoDB as the chosen databases.

Why I've chosen MongoDB:
* I have previous experience and enjoy working with MongoDB!
* I anticipate that I will require vector search capabilities for question searching, with MongoDB provides straight
out the box.
* Flexible schema allows me to iterate quickly as the project evolves.
* It supports embedded documents, which fits well with the nested structure of players within a game.

## Data Modelling

Mini Kahoot consists of three collections:
* Questions
* Players
* Games

### Questions

Each document in this collection represents a single question with the fields below.

```text
{
  question: string,
  options: string[],
  answer: number,
  tags: string[],
  vector: number[]
}
```

Explanation:
* ```question``` The text of the question itself.
* ```options``` Array for the answer options.
* ```answer``` Stores the index of the correct answer in ```options```
* ```tags``` Array of the question tags. Tags are used to specify the topics a question is about.
* ```vector``` Vector embedding of the question text. This is for when descriptions need to be matched to relevant 
questions.


### Games

The Games collection represents active game sessions.

```text
{
  gameId: number,
  questions: Question[]
  players: Player[],
  round: number,
  roundStart: number,
  answeredInRound: number,
  state: string (ENUM)
}
```
Explanation:
* ```gameId``` ID of the game. This is the code players will enter to join this game.
* ```questions``` List of questions the game has. I decided to embed full question documents instead of question IDs to
remove extra database calls to fetch the question in live games.
* ```players``` List of players connected to the game. This is also embedded as players are always tied to a game and 
won't be referenced outside one.
* ```round``` The round/question the game is currently on.
* ```answeredInRound``` Number of people who have submitted an answer in the current round. This will be used to determine
if game rounds can end early or not.
* ```state``` Enum for the current state of the game.
    - **QUESTION:** Players are answering the current question.
    - **ROUND_SCORES:** Answers are not being accepted. Round results are being displayed.
    - **FINISHED:** Game is complete. Final standings are being shown.

### Players

Seen in the Games collection, a document in the players collection represents a player in an active game.

```text
{
  name: string,
  score: number,
  token: number,
  isHost: boolean
}
```
Explanation:

* ```name``` The player’s display name.
* ```score``` The player’s current score within the game.

* ```token``` A unique numeric token used by the server identify the player in the game session. 
  - While display names are visible publicly during the game, tokens are stored securely in the player’s browser and used
  by the server to reliably identify players.
  - This prevents players from impersonating others by changing their display name in requests, as the server relies on 
  the token rather than the display name for player identification.

* ```isHost``` Boolean flag indicating if this player is the host of the game.

## What's Next?

That's all the data modelling needed for Mini Kahoot!

The next post will cover API design, using these database models to determine how data is received and responded with.