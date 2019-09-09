'use strict';

importScripts(
  'test-helpers.js',
  'messaging-helpers.js'
);

self.addEventListener('connect', connect_event => {
  const message_port = connect_event.ports[0];
  add_message_event_handlers(message_port, message_port);
  message_port.start();
});