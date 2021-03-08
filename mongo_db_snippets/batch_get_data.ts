async function batch_get_data(skip:number,limit:number){
    const collection = client.db(db_main).collection("collection_name");
    const getDataAsArray = collection.find().skip(skip).limit(limit).project({_id:0}).toArray()
    return data
}