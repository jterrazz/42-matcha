import io from "socket.io-client";

class MatchaSocket {
  constructor(url) {
    this.client = io(url);
  }

  onMessage(cb) {
    this.client.on('MESSAGE', msg => cb(msg))
  }

  onNotification(cb) {
    this.client.on('NOTIFICATION', notif => cb(notif))
  }
}

export default new MatchaSocket("localhost:3000");
