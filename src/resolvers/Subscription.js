const Subscription = {
    count:  {
        subscribe(parent, args, { pubsub }, info)    {
            let count = 0
            let second = 0
            let minute = 0
            let hour = 0
            setInterval(() => {
                count++
                second++
                if (second == 60)   {
                    minute++
                    second = 0
                }
                if (minute == 60)   {
                    hour++
                    minute = 0
                }

                pubsub.publish('count', {
                    count
                })
                pubsub.publish('second', {
                    second
                })
                pubsub.publish('minute', {
                    minute
                })
                pubsub.publish('hour', {
                    hour
                })
            }, 1000);
            return pubsub.asyncIterator('count')
        }
    }
}

export { Subscription as default }