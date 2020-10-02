const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://hernri01:Capstone2020@cluster0.3ln2m.mongodb.net/test?authSource=admin&replicaSet=atlas-9q0n4l-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true&useUnifiedTopology=true";
const client = new MongoClient(uri);

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await listDatabases(client);
        await showTable(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
}

//This will list the databases.
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

/**This function fetches the data in the Collection 'test' and others as well. */
async function showTable(client)
{
    console.log("Finding stuff");
    dbo = client.db('test').collection('Roster').find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
      });
    
};

main().catch(console.error);