const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = graphql;

//dummy data
var booksList = [
  {
    id: '1',
    name: 'Wings Of Fire',
    category: 'Autobiography',
    authorId: '1',
  },
  {
    id: '2',
    name: 'India 2020',
    category: 'Inspirational',
    authorId: '1',
  },
  {
    id: '3',
    name: 'Mrutyunjay',
    category: 'Inspirational',
    authorId: '2',
  },
];
var authorsList = [
  { id: '1', name: 'Dr. APJ Abdul Kalam', age: 70 },
  { id: '2', name: 'Shivaji Sawant', age: 75 },
  { id: '3', name: 'Ranjit Desai', age: 50 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return authorsList.find((a) => a.id == parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data (from database)
        // console.log(typeof args.id);
        return booksList.find((b) => b.id == args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return booksList;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data (from database)
        // console.log(typeof args.id);
        return authorsList.find((b) => b.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

// graphql query

/*
// query
//1.
{
  book(id:"1"){
    name   
  }
}
// 2.
{
  book(id:"1"){
    name
    category
    id
  }
}

*/
