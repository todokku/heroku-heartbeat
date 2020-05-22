FROM barrage/deno AS builder
WORKDIR /usr/src/app
COPY . .

# Development
FROM builder AS development
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "src/index.ts"]
