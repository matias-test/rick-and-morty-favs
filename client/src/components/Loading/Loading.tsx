import React, { PropsWithChildren } from 'react';
import './Loading.scss';

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
      <div className="loading">
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
