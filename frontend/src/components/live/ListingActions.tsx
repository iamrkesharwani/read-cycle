import { ArrowUpDown, Heart, Share2 } from 'lucide-react';

interface Props {
  onSwapRequest: () => void;
  onShare: () => void;
}

const ListingActions = ({ onSwapRequest, onShare }: Props) => (
  <div className="flex items-center gap-2">
    <button
      onClick={onSwapRequest}
      className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-sm font-semibold rounded-xl transition-colors"
    >
      <ArrowUpDown size={15} />
      Request swap
    </button>
    <button className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl border border-slate-200 hover:border-teal-400 hover:text-teal-600 text-slate-400 bg-white transition-colors">
      <Heart size={16} />
    </button>
    <button
      onClick={onShare}
      className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl border border-slate-200 hover:border-teal-400 hover:text-teal-600 text-slate-400 bg-white transition-colors"
    >
      <Share2 size={16} />
    </button>
  </div>
);

export default ListingActions;
