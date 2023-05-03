import createApiClient from "./api.service";

class BookService {
  constructor(baseUrl = "/api/book") {
    this.api = createApiClient(baseUrl);
  }
  async getAllBooks() {
    return (await this.api.get("/")).data;
  }
  async getBookById(id) {
    return (await this.api.get(`${id}`)).data;
  }
  async createBook(data) {
    return (await this.api.post("/", data)).data;
  }
  async updateBook(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
}

export default new BookService();
