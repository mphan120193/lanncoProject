// import {format} from 'date-fns';
// import {v4 as uuid} from 'uuid';

// import path from 'path';
// import { promises as fs } from 'fs';
// import fs from 'fs';


//  export const logEvents = async(message)=>{
//     const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
//     const logItem = `${dateTime}\t${uuid()}\t${message}`;
//     console.log(logItem);

//     try{
//         if(!fs.existsSync(path.join(__dirname, 'logs'))){
//             await fsPromises.mkdir(path.join(__dirname, 'logs'));
//         }
//         await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);

//     }catch(err){
//         console.log(err);
//     }
// }

import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES modules don't have __dirname, so recreate it:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logEvents = async (message) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // added newline

  console.log(logItem);

  try {
    const logsDir = path.join(__dirname,'..', 'logs');
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    await fsPromises.appendFile(path.join(logsDir, 'logs.txt'), logItem);
  } catch (err) {
    console.error('Logging error:', err);
  }
};


export const  logger = (req, res, next) =>{
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
}
