export const requestNewIn = {
  method: "GET",
  url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
  params: { limit: "20", sort: "year:desc" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": "7aebc4d050msh595bcc168616a10p12519cjsnc5b9e3265ad0",
  },
};

export const requestShoesById = {
  method: "GET",
  url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": "7aebc4d050msh595bcc168616a10p12519cjsnc5b9e3265ad0",
  },
};

export const requestShoesByName = {
  method: "GET",
  url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
  params: { limit: "100", name: "" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": "7aebc4d050msh595bcc168616a10p12519cjsnc5b9e3265ad0",
  },
};

export const requestShoesByStyleId = {
  method: "GET",
  url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
  params: { limit: "20", shoe: "" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": "7aebc4d050msh595bcc168616a10p12519cjsnc5b9e3265ad0",
  },
};

export const requestExploreAll = {
  method: "GET",
  url: `https://v1-sneakers.p.rapidapi.com/v1/sneakers`,
  params: { limit: "26", page: "1" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": "7aebc4d050msh595bcc168616a10p12519cjsnc5b9e3265ad0",
  },
};

export const requestExploreByCategory = {
  method: "GET",
  url: `https://v1-sneakers.p.rapidapi.com/v1/sneakers`,
  params: { limit: "26", page: "1", gender: "" },
  headers: {
    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": "7aebc4d050msh595bcc168616a10p12519cjsnc5b9e3265ad0",
  },
};
