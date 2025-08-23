export const setItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = (key: string) => {
  if (typeof window !== "undefined") {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const removeItem = (key: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};
