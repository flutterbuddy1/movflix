import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export class TMDbService {
  constructor(apiKey = TMDB_API_KEY) {
    this.apiKey = apiKey;
    this.api = axios.create({
      baseURL: BASE_URL,
      params: {
        api_key: this.apiKey,
      },
    });
  }

  // ---------------------------
  // 🔐 AUTH
  // ---------------------------
  async getRequestToken() {
    const res = await this.api.get('/authentication/token/new');
    return res.data.request_token;
  }

  getAuthenticationUrl(requestToken, redirectTo = null) {
    let url = `https://www.themoviedb.org/authenticate/${requestToken}`;
    if (redirectTo) url += `?redirect_to=${encodeURIComponent(redirectTo)}`;
    return url;
  }

  async createSession(requestToken) {
    const res = await this.api.post('/authentication/session/new', {
      request_token: requestToken,
    });
    return res.data.session_id;
  }

  async getAccount(sessionId) {
    const res = await this.api.get('/account', {
      params: { session_id: sessionId },
    });
    return res.data;
  }

  // ---------------------------
  // 🎬 MOVIES & TV
  // ---------------------------
  async getMovieDetails(movieId) {
    const res = await this.api.get(`/movie/${movieId}`);
    return res.data;
  }

  async getTVDetails(tvId) {
    const res = await this.api.get(`/tv/${tvId}`);
    return res.data;
  }

  async getPopularShows(page = 1) {
    const res = await this.api.get('/tv/popular', { params: { page } });
    return res.data.results;
  }

  async getPopularMovies(page = 1) {
    const res = await this.api.get('/movie/popular', { params: { page } });
    return res.data.results;
  }

  async getTopRatedMovies(page = 1) {
    const res = await this.api.get('/movie/top_rated', { params: { page } });
    return res.data.results;
  }

  async getTrending(mediaType = 'all', timeWindow = 'day') {
    const res = await this.api.get(`/trending/${mediaType}/${timeWindow}`);
    return res.data.results;
  }

  // ---------------------------
  // 🔎 SEARCH
  // ---------------------------
  async search(query, type = 'multi', page = 1) {
    const res = await this.api.get(`/search/${type}`, {
      params: {
        query,
        page,
      },
    });
    return res.data.results;
  }

  // ---------------------------
  // 🖼️ IMAGE BUILDER
  // ---------------------------
  getImageUrl(path, size = 'w500') {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }

  // ---------------------------
  // ❤️ FAVORITES & WATCHLIST
  // ---------------------------
  async markFavorite(accountId, sessionId, mediaType, mediaId, favorite = true) {
    const res = await this.api.post(`/account/${accountId}/favorite`, {
      media_type: mediaType,
      media_id: mediaId,
      favorite,
    }, {
      params: { session_id: sessionId },
    });

    return res.data;
  }

  async addToWatchlist(accountId, sessionId, mediaType, mediaId, watchlist = true) {
    const res = await this.api.post(`/account/${accountId}/watchlist`, {
      media_type: mediaType,
      media_id: mediaId,
      watchlist,
    }, {
      params: { session_id: sessionId },
    });

    return res.data;
  }
}