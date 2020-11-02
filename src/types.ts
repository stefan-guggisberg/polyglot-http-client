/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

export type ALPNProtocol = 'h2' | 'h2c' | 'http/1.1' | 'http/1.0';

export interface Http1Options {
  /**
   * Keep sockets around in a pool to be used by other requests in the future.
   * @default false
   */
  keepAlive?: boolean;
  /**
   * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive.
   * Only relevant if keepAlive is set to true.
   * @default 1000
   */
  keepAliveMsecs?: number;
  /**
   * Maximum number of sockets to allow per host.
   * @default Infinity
   */
  maxSockets?: number;
  /**
   * Maximum number of sockets allowed for all hosts in total. Each request will use a new socket until the maximum is reached.
   * @default Infinity
   */
  maxTotalSockets?: number;
  /**
   * Maximum number of sockets to leave open in a free state. Only relevant if keepAlive is set to true.
   * @default 256
   */
  maxFreeSockets?: number;
  /**
   * Socket timeout in milliseconds. This will set the timeout when the socket is connected.
   */
  timeout?: number;
  /**
   * Scheduling strategy to apply when picking the next free socket to use.
   * @default 'fifo'
   */
  scheduling?: 'fifo' | 'lifo';
  /**
   * (HTTPS only)
   * If not false, the server certificate is verified against the list of supplied CAs. An 'error' event is emitted if verification fails; err.code contains the OpenSSL error code.
   * @default true
   */
  rejectUnauthorized?: boolean;
  /**
   * (HTTPS only)
   * Maximum number of TLS cached sessions. Use 0 to disable TLS session caching.
   * @default 100
   */
  maxCachedSessions?: number;
}

export interface Response {
  statusCode: number;
  httpVersion: string;
  httpVersionMajor: number;
  httpVersionMinor: number;
  headers: NodeJS.Dict<string | string[]>;
  readable: NodeJS.ReadableStream;
};

export type PushPromiseHandler = (
  url: string,
	reject: () => void
) => void;

export type PushHandler = (
  url: string,
  response: Response
) => void;

export interface Http2Options {
  enablePush?: boolean;
  /**
   * Max idle time in milliseconds after which a session will be automatically closed. 
   * @default 5 * 60 * 1000
   */
  idleSessionTimeout?: number;
  pushPromiseHandler?: PushPromiseHandler;
  pushHandler?: PushHandler;
  /**
   * Max idle time in milliseconds after which a pushed stream will be automatically closed. 
   * @default 5000
   */
  pushedStreamIdleTimeout?: number;
};

export interface ContextOptions {
	userAgent?: string;
	overwriteUserAgent?: boolean;
  alpnProtocols?: ReadonlyArray< ALPNProtocol >;
  h1?: Http1Options;
  h2?: Http2Options;
};