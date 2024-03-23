export const requestNewIn = {
  method: "GET",
  url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
  params: { limit: "20", sort: "year:desc" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const requestShoesById = {
  method: "GET",
  url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const requestShoesByName = {
  method: "GET",
  url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
  params: { limit: "100", name: "" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const requestShoesByStyleId = {
  method: "GET",
  url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
  params: { limit: "20", shoe: "" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const requestExploreAll = {
  method: "GET",
  url: `https://v1-sneakers.p.rapidapi.com/v1/sneakers`,
  params: { limit: "26", page: "1" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const requestExploreByCategory = {
  method: "GET",
  url: `https://v1-sneakers.p.rapidapi.com/v1/sneakers`,
  params: { limit: "26", page: "1", gender: "" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  },
};
