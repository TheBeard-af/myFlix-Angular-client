// Movie interface
export interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: {
    name: string;
    description: string;
  };
  director: {
    name: string;
    bio: string;
    birthdate: string;
  };
  imageUrl: string;
  featured: boolean;
}

// User interface
export interface User {
  _id: string;
  Username: string;
  Email: string;
  Birthday?: string;
  FavoriteMovies: string[];
}

// Auth (login / register) response
export interface AuthResponse {
  user: User;
  token: string;
}