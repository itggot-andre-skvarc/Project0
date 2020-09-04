FROM arm32v6/ruby:2.6.6-alpine3.12
WORKDIR /usr/share/nginx/project0
COPY bin .
RUN ls
RUN gem install bundler
CMD rake production
