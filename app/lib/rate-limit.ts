type Counter = { count: number; resetAt: number };
const store = new Map<string, Counter>();

export function rateLimit(ip: string, windowMs: number, max: number) {
  const now = Date.now();
  const current = store.get(ip);
  if (!current || current.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 } as const;
  }
  if (current.count < max) {
    current.count += 1;
    return { allowed: true, remaining: max - current.count } as const;
  }
  return { allowed: false, remaining: 0 } as const;
}