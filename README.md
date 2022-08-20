# Chitter frontend

An exercise to create a frontend for a Twitter clone based on the Makers backend [here](https://github.com/makersacademy/chitter_api_backend). This is an exercise I never got round to during the bootcamp so it's been a nice experience to revisit it with bit more experience under my belt and really build out the frontend.

## User stories

```
As a Maker
So that I can let people know what I am doing  
I want to post a message (peep) to chitter

As a maker
So that I can see what others are saying  
I want to see all peeps in reverse chronological order

As a Maker
So that I can better appreciate the context of a peep
I want to see the time at which it was made

As a Maker
So that I can post messages on Chitter as me
I want to sign up for Chitter

As a Maker
So that only I can post messages on Chitter as me
I want to log in to Chitter

As a Maker
So that I can avoid others posting messages on Chitter as me
I want to log out of Chitter

As a Maker,
So that I can show appreciation for certain peeps
I want to be able to like a peep

As a Maker,
So that I can change my mind later,
I want to unlike a peep

```

## Features implemented

**Authentication**
- Users can sign up and login, a switchable component was used for efficiency
- The session ID needed to perform certain actions is stored using the Context API

**Viewing posts**
- Users can view posts when not logged in
- To make a new post, the user must be logged in to see the 'Add Post' button

**Creating posts**
- Initially implemented as a seperate page, this was later changed to appear above the list of posts on the main page
- Once a new post is created, the new post component is able to refresh the main list of quotes so that the users quote is displayed

**Deleting posts**
- Users can delete their own posts
- This functionality is only enabled once they are logged in otherwise the delete button does not appear
![demo1](https://user-images.githubusercontent.com/74261924/185744584-99fe2c00-d995-463a-86d8-618cf8eaf5bb.gif)


**Liking posts**
- Users can like a post by clicking the heart icon next to a post
- Users can only like a post once
- Clicking the heart icon again will result in the user unliking the post
- If the user likes a post, their name is removed from the like list and 'You' is inserted at the beginning of the list
- If the user is not logged in then their username appears as normal in the list of likes

**Unliking posts**
- Intuitively implemented as on/off or like/unlike
- Visual feedback given to the user as an empty heart when unliked or a red heart when liked
![demo-2](https://user-images.githubusercontent.com/74261924/185744591-5d80671f-3204-4786-b5c1-25ec95d13d82.gif)


**Misc**
- Custom hook used to reuse the http logic so that API requests are more stremlined and DRY
- useReducer used to manage the logic of making http requests
- Context used to store login state and retrieve session token to enable features that require authentication
- Content is protected so that the user cannot post or delete while not logged in
- Loading spinner and page not found implemented for better user experience

## Improvements / future work

- Add better error handling
- Refactor the authentication logic to use the custom http hook
- Add some input validation
- Add more tests 
