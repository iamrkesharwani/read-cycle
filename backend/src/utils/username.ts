export async function generateUsername(
  name: string,
  exists: (candidate: string) => Promise<boolean>
): Promise<string> {
  const base =
    name
      .split(' ')[0]
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '') || 'user';

  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const candidate = `${base}-${suffix}`;
    if (!(await exists(candidate))) return candidate;
  }

  return `${base}-${Date.now().toString().slice(-4)}`;
}
