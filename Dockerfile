FROM node:20 as buildContainer
WORKDIR /app

# Install curl for buildContainer
RUN apt-get update && apt-get install -y curl

COPY . /app
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

# max-old-space is needed to avoid any compilation issues because of missing memory
ENV NODE_OPTIONS --max-old-space-size=4096
RUN npm run build:ssr

FROM node:20-alpine

WORKDIR /app

# Install curl for productionContainer
RUN apk add --no-cache curl

COPY --from=buildContainer /app/package.json /app

ENV NODE_OPTIONS --max-old-space-size=16384
RUN npm i firebase --legacy-peer-deps
RUN npm install pm2@latest -g

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist

EXPOSE 4000

ENV NODE_ENV=production
CMD ["pm2-runtime", "dist/server/main.js"]
