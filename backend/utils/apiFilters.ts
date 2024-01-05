class ApiFilters {
    query: any;
    queryStr: any;

    constructor(query: any, queryStr: any){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(): ApiFilters{ 
        const location = this.queryStr?.location ? {
            address: {
                $regex : this.queryStr.location,
                $options: 'i' // case insensitive
            }
        } : {};

        this.query = this.query.find({...location});
        return this; // return the entire object
    }

    filter(): ApiFilters{
        const queryStringCopy = { ...this.queryStr}
        // remove fields from the query
        const removeFields = ['location']

        removeFields.forEach((el) => delete queryStringCopy[el]) // delete the fields from the query

        this.query = this.query.find(queryStringCopy);

        return this;
    }
}

export default ApiFilters;