import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { setupServer } from "msw/node";

export const server = setupServer();

export const getTestRouter =
  (location: string = "/") =>
  (memoryRouterProps: any) =>
    (
      <MemoryRouter
        initialEntries={[location]}
        initialIndex={0}
        {...memoryRouterProps}
      />
    );

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
      staleTime: 0,
    },
  },
});

export function ThemeWrapper({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
