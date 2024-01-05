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
        const removeFields = ['location','page']

        removeFields.forEach((el) => delete queryStringCopy[el]) // delete the fields from the query

        this.query = this.query.find(queryStringCopy);

        return this;
    }

    pagination(resultsPerPage: number): ApiFilters{
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage * (currentPage -1); // skip the first 5 results

        this.query = this.query.limit(resultsPerPage).skip(skip)

        return this;
    }
}

export default ApiFilters;