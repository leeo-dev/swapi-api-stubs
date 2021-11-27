const Service = require("./service");
const sinon = require("sinon");
const BASE_URL_1 = "https://swapi.dev/api/planets/1";
const BASE_URL_2 = "https://swapi.dev/api/planets/2";
const { deepStrictEqual } = require("assert");
const mocks = {
  tatooine: require("./mocks/tatooine.json"),
  alderaan: require("./mocks/alderaan.json"),
};
(async () => {
  // const service = new Service();
  // const responseWithoutStub = await service.makeRequest(BASE_URL_2);
  // console.log(JSON.stringify(responseWithoutStub));

  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);
  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);
  {
    const result = await service.getPlanets(BASE_URL_1);
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    };
    deepStrictEqual(result, expected);
  }
  {
    const result = await service.getPlanets(BASE_URL_2);
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    };
    deepStrictEqual(result, expected);
  }
})();
