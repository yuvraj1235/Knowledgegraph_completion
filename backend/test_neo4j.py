import os
import asyncio
from dotenv import load_dotenv
from neo4j import AsyncGraphDatabase

load_dotenv()

async def test_connection():
    uri = os.getenv("NEO4J_URI")
    password = os.getenv("NEO4J_PASSWORD")
    
    # Try with 'neo4j' as username
    print("Testing with username 'neo4j'...")
    try:
        driver = AsyncGraphDatabase.driver(uri, auth=("neo4j", password))
        async with driver.session() as session:
            result = await session.run("RETURN 1 AS num")
            record = await result.single()
            print("Success with 'neo4j'! Result:", record["num"])
        await driver.close()
        return
    except Exception as e:
        print("Failed with 'neo4j':", e)

    # Try with '662a5193' as username
    user = os.getenv("NEO4J_USER")
    print(f"\nTesting with username '{user}'...")
    try:
        driver = AsyncGraphDatabase.driver(uri, auth=(user, password))
        async with driver.session() as session:
            result = await session.run("RETURN 1 AS num")
            record = await result.single()
            print(f"Success with '{user}'! Result:", record["num"])
        await driver.close()
    except Exception as e:
        print(f"Failed with '{user}':", e)

if __name__ == "__main__":
    asyncio.run(test_connection())
