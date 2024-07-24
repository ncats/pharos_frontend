FROM  node:lts-slim as buildContainer
WORKDIR /app
COPY . /app
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

# Install latest versions of specific packages to address vulnerabilities
RUN npm install -g stdlib@1.21.11
RUN npm install -g immer@9.0.6
RUN npm install -g protobufjs@7.2.5
RUN npm install -g cryptiles@4.1.2
RUN npm install -g netmask@1.1.0
RUN npm install -g crypto-js@4.2.0
RUN npm install -g lodash@4.17.12
RUN npm install -g https-proxy-agent@2.2.0
RUN npm install -g open@6.0.0
RUN npm install -g hoek@4.2.1

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
RUN npm install -g stdlib@1.21.11
RUN npm install -g immer@9.0.6
RUN npm install -g protobufjs@7.2.5
RUN npm install -g cryptiles@4.1.2
RUN npm install -g netmask@1.1.0
RUN npm install -g crypto-js@4.2.0
RUN npm install -g lodash@4.17.12
RUN npm install -g https-proxy-agent@2.2.0
RUN npm install -g open@6.0.0
RUN npm install -g hoek@4.2.1

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist

EXPOSE 4000

ENV NODE_ENV=production
CMD ["pm2-runtime", "dist/server/main.js"]
