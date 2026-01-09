// Movie interface
export interface Movie {
  _id: string;
  Title: string;
  Description: string;
  Genre: {
    Name: string;
    Description: string;
  };
  Director: {
    Name: string;
    Bio: string;
    Birth: string;
  };
  ImagePath: string;
  Featured: boolean;
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