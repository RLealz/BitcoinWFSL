import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

export type JwtPayload = Record<string, unknown> & { iat?: number; exp?: number };

const base64url = (input: Buffer | string) => Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
const base64urlDecode = (input: string) => Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString();

export function signJwt(payload: JwtPayload, secret: string, expiresInSeconds = 60 * 60 * 24 * 7) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const fullPayload = { ...payload, iat, exp };
  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(fullPayload));
  const data = `${headerB64}.${payloadB64}`;
  const sig = createHmac('sha256', secret).update(data).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${data}.${sig}`;
}

export function verifyJwt(token: string, secret: string): JwtPayload | null {
  try {
    const [headerB64, payloadB64, signature] = token.split('.');
    if (!headerB64 || !payloadB64 || !signature) return null;
    const data = `${headerB64}.${payloadB64}`;
    const expected = createHmac('sha256', secret).update(data).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    if (expected !== signature) return null;
    const json = base64urlDecode(payloadB64);
    const payload = JSON.parse(json) as JwtPayload;
    if (typeof payload.exp === 'number' && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt:${salt.toString('hex')}:${hash.toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [algo, saltHex, hashHex] = stored.split(':');
    if (algo !== 'scrypt' || !saltHex || !hashHex) return false;
    const salt = Buffer.from(saltHex, 'hex');
    const hash = Buffer.from(hashHex, 'hex');
    const test = scryptSync(password, salt, hash.length);
    return timingSafeEqual(hash, test);
  } catch {
    return false;
  }
}