import supabase from "./supabase";

const API = "https://dummyjson.com/products";

//Fetch user by email and password
export async function fetchusers(email, password) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error) throw error;

  return data;
}

export const fetchProductsByLimit = async (limit, skip) => {
  try {
    const res = await fetch(`${API}?limit=${limit}&skip=${skip}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by query:", error);
  }
};

export const loginAPI = async (email, password) => {
  try {
    const res = await fetch(`https://reqres.in/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
