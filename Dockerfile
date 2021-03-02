FROM node:14 as buildContainer
WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm i -g npm@7.5.6
RUN npm install
COPY . /app
# max-old-space is needed to avoid any compilation issues because of missing memory
ENV NODE_OPTIONS --max-old-space-size=4096
RUN npm run build:ssr

FROM node:14-alpine

WORKDIR /app
COPY --from=buildContainer /app/package.json /app
RUN npm i firebase

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist

EXPOSE 4000

ENV NODE_ENV production
CMD ["npm", "run", "serve:ssr"]
