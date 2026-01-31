class UsersService {
  static BASE_URL = "https://localhost:7212/api/users";

  static async getAll() {
    const response = await fetch(this.BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    return response.json();
  }

  static async create(user) {
    const response = await fetch(this.BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create user");
    }

    return response.json();
  }
}

export default UsersService;
