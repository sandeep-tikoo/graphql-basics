const Query = {
    me(parent,args,ctx,info)    {
        if (args.id === '1')   {
            return {
                id: 1,
                name: 'Sandeep Tikoo',
                email: 'san.tik@example.com',
                age: 28
            }
        } else  {
            return {
                id: 'default id',
                name: 'Sandeep Tikoo',
                email: 'san.tik@example.com',
                age: 28
            }
        }
    },
    post(parent,args,ctx,info)    {
        return {
            id: uuid(),
            title: 'Heya!',
            body: 'How are you doing today?',
            published: true,
            author: User
        }
    },
    users(parent,args,ctx,info) {
        if (!args.query) {
            return ctx.db.users   //since we are now getting users property in ctx.db, hence using ctx.db.users earlier it was just users when users array was part of index.js
        }
        return ctx.db.users.filter((user)   =>  {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
        // return users
    },
    posts(parent,args,{ db },info) {
        if (!args.query) {
            return db.posts
        }
        return db.posts.filter((post)   =>  {
            // return post.title.toLowerCase().includes(args.query.toLowerCase())
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch  = post.body.toLowerCase().includes(args.query.toLowerCase())
            console.log(isTitleMatch)
            return isTitleMatch || isBodyMatch
        })
        // return users
    },
    comments(parent,args,{ db },info)    {
        if (!args.query) {
            return db.comments
        }
        return db.comments.filter((comment)   =>  {
            return comment.text.toLowerCase().includes(args.query.toLowerCase())
        }) 
        
    }
}

export { Query as default}