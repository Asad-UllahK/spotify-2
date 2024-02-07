import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-modify-playback-state",
].join(",");

const params = {
  scope: scopes,
};

async function refreshAccessToken(token) {
  // code for refreshing the access token
  const params = newURLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", token.refreshToken);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: params,
  });
  const data = await response.json();
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    accessTokenExpires: Date.now() + data.expires_at * 1000,
  };
}

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refreshToken;
        token.accessTokenExpires = account.expires_at;
        return token;
      }
      // Access Token has not Expired
      if (Date.now() < token.accessTokenExpires * 1000) {
        return token;
      }
      // Access Token has expired
      return refreshAccessToken(token);
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
