import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';

export type ServerToClientEvents = {
  'disaster:new': (data: any) => void;
  'disaster:update': (data: any) => void;
  'alert:new': (data: any) => void;
  'responder:status': (data: any) => void;
  'monitor:update': (data: any) => void;
};

export type ClientToServerEvents = {
  'subscribe:region': (region: string) => void;
  'subscribe:event': (eventId: string) => void;
  'unsubscribe:region': (region: string) => void;
  'unsubscribe:event': (eventId: string) => void;
};

export function createSocketServer(httpServer: HTTPServer) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle region subscriptions
    socket.on('subscribe:region', (region) => {
      socket.join(`region:${region}`);
    });

    socket.on('unsubscribe:region', (region) => {
      socket.leave(`region:${region}`);
    });

    // Handle event subscriptions
    socket.on('subscribe:event', (eventId) => {
      socket.join(`event:${eventId}`);
    });

    socket.on('unsubscribe:event', (eventId) => {
      socket.leave(`event:${eventId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}

// Export function to emit events
export function emitDisasterUpdate(io: Server, data: any) {
  io.emit('disaster:update', data);
}