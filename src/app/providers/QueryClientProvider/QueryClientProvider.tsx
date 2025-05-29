import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "react-query";

export const queryClient = new QueryClient();

export const QueryClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProviderBase client={queryClient}>
      {children}
    </QueryClientProviderBase>
  );
};
