class APIFeatures {
    constructor(query, queryString){
        // console.log(query , queryString);
        this.query = query;
        this.queryString = queryString;
    }
    //--- FILTRING METHODE
    filter(){
        //-----BUILD QUERY
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);
        // console.log("queryObj",queryObj)
        //--- ADVANCED QUERY FILTRNG
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        // console.log("queryStr",queryStr);
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }
    //--- SHORTING METHODE
    sortt(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(",").join(" ");
            // console.log("sortt => ",sortBy);
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }
    //--- FIELDS LIMITING
    limitFields(){
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
        //  console.log("limitFields=>",fields);
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }
    //--- PAGINATION FUNCTION
    pagination(){
        const page = this.queryString.page * 1 || 1 ;
        const limit = this.queryString.limit * 1 || 10 ;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}


module.exports = APIFeatures;