FROM node:10.15.3-stretch

WORKDIR /app

# Install Python 2 and native build tools required by older Gatsby dependencies.
RUN apt-get install -y --no-install-recommends \
    python \
    make \
    g++ \
    git \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

VOLUME ["/app/public"]

CMD ["npm", "run", "build"]
