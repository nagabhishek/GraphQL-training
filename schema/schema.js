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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
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

module.exports = new GraphQLSchema({
  query: RootQuery,
});

// graphql query

/*
-------------------------------------------- Book with id ------------
{
    book(id:"1"){
        name
    }
--------------------------------------------- Author with id (GraphQLID) -----------
    author(id:1){
        name
    }
-------------------------------------------- Collection ------------
    {
        books{
            name
        }
    }
---------------------------------------- Nesting -------------
   {
  book(id:1){
    name
    category
    author{
      name
    }
  }
}
-------------------------------- Find books written by an author -------
{
  author(id:1){
    name
    books{
      name
      category
    }
  }
}
------------------------------------------
{
  trainer(id:1){
    name
    courses{
      id
      title
      likes
    }
  }
}



*/
