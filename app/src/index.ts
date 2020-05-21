import { serve } from 'https://deno.land/std@0.50.0/http/server.ts';

const s = serve({ port: process.env.PORT || 5000 });

console.log('http://localhost:5000/');

for await (const req of s) {
  req.respond({ body: 'Hello World\n' });
}
