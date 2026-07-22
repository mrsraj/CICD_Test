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
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            }
        ];

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockPosts)
            })
        );

        render(<Posts />);
        const postTitle = await screen.findByText("Test Post");
        expect(postTitle).toBeInTheDocument();
    });

    test("handles API failure", async () => {
        global.fetch = vi.fn(() =>
            Promise.reject(
                new Error("API Failed")
            )
        );
        render(<CITest />);
        expect(fetch).toHaveBeenCalled();
    });
});