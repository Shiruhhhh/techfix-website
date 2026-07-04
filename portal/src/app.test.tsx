import { describe, expect, it, vi } from 'vitest';

vi.mock('@umijs/max', () => ({
  Link: ({ children }: any) => children,
}));

vi.mock('@/components', () => ({
  AvatarDropdown: () => null,
  DocLink: () => null,
  ErrorBoundary: ({ children }: any) => children,
  Footer: () => null,
  OfflineBanner: () => null,
  VersionDropdown: () => null,
}));

vi.mock('@ant-design/pro-components', () => ({
  SettingDrawer: () => null,
}));

vi.mock('@ant-design/icons', () => ({
  LinkOutlined: () => null,
}));

vi.mock('./requestErrorConfig', () => ({
  errorConfig: {},
}));

vi.mock('../config/defaultSettings', () => ({
  default: { navTheme: 'light' },
}));

describe('app getInitialState', () => {
  it('always returns an authenticated state — Cloudflare Access gates at the edge', async () => {
    const { getInitialState } = await import('./app');

    const state = await getInitialState();

    expect(state.currentUser).toBeDefined();
    expect(state.settings).toEqual({ navTheme: 'light' });
    expect(state.settingDrawerOpen).toBe(false);
  });
});
