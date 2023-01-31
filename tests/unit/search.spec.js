import { shallowMount } from "@vue/test-utils";
import SearchForm from "../../src/components/search/SearchForm.vue";

describe("Search functionality", () => {
  it("Should contain an input HTML element", async () => {
    const $store = {
      state: {
        loadingMovies: false,
        errors: false,
      },
      commit: jest.fn(),
    };
    const wrapper = shallowMount(SearchForm, {
      global: {
        mocks: {
          $store,
        },
      },
    });

    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("Should show an error message if no movie title is provided.", async () => {
    const $store = {
      state: {
        loadingMovies: false,
        errors: false,
      },
      commit: jest.fn(),
    };
    const wrapper = shallowMount(SearchForm, {
      data: {
        showBlankWarning: true,
      },
      global: {
        mocks: {
          $store,
        },
      },
    });

    expect(wrapper.text()).toContain("Must provide a movie title.");
  });
});
