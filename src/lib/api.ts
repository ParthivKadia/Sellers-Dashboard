// lib/api.ts
const BASE_URL = "http://localhost:28082/api";

export const createProduct = async (username: string, data: any) => {
    const res = await fetch(`${BASE_URL}/v1/stores/${username}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to create product");
    }

    return res.json();
};