import { useState, useEffect } from 'react';

export function useJsonData<T>(path: string, key?: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch ${path}`);
        return res.json();
      })
      .then(json => {
        setData(key ? json[key] : json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [path, key]);

  return { data, loading, error };
}
