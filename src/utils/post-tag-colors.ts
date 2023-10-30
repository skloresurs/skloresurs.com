export default function getPostTagColor(color: string) {
  switch (color) {
    case 'red':
      return 'bg-red-50 text-red-700';
    case 'orange':
      return 'bg-orange-50 text-orange-700';
    case 'amber':
      return 'bg-amber-50 text-amber-700';
    case 'yellow':
      return 'bg-yellow-50 text-yellow-700';
    case 'lime':
      return 'bg-lime-50 text-lime-700';
    case 'green':
      return 'bg-green-50 text-green-700';
    case 'emerald':
      return 'bg-emerald-50 text-emerald-700';
    case 'teal':
      return 'bg-teal-50 text-teal-700';
    case 'cyan':
      return 'bg-cyan-50 text-cyan-700';
    case 'blue':
      return 'bg-blue-50 text-blue-700';
    case 'indigo':
      return 'bg-indigo-50 text-indigo-700';
    case 'violet':
      return 'bg-violet-50 text-violet-700';
    case 'purple':
      return 'bg-purple-50 text-purple-700';
    case 'fuchsia':
      return 'bg-fuchsia-50 text-fuchsia-700';
    case 'pink':
      return 'bg-pink-50 text-pink-700';
    case 'rose':
      return 'bg-rose-50 text-rose-700';
    default:
      return '';
  }
}
