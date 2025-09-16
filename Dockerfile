FROM node:20 as buildContainer
ARG BASE_HREF=/
WORKDIR /app
COPY . /app
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

# max-old-space is needed to avoid any compilation issues because of missing memory
ENV NODE_OPTIONS --max-old-space-size=8192

RUN npm run build:ssr --base-href=${BASE_HREF}

FROM node:20.15.1-alpine

WORKDIR /app
COPY --from=buildContainer /app/package.json /app

ENV NODE_OPTIONS --max-old-space-size=16384
RUN npm i firebase --legacy-peer-deps
RUN npm install pm2@latest -g

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist

EXPOSE 4000

ENV NODE_ENV=production
# Make BASE_HREF available at runtime as well
ARG BASE_HREF=/
ENV BASE_HREF=${BASE_HREF}

# Use env var instead of hardcoding
CMD ["sh", "-c", "pm2-runtime dist/server/main.js --base-href=${BASE_HREF}"]
