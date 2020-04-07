# strupload

Easily upload files from your devices directly to your Strava profile without the hassle. 

## How to use

If you're using the website, simply connect to Strava, give the app the permissions it asks for and then you are good to go.

There is also another way to use it which is with (strupload-auto)[https://github.com/cvaldev/strupload-auto], which makes it so that your devices stay sync'd with Strava.

### Get a token
> ⚠️ Keep this token private!

By default, sessions are used to maintain a user authenticated, but if you need an access token you can request it at:

`/oauth/strava?state=tokenize`

### Upload your files

If you're using a token, you'll need to send a `POST` request to:

`/api/upload`

Set the header `Authorization: Bearer <access_token>`. The API will accept an array of up to 25 files under a `file` field.

Supported File Types:
- FIT
- TCX
- GPX

## Building and running

You will need to first [register on strava](https://www.strava.com/register) and then [create an app](https://www.strava.com/settings/api). You're also going to need a database. Once you have done those things, create an `.env` file in the root directory that looks like this:

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

You can watch the files while working on them with:

```
npm run dev
```

## Testing

There's no need for an `.env` file to test, a mock configuration and database connection are used to run the tests. 

Simply run:
```
npm run test
```

## But... Why?

I wanted to automate the process of uploading files to Strava from my Garmin watch but I mainly use a Linux system. Initially I was just going to make a CLI, but since I had to make a back end and handle OAuth anyway I figured it was a good opportunity to play around with NextJS to make something that sort of passes for a UI.