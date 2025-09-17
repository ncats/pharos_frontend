FROM node:20 as buildContainer
ARG BASE_HREF=/pharos/
WORKDIR /app
COPY . /app
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

ENV NODE_OPTIONS --max-old-space-size=8192
# Correct syntax for Angular build with base href

RUN npm run build:ssr -- --base-href=${BASE_HREF} --deploy-url=${BASE_HREF}

FROM node:20-alpine

WORKDIR /app
COPY --from=buildContainer /app/package.json /app

ENV NODE_OPTIONS --max-old-space-size=16384
RUN npm i firebase --legacy-peer-deps
RUN npm install pm2@latest -g

COPY --from=buildContainer /app/dist /app/dist

EXPOSE 4000

ENV NODE_ENV=production

# Simple pm2 command - base href is already baked into the build
CMD ["pm2-runtime", "dist/server/main.js"]
