---
title: "The Simple Art of API Design"
date: "2025-05-19"
description: "What makes a good API? Designing the backend API and WebSocket server."
series: "Mini Kahoot"
part: 5
---

The backend of Mini Kahoot can be split into two sections:
1. REST API (operates over HTTP)
2. Live Game Engine (operates over WebSockets)

As explained in the previous post, the realtime features of Mini Kahoot will utilise WebSockets instead of the HTTP 
protocol. However, this does not mean WebSockets have to be used for the entire backend - the rest of the features
are better handled with HTTP. Having a persistent connection for every feature ties up resources unnecessarily. 

The backend split will be as shown below:

![backend-split.png](/assets/api-design/backend-split.png)

## How are good REST APIs designed?

Before I get into designing the REST API, I want to cover what makes a clean & well-structured API. This is important
for maintainability, scalability and a smooth development experience.

Designing a good REST API has a few principles:

### 1. Use Nouns, not verbs in endpoints
HTTP methods themselves already provide the semantic meaning of the request. So, it's much cleaner to have endpoints use 
nouns instead of verbs e.g instead of having ```/getQuestions``` as an endpoint, have ```GET /questions``` (note how the
HTTP method already describes what the action is).

### 2. Use Plural Nouns for Collections
More often than not, an application is going to have multiple resources of the same type. This convention clearly 
communicates that the endpoint can represent multiple items.

For instance, while ```/question/123``` might work for specific operations like updating or deleting, ```/questions``` 
effectively represents the entire set of questions, allowing for ```GET /questions``` to fetch all and 
```GET /questions/123``` to fetch a specific one.

### 3. Nest endpoints to capture relationships
Entities are often related to each other, in which case, ensure to using nesting in endpoints to capture the relation.

For example, a social media post is posted by a user and has comments on it. With nesting, we can capture this 
relationship with endpoints like ```/posts/123/user``` and```/posts/123/comments``` for actions for the post's user and 
the post's comments respectively.

### 4. Use Filtering, Sorting and Pagination
When there is a large volume of data in the database, we should utilise these techniques to retrieve the specific data 
we want. We can sort on a certain parameter ```/questions?sort=difficulty```, filter based on criteria 
```/questions?topic=sport``` or divide the data into smaller chunks (paginate) ```/questions?page=5```.

### 5. Utilise HTTP Status Codes
HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are 
grouped in five classes:

* Informational responses ```100–199```
* Successful responses ```200–299```
* Redirection messages ```300–399```
* Client error responses ```400–499```
* Server error responses ```500–599```

## Designing the REST API

Given these principles, I'll proceed with laying out the REST API endpoints of the backend.

Taking the feature specification from Part 2 and the backend split, the REST API will cover the following features:
* Game Creation
* Game Joining
* Question API

### Game Creation & Game Joining

```POST /games``` 

```POST /games/:id/players```

``GET /games/:id``


### Question API

```POST /questions```

```GET /search```


## Live Game Engine

This engine, that handles the realtime events of Mini Kahoot, will be a WebSocket server.

Instead of REST API endpoints, this WebSocket server will be designed around event-driven communication. 
Each event is defined with its name, origin (whether triggered by the client or the server) and the 
structure of its data payload.

This server is to handle the following features:
* Game Lobby
* Gameplay

### Client-to-Server events

``start-game``

This event is sent from a game host to the server to begin a game.

**Operation:**
- Updates game entry in the database to signal the game has started.
- Emits the ```start-game``` event to all connected clients in the lobby that the game has started.

**Message Payload:** 
```text
{
    gameId: number
}
```

```join-game```

Triggered when a player joins a game lobby.

**Operation:**
- Broadcasts a ```player-joined``` event to all connected clients in the game to notify them a player has joined the
game.

**Message Payload:**
```text
{
    gameId: number
}
```

```get-game-data```

This event is sent by a player when they want to get their current game data.

**Operation:**
- Uses ```token``` and ```gameId``` to fetch the player's current game data.
- Emits a ```game-data``` event to the client who sent this event to send their data.

**Message Payload:**
```text
{
    gameId: number
    token: number
}
```

```submit-answer```

Emitted to server for when the player has submitted an answer.

**Operation:**
- Updates player's points in the database based on correctness and speed (using ```elapsed```)

**Message Payload:**
```text
{
    gameId: number
    question: Question
    answer: number // index of the option the user selected
    token: number
    elapsed: number // percentage of game round elapsed
}
```

```next-state```

Sent to the server by the game host, signalling the server to progress a game to its next state.

**Operation:**
- Updates the game entry in the database to reflect the new state.

**Message Payload:**
```text
{
    gameId: number
}
```

```end-game```

Sent to the server by the game host to signal the server to end a game and delete from the database.

**Operation:**
- Deletes the relevant game from the database.

**Message Payload:**
```text
{
    gameId: number
}
```

### Server-to-Client events

```played-joined```

Sent to clients in a game lobby when a new player has joined a game.

**Operation:**
- Requests from the server the new list of players in the game.
- Displays the list on screen.

No message payload. Event simply just notifies the client a new player has joined.


```start-game```

This notifies clients the game is starting.

**Operation:**
- Redirect from the lobby to the main game.

**Message Payload:**
```text
{
    gameId: number
}
```


```game-data```

This event is sent to the client as a reply to client-to-server event ```get-game-data``` as described above.

**Operation:**
- Uses payload to display relevant screen i.e question screen, score screen or end screen.
- Uses ```isHost``` to determine if the player can carry out certain actions e.g only show the 'start game' button
if the user is a host.

**Message Payload:**
```text
{
    question: Question // current question
    state: string (ENUM)
    playerScore: number
    playerName: string
    roundStart: number // time when round started
    isHost: boolean
}
```

For more detail about ```state```, see the database design post, but this is an enum of either ```QUESTION```,
```ROUND_SCORES```, ```FINISHED```, which informs the client which screen to show during a game.