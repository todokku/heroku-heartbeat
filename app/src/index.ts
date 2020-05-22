import 'https://deno.land/x/dotenv/load.ts';

interface IApp {
  web_url: string;
}

const TWENTY_FIVE_MINUTES = 25 * 60000;

/**
 * Get the Heroku API key.
 */
const HEROKU_API_KEY = Deno.env.get('HEROKU_API_KEY');

/**
 * Get all the apps associated with the Heroku API key.
 */
const response = await fetch('https://api.heroku.com/apps', {
  method: 'GET',
  headers: {
    'Accept': 'application/vnd.heroku+json; version=3',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${HEROKU_API_KEY}`,
  },
});

/**
 * Ping all the apps every 25 minutes.
 */
const apps = await response.json();
setInterval(async () => {
  await Promise.all(apps.map((app: IApp) => fetch(app.web_url)));
}, TWENTY_FIVE_MINUTES);

