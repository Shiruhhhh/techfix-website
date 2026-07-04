import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

// Backend devolve JSON direto (sem wrapper {success,data}) e usa status HTTP
// para erros, com corpo {error: string} — ver backend/src/routes/admin/*.js.
export const errorConfig: RequestConfig = {
  errorConfig: {
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      const backendMessage = error?.info?.error || error?.data?.error;
      message.error(backendMessage || error?.message || 'Erro no pedido, tenta novamente.');
    },
  },
};
