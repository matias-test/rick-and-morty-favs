import React from 'react';
import './ErrorMessage.scss'

export default function ErrorMessage({ error, className }: { error: string, className?: string }) {
  return (
    <small className={`error-message ${className}`}>{error}</small>
  );
}
