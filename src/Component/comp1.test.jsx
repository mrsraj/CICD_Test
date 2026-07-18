import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import CITest from "./comp1";

describe("Posts Component", () => {


  test("shows loading initially", () => {

    render(<CITest />);

    expect(
      screen.getByText("Loading...")
    ).toBeInTheDocument();

  });

  test("displays posts after API response", async () => {

    const mockPosts = [
      {
        id: 1,
        title: "Test Post",
        body: "This is a test body"
      }
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPosts)
      })
    );

    render(<Posts />);
    const postTitle = await screen.findByText("Test Post");
    expect(postTitle).toBeInTheDocument();});

  test("handles API failure", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(
        new Error("API Failed")
      )
    );
    render(<Posts />);
    expect(fetch).toHaveBeenCalled();
  });
});