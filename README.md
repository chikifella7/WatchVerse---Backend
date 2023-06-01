# WatchVerse---Backend
# Project Name
  WatchVerse

<br>

# Quick Compo

<br>

## Description

WatchTrack is a web application that allows users to track their favorite series and movies, discover new content, and interact with other entertainment enthusiasts. Through this platform, users can manage their list of series and movies, receive personalized recommendations, rate and comment on the titles they have watched.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing movies and series.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing movies and series.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a user, I want to be able to create a personalized profile, so that I can customize my preferences and track my progress in series and movies. As a user, I want to be able to update and manage my profile settings, such as favorite genres and actors, so that I can keep my preferences up to date.
-  **Add Movies and series :** As a user, I want to be able to add series and movies to my watched list, so that I can keep track of the titles I have already watched.
-  **Edit Movies and series:** As a logged in user I can access the edit movies and series page so that I can edit the movies or series I created. As a user, I want to be able to mark episodes or movies as watched, so that I can keep track of my progress within each series or movie.
-  **Add Comments :** As a user, I want to be able to rate and leave comments on series and movies, so that I can share my opinions and insights with other users.
-  **View Notifications:** As a user, I want to be notified about new episodes, movie releases, and updates for the series I follow, so that I can stay up-to-date with my favorite titles.
-  **View Recommendations:** As a user, I want to receive personalized recommendations for series and movies based on my preferences, so that I can discover new content that aligns with my interests.
-  **Search:**As a user, I want to have the ability to search for specific series and movies, so that I can easily find the titles I'm interested in.
-  **Interactions:**As a user, I want to be able to interact with other users through discussions and comments on series and movies, so that I can engage in conversations and share recommendations.




## Backlog

- User authentication and authorization (MERN)
- Profile creation and customization (React)
- Series and movies CRUD functionality (Express.js, MongoDB)
- Watched list management and progress tracking (React)
- Ratings, comments, and user interactions (Express.js, MongoDB)
- Notifications and personalized recommendations (React, Express.js, MongoDB)


<br>


# Client / Frontend

## React Router Routes (React App)

| Path                   | Component           | Permissions                | Behavior                                                      |
| ---------------------- | ------------------- | -------------------------- | ------------------------------------------------------------- |
| `/login`               | LoginPage           | anon only `<AnonRoute>`    | Login form, redirects to home page after successful login.     |
| `/signup`              | SignupPage          | anon only `<AnonRoute>`    | Signup form, redirects to home page after successful signup.   |
| `/`                    | HomePage            | public `<Route>`           | Home page displaying series and movies.                       |
| `/profile`             | ProfilePage         | user only `<PrivateRoute>` | User's profile page with customization options.               |
| `/series`              | SeriesListPage      | public `<Route>`           | List of series available to browse and add to watched list.   |
| `/series/:id`          | SeriesDetailPage    | public `<Route>`           | Details page for a specific series.                           |
| `/movies`              | MovieListPage       | public `<Route>`           | List of movies available to browse and add to watched list.   |
| `/movies/:id`          | MovieDetailPage     | public `<Route>`           | Details page for a specific movie.                            |
| `/watched`             | WatchedListPage     | user only `<PrivateRoute>` | List of watched series and movies for the user.               |
| `/recommendations`     | RecommendationsPage | user only `<PrivateRoute>` | Personalized recommendations for the user.                    |
| `/search`              | SearchPage          | public `<Route>`           | Search functionality to find specific series and movies.      |
| `/notifications`       | NotificationsPage   | user only `<PrivateRoute>` | Notifications for new episodes, releases, and updates.        |
| `/ratings/:id`         | RatingsPage         | user only `<PrivateRoute>` | Rate and leave comments for a series or movie.                |
| `/ratings/:id/edit`    | EditRatingPage      | user only `<PrivateRoute>` | Edit rating and comments for a series or movie.               |
                               |


## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- SeriesListPage  

- SeriesDetailPage 

- MovieListPage 

- MovieDetailPage

- WatchedListPage

- RecommendationsPage

- SearchPage

- NotificationsPage

- RatingsPage 

- EditRatingPage

  

Components:

- Navbar

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Movies Service**

  - `MovieService` :
    - `.addMovie(movieData)`
    - `.getMovies()`
    - `.getOneMovie(id)`
    - `.deleteMovie(id)`

    **Series Service**

  - `SeriesService` :
    - `.addSeries(seriesData)`
    - `.getSeries()`
    - `.getOneSeries(id)`
    - `.deleteSeries(id)`

- **Watched Service**

  - `watchedService` :
    - `.addToWatchedList(userId, mediaId)`
    - `.removeFromWatchedList(userId, mediaId)`
    - `.getWatchedList(userId)`
    - `.markAsWatched(userId, mediaId)`

    - **Rating Service**

  - `ratingService` :
    - `.addRating(userId, mediaId, ratingData)`
    - `.getRatingsByMediaId(mediaId)`
    - `.getRatingsByUserId(userId)`
    - `.updateRating(userId, mediaId, ratingData)`
    - `.deleteRating(userId, mediaId)`



