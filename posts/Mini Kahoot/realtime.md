---
title: "HTTP & The Magic Of Web Sockets"
date: "2025-19-05"
description: "How can we communicate in realtime over the web?"
series: "Mini Kahoot"
part: 3
---

Now that it's time to think about implementation, one obvious question is how can we implement realtime communication
over the web.

## HTTP

The HTTP protocol is used by web applications as their primary communication method. 

It works on a **request-response** model which is simply:
* Client sends a request to the web server.
* The web server responds accordingly.
* The connection closes.

This works great for many things on the web like submitting forms, fetching specific data, creating posts on social
media platforms etc.

However, this request-response model means HTTP is a **one-way** communication protocol. Only the client can initiate
communication with the server. As you can probably imagine, this creates a problem when trying to build realtime
features.

Realtime features require the server to be able to send data to the client without the client asking. 

For example, take a chat application like WhatsApp:

* Two users are connected and chatting in real time.
* When User A sends a message, it goes to the server.
* The server now needs to deliver that message to User B.

But here's the issue: with HTTP, only clients can initiate communication. That means User B won't know there's a new 
message unless they **actively send a request to check**. Even then, when do they know to send the request?

There a few solutions to this:

### Polling

Polling is where the client simply sends a request at regular intervals to check for updates.

This is simple to implement, yet this solution is very wasteful:
* If multiple clients were connected and polling the web server, this would put unnecessary load on the server with most 
polling requests likely returning no data. 
* Requests  are sent at fixed, regular intervals, there is a delay between data being available and received. 
* Full TCP handshakes are required for each request, introducing overhead & latency.

### Long Polling

Long Polling is an improvement on Polling: 
* A client sends an HTTP request to the web server. 
* The web server keeps the connection open for a long/indefinite time period.
* Once the server has the relevant data, it sends the response and closes the connection.

This reduces the number of connections made from Polling but still has issues:
* Holding connections open is an inefficient use of server resources.
* Handling connection timeouts and drops while ensuring messages are delivered consistently introduces complexity.
* Scales poorly for several users.
* Not truly bidirectional. Long Polling is just a hack around a one-way protocol.

Despite this, long polling can be useful:
* Working on old systems or HTTP-only environments.
* Realtime updates are infrequent.
* Persistent connections are blocked.

Why exactly this is the case will make more sense when we talk about WebSockets...

## Web Sockets

WebSockets are the ideal solution for applications that need true, two-way communication between the client and server 
which makes them perfect for applications with crucial realtime features like Mini Kahoot.

WebSockets offer a different paradigm to what we have seen with the polling techniques. WebSockets establish a single, 
long-lived connection between the client and server. Once its connection is established, data can flow freely in 
both directions at any time, without the need for repeated requests.


WebSockets improve on the polling techniques from before, effectively solving:
* **Reducing Latency:** By maintaining a persistent connection, WebSockets eliminate the overhead of repeatedly 
establishing new HTTP connections for each data exchange, significantly reducing latency.
* **Improving Efficiency:** A single persistent connection consumes fewer resources compared to the constant 
back-and-forth of polling or long-polling, especially in applications with frequent updates. 
* **Enabling True Bidirectional Communication:** WebSockets allow both the client and the server to initiate communication 
at any point, facilitating richer and more interactive applications.

This long-lived connection is different from what happens in Long Polling - something that initially confused me when I
first learned about WebSockets was how it could be more efficient when both held long connections. 

In Long Polling, the connection closes as soon as the server responds with data (which
follows the standard behavior of HTTP). A new connection must then be created for the next update, introducing overhead.

In contrast, WebSockets use a separate, lightweight protocol that keeps the connection open even after data is sent, only 
closing when the client or server explicitly decides to end it.

## WebSockets Under The Hood

Let's dive into exactly how WebSockets provide true, bidirectional communication over the web.

### WebSocket Open Handshake

The aim of this handshake is to upgrade the existing HTTP connection to a WebSocket connection.

WebSockets start as a standard HTTP request and response. In this interaction, the client asks to open a WebSocket 
connection and, if it is able to, the server responds, successfully completing the handshake.

The handshake follows these steps:

### 1. Client Request

The client sends a HTTP GET request to a WebSocket URI. WebSocket URIs look the same to HTTP URIs, except they begin 
with a ```ws:``` or ```wss:``` (secure web socket) instead of ```http:``` or ```https:```

The request includes the following headers:

```Connection: Upgrade``` indicates we want to use a different protocol to HTTP.

```Upgrade: websocket``` The ```Upgrade``` header in general is used to switch the connection to the given protocol. It 
could be a list of protocols also, which specify decreasing order of preference for the protocol switch.

```Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==``` The ```Sec-WebSocket-Key``` is a random 16-byte value that has been 
base64-encoded. Its use will be explained later.

```Sec-WebSocket-Version: 13``` Currently, the only accepted version of the WebSocket protocol is 13. No other version 
will work.

### 2. Server Response

The server response is a HTTP 101 Switching Protocols response and includes the the following headers:

```Connection: Upgrade``` Confirms that the connection has been upgraded.

```Upgrade: websocket``` Confirms that the connection has been upgraded.

```Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=``` This value is computed by concatenating 
258EAFA5-E914-47DA-95CA-C5AB0DC85B11 to the key received from the client and performing a SHA-1 hash followed by a 
Base64 encode on the result. The client performs the same algorithm on the key it sent earlier, ensuring the computed 
values match. This prevents malicious users from tricking servers into treating non-WebSocket connections as WebSocket 
connections, which could lead to unpredictable behaviour.

After the server response, the handshake is complete and the client and server have agreed to use the existing TCP/IP 
connection established for the HTTP request as a WebSocket connection. Data can flow both ways in this connection via a 
simple framed protocol.