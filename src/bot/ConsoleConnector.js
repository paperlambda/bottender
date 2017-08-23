/*
  eslint-disable class-methods-use-this
  @flow
*/
import ConsoleContext from '../context/ConsoleContext';
import ConsoleEvent, { type ConsoleRawEvent } from '../context/ConsoleEvent';
import type { Session } from '../session/Session';

import type { Connector, SessionWithUser } from './Connector';

type ConsoleRequestBody = ConsoleRawEvent;

type ConsoleUser = {
  id: string,
  name: string,
};

export type ConsoleSession = SessionWithUser<ConsoleUser>;

export default class ConsoleConnector
  implements Connector<ConsoleRequestBody, ConsoleUser> {
  get platform(): string {
    return 'console';
  }

  getUniqueSessionIdFromRequest(): string {
    return '1';
  }

  shouldSessionUpdate(session: Session): boolean {
    return !session.user;
  }

  async updateSession(session: Session): Promise<void> {
    session.user = {
      id: '1',
      platform: 'console',
      name: 'you',
    };
  }

  mapRequestToEvents(body: ConsoleRequestBody): Array<ConsoleEvent> {
    return [new ConsoleEvent(body)];
  }

  createContext({
    event,
    session,
  }: {
    event: ConsoleEvent,
    session: ?ConsoleSession,
  }) {
    return new ConsoleContext({
      event,
      session,
    });
  }
}
