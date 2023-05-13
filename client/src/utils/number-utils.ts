export const getData = async <T>(url: string, balance: number): Promise<T> => {
  const res = await fetch(url, {
    method: "Post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ balance }),
  });

  return await res.json();
};
