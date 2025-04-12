export const metadata = {
  title: 'DinoLearn Lessons',
  description: 'Interactive learning modules to help you master new concepts',
};

export default function LessonsLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 