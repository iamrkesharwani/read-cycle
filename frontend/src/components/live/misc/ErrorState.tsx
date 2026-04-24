import { AlertTriangle } from 'lucide-react';

const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
      <div className="p-4 rounded-full bg-red-50">
        <AlertTriangle className="text-red-500" size={28} />
      </div>
      <h2 className="text-lg font-bold text-slate-800">Something went wrong</h2>
      <p className="text-sm text-slate-500 max-w-md">{message}</p>
    </div>
  );
};

export default ErrorState;
