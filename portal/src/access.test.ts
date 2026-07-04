import { describe, expect, it } from 'vitest';
import access from './access';

describe('access', () => {
  it('always grants canAdmin — Cloudflare Access is the only gate (1 utilizador só)', () => {
    expect(access().canAdmin).toBe(true);
  });
});
