FROM barrage/deno AS builder
WORKDIR /usr/src/app
COPY . .

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "src/index.ts"]