<br>


# Server / Backend


## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	userProfile: { type: Schema.Types.ObjectId, ref:'User' },
  createdMovies: [ { type: Schema.Types.ObjectId, ref:'Movies' } ]
  createdSeries: [ { type: Schema.Types.ObjectId, ref:'Series' } ]
}
```



**Movies model**

```javascript
 {
   title: { type: String, required: true },
   image: { type: String },
   actorList: [ { type: String } ],
   imDbrating: {type: number, required: true},
   plot: {type: String, required: true}
   directors: {type: String, required: true}
   runtimeMinutes: {type: number, required: true}
   year: {type: String, required: true}
   awards: {type: String, required: true}
   genres: [{type: String, required: true}]
   user: {type: Schema.Types.ObjectId, ref:'User'}
 }
```



**Series model**

```javascript
 {
   title: { type: String, required: true },
   image: { type: String },
   actorList: [ { type: String } ],
   imDbrating: {type: number, required: true},
   plot: {type: String, required: true}
   directors: {type: String, required: true}
   runtimeMinutes: {type: number, required: true}
   year: {type: String, required: true}
   awards: {type: String, required: true}
   genres: [{type: String, required: true}]
   user: {type: Schema.Types.ObjectId, ref:'User'}
 }
```
**Reviews model**
```javascript 
 {content: String,
  rating: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
}




<br>


## API Endpoints (backend routes)


| Método HTTP | URL                               | Corpo da Solicitação                               | Status de Sucesso | Status de Erro | Descrição                                                                     |
|-------------|-----------------------------------|---------------------------------------------------|-------------------|----------------|-------------------------------------------------------------------------------|
| GET         | `/api/users`                      |                                                   | 200               | 400            | Obter todos os usuários                                                       |
| POST        | `/api/users`                      | { name, email, password }                          | 201               | 422, 409       | Criar um novo usuário                                                         |
| GET         | `/api/users/:id`                  |                                                   | 200               | 404            | Obter um usuário específico por ID                                             |
| PUT         | `/api/users/:id`                  | { name, email, password }                          | 200               | 404            | Atualizar um usuário específico por ID                                         |
| DELETE      | `/api/users/:id`                  |                                                   | 200               | 404            | Excluir um usuário específico por ID                                           |
| GET         | `/api/movies`                     |                                                   | 200               | 400            | Obter todos os filmes                                                         |
| POST        | `/api/movies`                     | { title, image, fullCast, imDbrating, plot, directors, runtimeMinutes, year, awards, genres } | 201               | 422            | Criar um novo filme                                                           |
| GET         | `/api/movies/:id`                 |                                                   | 200               | 404            | Obter um filme específico por ID                                               |
| PUT         | `/api/movies/:id`                 | { title, image, fullCast, imDbrating, plot, directors, runtimeMinutes, year, awards, genres } | 200               | 404            | Atualizar um filme específico por ID                                           |
| DELETE      | `/api/movies/:id`                 |                                                   | 200               | 404            | Excluir um filme específico por ID                                             |
| GET         | `/api/series`                     |                                                   | 200               | 400            | Obter todas as séries                                                         |
| POST        | `/api/series`                     | { title, image, fullCast, imDbrating, plot, directors, runtimeMinutes, year, awards, genres } | 201               | 422            | Criar uma nova série                                                          |
| GET         | `/api/series/:id`                 |                                                   | 200               | 404            | Obter uma série específica por ID                                              |
| PUT         | `/api/series/:id`                 | { title, image, fullCast, imDbrating, plot, directors, runtimeMinutes, year, awards, genres } | 200               | 404            | Atualizar uma série específica por ID                                          |
| DELETE      | `/api/series/:id`                 |                                                   | 200               | 404            | Excluir uma série específica por ID                                            |
| POST        | `/api/movies/:id/rate`            | { userId, rating }                                | 200               | 404            | Avaliar um filme específico por ID                                             |
| POST        | `/api/movies/:id/comment`         | { userId, comment }                               | 200               | 404            | Comentar em um filme específico por ID                                         |
| POST        | `/api/series/:id/rate`            | { userId, rating }                                | 200               | 404            | Avaliar uma série específica por ID                                            


<br>

## API's
IMDB API

<br>

## Packages
- Express
- Cors
- Dotenv
- Multer
- Multer-Storage
- Nodemon
- Jsonwebtoken
- Bcrypt
- JWT
- React-router-dom
- Axios
- Mongoose
- Mongodb
- Ironlauncher




<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/63up3ojV/watchverse)

### Git

The url to your repository and to your deployed project

[Client repository Link]

[Server repository Link]

[Deployed App Link]

### Slides

[Slides Link] - The url to your *public* presentation slides

### Contributors

Francisco Branco - <chikifella7> - <https://www.linkedin.com/in/francisco-branco7/>

Nuno Durão - <github-username> - <https://www.linkedin.com/in/nuno-f-durao/>
