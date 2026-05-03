import { BookOpen } from 'lucide-react';

const NotFoundState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
      <div className="p-4 rounded-full bg-slate-100">
        <BookOpen className="text-slate-400" size={28} />
      </div>
      <h2 className="text-lg font-bold text-slate-800">Listing not found</h2>
      <p className="text-sm text-slate-500">
        This book may have been removed or does not exist.
      </p>
    </div>
  );
};

export default NotFoundState;
