import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { IncomingForm, File, Fields, Files } from 'formidable';
import Student from "@models/Student";
import { connectToDB } from "@utils/database";

interface IncommingData {
    name: string;
    phone: string;
    batch: string;
    division: string;
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: any, res: any) {


    try {
        connectToDB();

        const form = new IncomingForm();

        form.parse(req, (err, fields: Fields<string>, files: Files) => {
            if (err) {
                return res.status(500).json({ message: "File upload error", error: err });
            }

            const filePath = files!.file!.filepath;

            const jsonData: IncommingData[] = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on("data", (row) => {
                    jsonData.push(row);
                })
                .on("end", async () => {
                    try {
                        await Student.insertMany(jsonData);
                        res.status(200).json({ message: "Data uploaded successfully!" });
                    } catch (error) {
                        res.status(500).json({ message: "Database insertion error", error });
                    }
                });
        });
    }
    catch (err) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }

}