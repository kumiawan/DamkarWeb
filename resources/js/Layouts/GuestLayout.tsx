import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen grid justify-center items-center sm:flex sm:justify-around sm:items-center">
      {children}
    </div>
  );
}
