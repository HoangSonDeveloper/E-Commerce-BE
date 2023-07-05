import { MongoClient, Db, Collection, ServerApiVersion } from "mongodb";
import { EventEmitter } from "events";

export class Database extends EventEmitter {
  private password: string;
  private user: string;
  private host: string;
  private dbName: string;
  private dbClient: MongoClient | undefined;
  private databaseInstance: Db | undefined;
  private mongoProtocol = "mongodb";

  constructor(
    host: string,
    user: string,
    password: string,
    dbName: string,
    mongoProtocol?: string
  ) {
    super();

    this.host = host;
    this.user = user;
    this.password = password;
    this.dbName = dbName;

    if (mongoProtocol) {
      this.mongoProtocol = mongoProtocol;
    }
  }

  public async connect(): Promise<void> {
    if (this.dbClient) {
      console.log("Connection already exists");
      return;
    }

    if (!this.password) {
      throw new Error("Database password not found");
    }

    if (!this.user) {
      throw new Error("Database user not found");
    }

    if (!this.host) {
      throw new Error("Database host not found");
    }

    if (!this.dbName) {
      throw new Error("Database name not found");
    }

    const TWO_MINUTES_IN_MS = 2 * 60 * 1000;
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

    const connectionString = this.getConnectionString();

    console.log(`Database connection string: ${connectionString}`);

    const client = new MongoClient(connectionString, {
      maxPoolSize: 50,
      connectTimeoutMS: TWO_MINUTES_IN_MS,
      socketTimeoutMS: ONE_DAY_IN_MS,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.dbClient = await client.connect();
    console.log("Connected with database host");

    this.databaseInstance = this.dbClient.db(this.dbName);
  }

  public async disconnect() {
    if (this.dbClient) {
      console.log(`Disconnected from ${this.host}/${this.dbName}`);
      await this.dbClient.close();
    }
  }

  /**
   * For MongoDB there is no table. It is called collection
   * If you are using SQL database then this should be something like getTable()
   *
   * @param name MongoDB Collection name
   */
  public getCollection(name: string): Collection {
    if (!this.databaseInstance) {
      throw new Error("Database not initialized");
    }

    return this.databaseInstance.collection(name);
  }

  /**
   * Build database connection string.
   * Customize as needed for your database.
   */
  private getConnectionString() {
    return `${this.mongoProtocol}://${this.user}:${this.password}@${this.host}/${this.dbName}`;
  }

  public getHost() {
    return this.host;
  }

  public getPassword() {
    return this.password;
  }

  public getUser() {
    return this.user;
  }

  public getName() {
    return this.dbName;
  }

  public isConnected() {
    return Boolean(this.dbClient);
  }
}
