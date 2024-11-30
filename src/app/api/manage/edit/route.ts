import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function POST(req: Request) {
    try {
        // Parse the incoming data
        const data = await req.json();

        // Validate the input data
        if (!data.id && !data.rollNo && !data.name && !data.admnNo && !data.branch && !data.phoneNo && !data.division) {
            throw { message: "Kindly fill the required fields", status: 400 }
        }

        if (!data.id) {
            throw { message: "User id not found", desc:"Please try again", status: 400 }
        }else if(!data.rollNo){
            throw { message: "Roll no is required",desc:"Kindly enter roll no", status: 400 }
        }else if(!data.name){
            throw { message: "Name is required",desc:"Please enter a name", status: 400 }
        }else if(!data.division){
            throw { message: "Division is requried",desc:"Please enter division", status: 400 }
        }else if(!data.admnNo){
            throw { message: "Admission no is required",desc:"Please enter admission no", status: 400 }
        }else if(!data.branch){
            throw { message: "Branch name is required",desc:"Please enter branch", status: 400 }
        }else if(!data.phoneNo){
            throw { message: "Phone number is requried",desc:"Please enter phone number", status: 400 }
        }




        // Connect to the database
        await connectToDB();

        // Find the student by ID
        const student = await Student.findById(data.id);
        if (!student) {
            return Response.json(
                { message: "Student not found" },
                { status: 404 }
            );
        }

        // Update the student's details
        student.rollNo = data.rollNo;
        student.name = data.name;
        student.admnNo = data.admnNo;
        student.branch = data.branch;
        student.phoneNo = data.phoneNo;
        student.division = data.division;

        // Save the updated student document
        await student.save();

        // Send a success response
        return Response.json(
            { message: "Student details updated." },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating student:", error);

        // Send a generic error response
        return Response.json(
            { message: error.message ,desc:error.desc},
            { status: error.status || 500 }
        );
    }
}
