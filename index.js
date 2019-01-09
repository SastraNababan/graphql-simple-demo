const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const authors = [
  {
    id: "1",
    name: "Joe Kelly",
    socialMedia: {
      fb: "fb.com/jk",
      ig: "@jk"
    }
  }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    totalPhotos: Int
    books: [Book]
    author: [Author]
  }

  type Mutation {
    createAuthor(name: String!, age: Int): Author
  }

  type Book {
    """
    the list of Posts by this author
    """
    title: String

    """
    name of author
    """
    author: String
  }

  type Launch {
    id: ID
    name: String
    missionPatch: String
  }

  type Author {
    id: ID
    name: String
    socialMedia: AuthorInfo
  }
  type AuthorInfo {
    fb: String
    ig: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello world!";
    },
    totalPhotos: () => 42,
    books: () => books,
    author: () => authors
  },
  Mutation: {
    createAuthor: (obj, args) => {
      const id = String(authors.length + 1); // Generate new author id
      const { fb, ig } = args;
      const newAuthor = {
        id,
        info: {
          fb,
          ig
        }
      };
      authors.push(newAuthor);
      return newAuthor;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
