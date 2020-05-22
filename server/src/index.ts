import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

const PORT = 5000;
const TWENTY_FIVE_MINUTES = 25 * 60000;

const router = new Router();
router
  .post('/url', async (context) => {
    const body = await context.request.body();
    const { url } = body.value;

    setInterval( () => fetch(url), 3000);

    context.response.body = 'Successfully added!';
    context.response.status = 200;
  });

const app = new Application();
app.use(oakCors());
app.use(router.routes());

await app.listen({ port: PORT });
console.log(`Listening on ${PORT}...`);


