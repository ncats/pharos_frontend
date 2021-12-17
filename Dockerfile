FROM node:14 as buildContainer
# Set the source folder
ARG SOURCE_FOLDER="./"
ARG BUILD_VERSION
ARG NPM_TOKEN
# Create app directory
WORKDIR /var/www/app
# Bundle app source
COPY ${SOURCE_FOLDER} .

RUN npm install -g npm@7.6.0
RUN npm install

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
