export function filterByTitle<T extends { title: string }>(
  items: T[],
  query: string,
): T[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((item) =>
    item.title.toLowerCase().includes(normalized),
  );
}
