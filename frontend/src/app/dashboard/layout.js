export const metadata = {
  title: 'DinoLearn Dashboard',
  description: 'Your personalized learning dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 