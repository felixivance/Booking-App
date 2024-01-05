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
}

export default ApiFilters;