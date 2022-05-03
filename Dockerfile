FROM node:16 as buildContainer
WORKDIR /app
COPY . /app
RUN npm install -g npm@latest
RUN npm install

# max-old-space is needed to avoid any compilation issues because of missing memory
ENV NODE_OPTIONS --max-old-space-size=4096
RUN npm run build:ssr

FROM node:16-alpine

WORKDIR /app
COPY --from=buildContainer /app/package.json /app

ENV NODE_OPTIONS --max-old-space-size=16384
RUN npm i firebase
RUN npm install pm2@latest -g

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist

EXPOSE 4000

ENV NODE_ENV production
CMD ["pm2", "start", "dist/server/main.js", "-i", "max"]
