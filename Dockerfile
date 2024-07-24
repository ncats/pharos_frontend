FROM  node:lts-slim as buildContainer
WORKDIR /app
COPY . /app
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

# Install latest versions of specific packages to address vulnerabilities
RUN npm install stdlib@latest
RUN npm install immer@latest
RUN npm install protobufjs@latest

# max-old-space is needed to avoid any compilation issues because of missing memory
ENV NODE_OPTIONS --max-old-space-size=12288
RUN npm run build:ssr

FROM  node:lts-slim

WORKDIR /app
COPY --from=buildContainer /app/package.json /app

ENV NODE_OPTIONS --max-old-space-size=16384
RUN npm i firebase --legacy-peer-deps
RUN npm install pm2@latest -g

# Install latest versions of specific packages to address vulnerabilities
RUN npm install stdlib@latest
RUN npm install immer@latest
RUN npm install protobufjs@latest

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist

EXPOSE 4000

ENV NODE_ENV=production
CMD ["pm2-runtime", "dist/server/main.js"]
