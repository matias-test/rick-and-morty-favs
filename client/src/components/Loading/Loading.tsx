import React, { PropsWithChildren } from 'react';

interface LoadingProps {
  loading: boolean;
  error: string | null;
}

export default function Loading ({ loading, error, children }: PropsWithChildren<LoadingProps>) {
  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
}
