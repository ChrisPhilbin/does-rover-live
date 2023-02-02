import { mount } from "@vue/test-utils";
import SearchForm from "../../src/components/search/SearchForm.vue";

const $store = {
  state: {
    loadingMovies: false,
    errors: false,
  },
  commit: jest.fn(),
  dispatch: jest.fn(),
};
const globalConfig = {
  global: {
    mocks: {
      $store,
    },
  },
};

describe("Core search functionality", () => {
  it("Should contain an input HTML element", async () => {
    const wrapper = mount(SearchForm, globalConfig);

    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("Should show an error message if no movie title is provided.", async () => {
    const wrapper = mount(SearchForm, globalConfig);

    const form = wrapper.find("form");

    await form.trigger("submit");

    const text = wrapper.find("span");

    expect(text.text()).toContain("Must provide a movie title.");
  });

  it("Should show an icon indicating that movies are being loaded.", async () => {
    const wrapper = mount(SearchForm, globalConfig);

    $store.state.loadingMovies = true;

    const loadingIcon = wrapper.find("svg");

    expect(loadingIcon.exists()).toBe(true);
  });

  it("Should dispatch fetchMovies to the Vuex store.", async () => {
    const wrapper = mount(SearchForm, globalConfig);

    const input = wrapper.find("input");

    input.setValue("twister");

    const form = wrapper.find("form");

    await form.trigger("submit");

    expect($store.dispatch).toHaveBeenCalled();
  });
});
