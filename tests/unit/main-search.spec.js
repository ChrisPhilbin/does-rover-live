import { mount, shallowMount } from "@vue/test-utils";
import MainSearch from "../../src/components/search/MainSearch.vue";

const $store = {
  state: {
    loadingMovies: false,
    movieTitles: [],
    loadedMovies: false,
    loadingTrending: false,
    trendingTitles: [],
  },
  commit: jest.fn(),
};
const globalConfig = {
  global: {
    mocks: {
      $store,
    },
  },
};

describe("Main presentational search component", () => {
  it("Should contain the title of the app - Does Rover Live?", async () => {
    const wrapper = mount(MainSearch, globalConfig);

    expect(wrapper.text()).toContain("Does Rover Live?");
  });
});
