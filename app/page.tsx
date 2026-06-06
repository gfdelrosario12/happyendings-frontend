'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background text-center px-4">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
        <ShieldAlert className="h-10 w-10 text-destructive" />
      </div>
      <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Access Denied</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        You don&apos;t have the necessary permissions to view this page. Please contact an administrator if you believe this is an error.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full shadow-sm">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}