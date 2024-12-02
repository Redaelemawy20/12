interface URLs {
  discover: (limit?: number) => string;
  search: (query: string) => string;
}

const urls: URLs = {
  discover: (limit = 20): string =>
    `https://www.freetestapi.com/api/v1/movies?limit=${limit}`,
  search: (query: string): string =>
    `https://freetestapi.com/api/v1/movies?search=${query}`,
};

export default urls;
