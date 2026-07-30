interface KeyableItem {
  id?: string | number;
  key?: string | number;
  [key: string]: any;
}

let keyCounter = 0;

export const generateUniqueKey = (prefix: string = 'key'): string => {
  return `${prefix}_${Date.now()}_${++keyCounter}`;
};

export const safeKeyExtractor = (
  item: KeyableItem | null | undefined, 
  index: number | undefined, 
  prefix: string = 'item'
): string => {
  // Handle null/undefined item
  if (!item) {
    if (typeof index === 'number') {
      return `${prefix}_${index}`;
    }
    return generateUniqueKey(prefix);
  }

  // Try to use item.id first (most reliable)
  if (item.id !== null && item.id !== undefined) {
    return `${prefix}_${String(item.id)}`;
  }

  // Try to use item.key as fallback
  if (item.key !== null && item.key !== undefined) {
    return `${prefix}_${String(item.key)}`;
  }

  // Use index as fallback
  if (typeof index === 'number') {
    return `${prefix}_${index}`;
  }

  // Last resort: generate unique key
  return generateUniqueKey(prefix);
};
