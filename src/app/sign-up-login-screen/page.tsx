import React from 'react';
import AuthForm from './components/AuthForm';
import AuthBranding from './components/AuthBranding';

export default function SignUpLoginPage() {
  return (
    <div className="min-h-screen flex">
      <AuthBranding />
      <AuthForm />
    </div>
  );
}
