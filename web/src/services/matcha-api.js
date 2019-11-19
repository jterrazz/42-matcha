import axios from "axios";

class MatchaAPI {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/dummy-api"
    });
  }

  /*
   * Auth routes
   */

  async login(credentials) {
    return await this.api.get("/auth/login.json");
  }

  async register(credentials) {
    return await this.api.get("/auth/login.json");
  }

  /*
   * Profile routes
   */

  async getUser(username) {
    return await this.api.get(`/users/${username}.json`);
  }

  async getMe() {
    return await this.api.get("/me.json");
  }

  async getMyLikes() {
    return await this.api.get("/me/likes.json");
  }

  async getMyViews() {
    return await this.api.get("/me/views.json");
  }

  async getMyContacts() {
    return await this.api.get("/me/contacts.json");
  }

  async getMessages(username) {
    return await this.api.get(`/messages/${username}.json`);
  }

  /*
   * Search routes
   */

  async getSuggestions(params) {
    return await this.api.get(`/suggestions.json`);
  }

  async search(params) {
    return await this.api.get(`/suggestions.json`);
  }
}

export default new MatchaAPI();
