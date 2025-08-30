import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config(); 
dotenv.config({ path: "../../.env" });

console.log('HOST:', process.env.DB_HOST);
console.log('USER:', process.env.DB_USER);
console.log('PASSWORD:', process.env.DB_PASSWORD);
console.log('DB:', process.env.DB_NAME);
console.log()
const Pool = new pg.Pool({
 host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) 
})

// Pool.query("SELECT NOW()", (error,res) =>{
//   if(error){
//     console.error("error", error)
//   }else{
//     console.log("Conectado OK, hora:", res.rows[0].now)
//     Pool.end()
//   }
// })
export default Pool;