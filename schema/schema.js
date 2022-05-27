const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

//dummy data
var courseList = [
  {
    id: 1,
    title: 'React',
    price: 5000,
    likes: 400,
    rating: 5,
    imageUrl:
      'https://ms314006.github.io/static/b7a8f321b0bbc07ca9b9d22a7a505ed5/97b31/React.jpg',
    trainerId: 1,
  },
  {
    id: 2,
    title: 'Redux',
    price: 4000,
    likes: 600,
    rating: 5,
    imageUrl: 'https://logicalidea.co/wp-content/uploads/2020/05/Redux.jpg',
    trainerId: 1,
  },
  {
    id: 3,
    title: 'Node',
    price: 6000,
    likes: 900,
    rating: 4,
    imageUrl:
      'https://www.cloudsavvyit.com/p/uploads/2019/07/2350564e.png?width=1198&trim=1,1&bg-color=000&pad=1,1',
    trainerId: 2,
  },
  {
    id: 4,
    title: 'Angular',
    price: 5000,
    likes: 200,
    rating: 3,
    imageUrl:
      'https://bs-uploads.toptal.io/blackfish-uploads/blog/post/seo/og_image_file/og_image/15991/top-18-most-common-angularjs-developer-mistakes-41f9ad303a51db70e4a5204e101e7414.png',
    trainerId: 3,
  },
  {
    id: 5,
    title: 'Flutter',
    price: 7000,
    likes: 700,
    rating: 4,
    imageUrl: 'https://miro.medium.com/max/2000/1*PCKC8Ufml-wvb9Vjj3aaWw.jpeg',
    trainerId: 1,
  },
];

var trainersList = [
  { id: 1, name: 'Sumeet Wajpe', age: 38, isMCT: true },
  { id: 2, name: 'Gulshan Sachdev', age: 45, isMCT: false },
  { id: 3, name: 'Rachana Ranade', age: 32, isMCT: true },
];

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

const CourseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    price: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    likes: { type: GraphQLInt },
    imageUrl: { type: GraphQLString },
    trainer: {
      type: TrainerType,
      resolve(parent, args) {
        return trainersList.find((t) => t.id == parent.trainerId);
      },
    },
  }),
});

const TrainerType = new GraphQLObjectType({
  name: 'Trainer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    isMCT: { type: GraphQLBoolean },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return courseList.filter((course) => course.trainerId === parent.id);
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
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return booksList.filter((book) => book.authorId === parent.id);
      },
    },
  }),
});

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authorsList;
      },
    },
    course: {
      type: CourseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data (from database)
        return courseList.find((c) => c.id == args.id);
      },
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return courseList;
      },
    },
    trainer: {
      type: TrainerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data (from database)
        return trainersList.find((t) => t.id == args.id);
      },
    },
    trainers: {
      type: new GraphQLList(TrainerType),
      resolve(parent, args) {
        return trainersList;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let newAuthor = {
          id: args.id,
          name: args.name,
          age: args.age,
        };
        authorsList.push(newAuthor);
        console.log(authorsList.length);
        return newAuthor;
      },
    },
    addBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let newBook = {
          id: args.id,
          name: args.name,
          category: args.category,
          authorId: args.authorId,
        };
        booksList.push(newBook);
        return newBook;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery, //Fetching record
  mutation: Mutation, // Adding new record
});

// graphql query

/*
--------------------------Book with id-------------------------------
{
    book(id:"1"){
      name
    }
}
--------------------------Author with id (GraphQLID)-----------------  
{
  author(id:1){
    name
  }
}
---------------------------Collection--------------------------------
{
  books{
      name
  }
}
---------------------------Nesting-----------------------------------
{
  book(id:1){
    name
    category
    author{
      name
    }
  }
}
--------------------------Find books written by an author------------
{
  author(id:1){
    name
    books{
      name
      category
    }
  }
}
--------------------------Mutation (Add Trainer)-------------------
mutation{
  trainer(id:1){
    name
    courses{
      id
      title
      likes
    }
  }
}
--------------------------Mutation (Add Author)--------------------
mutation{
  addAuthor(id:5,name:"Sudha Murty",age:60){
    name
    age
  }
}

--------------------------Mutation (Add Book)-----------------------
mutation{
  addBook(id:4,name:"Three Thousand Stitches",category:"Inspirational",authorId:"5"){
    name
  }
}

*/
