# strava-upload

Easily upload files to Strava through the strava-upload-cli(Coming soon&trade;...), or through the web (Also coming soon&trade;...).

## How to use
Start the OAuth flow by making a `GET` request to 

`/oauth/strava`

Authenticate with Strava and give permission to upload files to your profile. If using the website (Soon&trade;.️) you can now upload your files :D. 

### Get a token
> Keep this token private, tokens may expire and have limits in the future.

By default, sessions are used to maintain a user authenticated, but if you need an access token you can request it at:

`/oauth/strava?state=tokenize`

### Upload your files

If you're using a token, you'll need to send a `POST` request:

`/api/upload`

Set the header `Authorization: Bearer <access_token>`.

Supported File Types:
- FIT
- TCX
- GPX

## Testing

```
npm run test
```
or:

```
npx jest
```

You can also watch files with

```
npx jest --watch
```

## Building and running

You will need to first [register on strava](https://www.strava.com/register) and then [create an app](https://www.strava.com/settings/api). You're also going to need a database. Once you have done those things, create an `.env` file in the root directory, it should look like this:

```
CLIENT_ID=<YOUR_CLIENT_ID>
CLIENT_SECRET=<YOUR_CLIENT_SECRET>
CALLBACK_URL=<YOUR_CALLBACK_URL>
SECRET=<YOUR_SECRET>
DATABASE_URL=<YOUR_DATABASE_URL>
```

From there is just as simple as:

```
npm install
npm start
```

If you want to avoid building on every file update you can run this to watch the TS files:

```
npx ts-node-dev --respawn --transpileOnly index.ts 
```
