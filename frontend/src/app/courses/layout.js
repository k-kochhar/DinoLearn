export const metadata = {
  title: 'DinoLearn Courses',
  description: 'Interactive learning experiences that help you master new skills',
};

export default function CoursesLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 