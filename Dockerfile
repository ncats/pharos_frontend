FROM node:20 as buildContainer
WORKDIR /app
COPY . /app
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

# max-old-space is needed to avoid any compilation issues because of missing memory
ENV NODE_OPTIONS --max-old-space-size=8192
RUN npm run build:ssr

FROM node:20.15.1-alpine

WORKDIR /app

# Install build tools for compiling OpenSSL
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libssl-dev \
    && apt-get clean

# Download and compile OpenSSL 3.3.2
RUN curl -O https://www.openssl.org/source/openssl-3.3.2.tar.gz \
    && tar -zxf openssl-3.3.2.tar.gz \
    && cd openssl-3.3.2 \
    && ./config --prefix=/usr/local/openssl --openssldir=/usr/local/openssl shared zlib \
    && make -j$(nproc) \
    && make install \
    && rm -rf /openssl-3.3.2.tar.gz /openssl-3.3.2

# Update the system paths to use the newly installed OpenSSL
ENV PATH="/usr/local/openssl/bin:$PATH"
ENV LD_LIBRARY_PATH="/usr/local/openssl/lib"
ENV PKG_CONFIG_PATH="/usr/local/openssl/lib/pkgconfig"

# Verify the installed OpenSSL version
RUN openssl version


COPY --from=buildContainer /app/package.json /app

ENV NODE_OPTIONS --max-old-space-size=16384
RUN npm i firebase --legacy-peer-deps
RUN npm install pm2@latest -g

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist

EXPOSE 4000

ENV NODE_ENV=production
CMD ["pm2-runtime", "dist/server/main.js"]