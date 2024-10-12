import pg from 'pg';

// Use the environment variable for the database connection string
const apistring = process.env.DATABASE_URL;

if (!apistring) {
    console.error("DATABASE_URL environment variable not set.");
    process.exit(1); 
}

const { Client } = pg;
const client = new Client({
    connectionString: apistring,
    ssl: {
        rejectUnauthorized: false, 
    },
});


client.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1); 
    } else {
        console.log('Connected to  database successfully');
    }
});


export default async (req, res) => {
    if (req.method === 'POST') {
        const { body } = req;

        if (!body) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const { name, email, number } = body; 

        try {
            const query = 'INSERT INTO users (name, email, pnum) VALUES ($1, $2, $3)';
            const values = [name, email, number]; 
            await client.query(query, values);

            res.status(200).json({ message: 'Details submitted successfully!' });
        } catch (error) {
            console.error('Database insert error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        res.status(200).json({ message: 'GET request to /api/collectdetails successful!' });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
