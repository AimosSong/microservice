#设置基础镜像
FROM alpine:edge
#装nodejs环境
RUN echo '@edge http://nl.alpinelinux.org/alpine/edge/main' >> /etc/apk/repositories
RUN apk add --no-cache nodejs-lts@edge
#创建应用
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#安装项目依赖
COPY package.json /usr/src/app
RUN npm install
#拷项目文件
COPY . /usr/src/app
#从Docker内部释放端口
EXPOSE 8083
CMD [ "npm", "start" ]