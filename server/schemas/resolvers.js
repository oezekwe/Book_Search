const {User}= require('../models/index')
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers= {
    Query: {
        me: async (parents, args, context)=>{
            if(context.user){
                const userData= await User.findOne({_id: context.user._id});
                return userData;
            }
            throw new AuthenticationError("Not login");
        }
    },
    Mutation: {
        login: async (parent, { email, password })=> {
            const user= await User.findOne({ email });

            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const TypedPassword= await user.isCorrectPassword(password);
          
            if (!TypedPassword) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token= signToken(user);
            return { token, user };
        },
        addUser: async (parent, args)=> {
            const user= await User.create(args);
            const token= signToken(user);

            return {token,user};
        },
        saveBook: async (parent, bookData, context)=> {
            if(context.user){
                const updatedUser= await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {saveBooks: bookData}},
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
        },
        removeBook: async (parent, bookId, context)=> {
            if(context.user){
                const updatedUser= await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {saveBooks: {bookID: bookId}}},
                    { new: true}
                );
                return updatedUser;
            }
        }
    }
};

module.exports = resolvers;