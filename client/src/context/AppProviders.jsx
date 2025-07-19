import { UserProvider } from './UserContext';

export function AppProviders({ children }) {
  console.log('AppProviders rendering'); // Debug log
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}