export const setLocalStorage = (key: string, value: any) => {
  if (value && typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const isJsonParseAble = (data: any) => {
  try {
    if (JSON.parse(data)) {
      return true;
    }
  } catch {
    return false;
  }
};

export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value && isJsonParseAble(value)) {
    return JSON.parse(value);
  }
  return value;
};
