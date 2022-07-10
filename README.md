
# Week 3 Assignment: Life Tracker

Submitted by: Gabriel Bremo

Deployed Application: [Lifetracker Deployed Site](http://gainful-uncle.surge.sh/)

## Application Features

### Core Features

- [x] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [x] If the user is logged in, it should display a **Sign Out** button. 
  - [x] If no user is logged in, it should display **Login** and **Register** buttons
  - [x] Display a logo on the far left side, and contain links to the individual detailed activity page. 
- [x] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about
- [x] **Login Page:** A form that allows users to login with email and password.
- [x] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [x] When a user first authenticates, they should be redirected to an authenticated view (i.e the detailed activity page). When they sign out, all frontend data should be reset.
- [x] Users have access to an overview Activity page that show one summary statistic about each of the 3 types of activity tracked.
- [x] The API should have a `security` middleware that only allows authenticated users to access resources and only allows users to access resources about themselves. 
- [x] Users should have the ability to track at least **1** types of activities (i.e Nutrition, Exercise, Sleep, etc.). Each activity should be tracked on separate pages.
- [x] Deployed website with Heroku & Surge. 

**Detailed Activity Page:**
- [x] The detailed activity page should display a feed of all previous tracked activities.
- [x] The detailed activity should contain a form to contain relevant information. (i.e if tracking nutrition this form allows the user to capture calories, timestamp, image, category, etc.) 
- [x] The activity tracked should be given a unique id for easy lookup.
  ![Tables Schema](https://github.com/Godmiliut/tdd-lifetracker-starter/blob/main/lifetracker-api/lifetracker-schema.sql) 

### Stretch Features

Implement any of the following features to improve the application:
- [ ] Each model (`nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource. Create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [ ] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item.
- [ ] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the life tracker application and allow users to follow each other.

### Walkthrough Video

![](lifetracker-ui/src/assets/readme%20gif.gif)

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The topics discussed in the labs prepared me to complete the assignment, however, deploying the website is more difficult than expected. 

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would have liked to implement a more unique styling in my website, more detailed error handling, and a more broad availability of activities to track.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I believe my project demo went pretty well. The different UIs my peers came up with really inspired me to try adding a personal touch next time.

### Open-source libraries used

- https://reactjs.org/
- https://axios-http.com/docs/intro
- http://expressjs.com/
- https://reactjs.org/docs/react-dom.html
- https://www.npmjs.com/package/dotenv
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://www.npmjs.com/package/jsonwebtoken
- https://www.npmjs.com/package/morgan
- https://www.npmjs.com/package/bcrypt

### Shout out

I would like to share my peers Lacie and Miles for their great collaboration throughout this week. Working with them is a great experience and gives me a sense of what working as a team feels like. Additionally, I would like to give a shoutout to Jeff Astor for creating explanatory videos for our weekly assignments.
