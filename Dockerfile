FROM local-dtr.zhihuiya.com/lifescience/blast-base

RUN mkdir -p /usr/dist
WORKDIR /usr/app
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --production --registry=https://registry.npm.taobao.org
RUN cp -a /tmp/node_modules /usr/app
ADD src /usr/app
RUN ls -l
EXPOSE 3000
CMD node app.js
