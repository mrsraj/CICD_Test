import { useEffect, useState } from "react";

function CITest() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts?_limit=10"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <h2 className="text-2xl font-semibold text-blue-600 animate-pulse">
                    Loading...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <h2 className="rounded-lg bg-red-100 px-6 py-3 text-xl font-semibold text-red-600">
                    {error}
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="mx-auto max-w-4xl px-4">
                <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
                    React CI Demo
                </h1>

                <div className="space-y-5">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"
                        >
                            <h3 className="mb-3 text-xl font-semibold capitalize text-gray-800">
                                {post.title}
                            </h3>

                            <p className="leading-7 text-gray-600">
                                {post.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CITest;