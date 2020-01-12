# Sample Strava Application

### Setup Environment Variables

- Open up `./sample.env` and modify the `CLIENT_ID` and `CLIENT_SECRET` to your updated Strava API Application credentials.
- If you need help getting the credentials follow the following steps:
  - Register for a Strava account at [Strava Registration](https://www.strava.com/register)
  - After you are logged in, go to [Strava API Settings](https://www.strava.com/settings/api)
  - You should see the "My API Application" page, and you can click on Client ID and Client Secret here to show them and copy them into your `./sample.env`.
- Once you have updated `CLIENT_ID` and `CLIENT_SECRET`, assign a random string of numbers and letters for `COOKIE_KEY` to properly sign cookies.
- Finally, rename `./sample.env` to `./.env` so it will be properly picked up by [dotenv]() at startup.

### Running The Dev Server

- Open up the terminal and install dependencies with your package manager of choice either `npm install` or `yarn install`.
- Run the dev server with `npm run start:dev` or `yarn start:dev` and the server will start running and announce the port it is listening on in the terminal.
- If you would like to change the port from the default `8080` just add a variable in your `./.env` called `PORT` and assign it to whatever port you'd like.

### Authenticating

- To authenticate to the server, first the user needs to visit `https://www.strava.com/oauth/authorize?client_id=[CLIENT_ID]&response_type=code&redirect_uri=http://localhost:8080/auth/callback&approval_prompt=force&scope=read`
- Once you authenticate with Strava you will be redirected to `http://localhost:8080/auth/callback?state=&code=[CALLBACK_CODE]`
- This API has a route at that address, which takes that callback code and uses it in a background request with Strava to exchange the callback code for the user's `access_token`, and `refresh_token`.
- That background request stores this data in the following cookies: `x-Token`, `x-Refresh`, and `x-Expires`.

### Testing Authentication

- To test if you are authenticated you can open your browser to the url `http://localhost:8080/auth/info` to return the current tokens stored in cookies.

### Running a Sample Route

- To get the current running races you can use `http://localhost:8080/test/running_races` to return all the running races if you are authenticated.
