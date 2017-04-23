# TriviaChat for iOS

Welcome to the iOS version of Triviachat built with React Native. TriviaChat for iOS allows you to test your culture by answering Trivia questions on your phone.

Triviachat (https://triviachat.herokuapp.com/#/) was innitially built as a web app for my fourth project during General Assembly's Web Development Immersive course.

# Game Features

  - Choose one of three levels of difficulty (Easy, Medium, Hard).
  - Answer as many questions as you can within 30 seconds.
  - Each question is associated with 4 possible answers, only one of them is correct.
  - After each answered question, the correct answer will be highlighted in green while any incorrect answer from the user will be highlighted in red.
  - Once the 30 seconds are expired, the user will be able to see their session results as well as a Leaderboard of the top 5 scores for each difficulty level.
  - The user will then be able to either go Home and choose another level of difficulty or start another 30 second session with the same difficulty level.


# Tech

Trivichat is built with React Native.

In order to get the Trivia questions, TriviaChat uses the Open Trivia Database API (https://opentdb.com/api_config.php). 50 Multiple Choice questions are pulled from the API for each session based on the selected difficulty level
