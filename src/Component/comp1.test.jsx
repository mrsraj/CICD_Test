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
                body: "Test Body",
            },
        ];

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockPosts),
            })
        );

        render(<CITest />);

        expect(
            await screen.findByText("Test Post")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Test Body")
        ).toBeInTheDocument();
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