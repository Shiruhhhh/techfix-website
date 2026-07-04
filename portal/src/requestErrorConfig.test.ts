import { message } from 'antd';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { errorConfig } from './requestErrorConfig';

vi.mock('antd', () => ({
  message: {
    error: vi.fn(),
  },
}));

describe('requestErrorConfig', () => {
  // biome-ignore lint/style/noNonNullAssertion: config handlers are always defined
  const errorHandler = errorConfig.errorConfig!.errorHandler!;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rethrows when skipErrorHandler is true', () => {
    const error = new Error('Test error');
    expect(() => errorHandler(error, { skipErrorHandler: true })).toThrow('Test error');
  });

  it('shows the backend error message from error.info.error', () => {
    const error: any = new Error('Request failed');
    error.info = { error: 'brandId inválido' };

    errorHandler(error, {});

    expect(message.error).toHaveBeenCalledWith('brandId inválido');
  });

  it('shows the backend error message from error.data.error', () => {
    const error: any = new Error('Request failed');
    error.data = { error: 'id já existe' };

    errorHandler(error, {});

    expect(message.error).toHaveBeenCalledWith('id já existe');
  });

  it('falls back to error.message when no backend error is present', () => {
    const error = new Error('Network down');

    errorHandler(error, {});

    expect(message.error).toHaveBeenCalledWith('Network down');
  });

  it('falls back to a generic message when nothing is available', () => {
    const error: any = {};

    errorHandler(error, {});

    expect(message.error).toHaveBeenCalledWith('Erro no pedido, tenta novamente.');
  });
});
