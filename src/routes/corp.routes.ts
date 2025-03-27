import { Router } from "express";
import { CorpController } from "../controllers/corp.controller";

const router = Router();

// Define one POST endpoint for fetching corp info
router.post("/getcorpinfo", async (req, res) => {
    try {
        console.log("Received POST /getcorpinfo");
        await CorpController.getCorpInfo(req, res);
    } catch (error) {
        console.error("Error in getcorpinfo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/submitrequest', (req, res) => {
    const { formType } = req.body;

    // Instruction Data
    const instructionData = {
        title: "Important Instructions",
        paragraphs: [
          {
            text: "Kindly",
            link: {
              text: "read these instructions",
              url: "https://truecopy.in",
              target: "_blank"
            },
            suffix: {
              text: " carefully before you proceed. If you have questions, kindly email ",
              link: {
                text: "support@truecopy.in",
                url: "mailto:support@truecopy.in"
              }
            }
          },
            {
                text: "Kindly download and use ONLY the templates from the instructions link above. DO NOT use older templates."
            }
        ]
    };

    // Form Fields Data
    const formFields = [
      {
        "name": "dept",
        "label": "Institute / Department",
        "type": "select",
        "options": [
            { "label": "Computer Engineering", "value": "computer_engineering" },
            { "label": "Information Technology", "value": "information_technology" },
            { "label": "Electrical Engineering", "value": "electrical_engineering" },
            { "label": "Electronics Telecommunications", "value": "electronics_telecommunications" },
            { "label": "Electronics Engineering", "value": "electronics_engineering" },
            { "label": "Engineering Physics", "value": "engineering_physics" },
            { "label": "Bio Medical Engineering", "value": "bio_medical_engineering" },
            { "label": "Bio Technology", "value": "bio_technology" },
            { "label": "Mechanical Engineering", "value": "mechanical_engineering" },
            { "label": "Civil Engineering", "value": "civil_engineering" }
        ],
        "required": true,
        "gridSize": "col-md-6",
        "errorMessage": "Department is required."
    },
    {
        "name": "degree",
        "label": "Course",
        "type": "select",
        "options": [
            { "label": "BE", "value": "BE" },
            { "label": "ME", "value": "ME" },
            { "label": "BTECH", "value": "BTECH" }
        ],
        "required": true,
        "gridSize": "col-md-6",
        "errorMessage": "Course selection is required."
    },
        {
            "name": "firstname",
            "label": "Student First Name",
            "type": "text",
            "placeholder": "Enter your first name",
            "required": true,
            "gridSize": "col-md-6",
            "errorMessage": "First name is required."
        },
        {
            "name": "lastname",
            "label": "Student Last Name",
            "type": "text",
            "placeholder": "Enter your last name",
            "required": true,
            "gridSize": "col-md-6",
            "errorMessage": "Last name is required."
        },
        {
            "name": "fullname",
            "label": "Full Name (exactly as it appears in academic record)",
            "type": "text",
            "placeholder": "Enter your full name",
            "required": true,
            "gridSize": "col-md-6",
            "errorMessage": "Full name is required."
        },
        {
            "name": "numberE",
            "label": "Student Number",
            "type": "text",
            "placeholder": "Enter student number",
            "required": true,
            "gridSize": "col-md-6",
            "errorMessage": "Student number is required."
        },
        {
            "name": "dob",
            "label": "Student Date of Birth",
            "type": "date",
            "placeholder": "DD-MM-YYYY",
            "required": true,
            "gridSize": "col-md-3",
            "errorMessage": "Date of Birth is required."
        },
        {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
                { "label": "Male", "value": "1" },
                { "label": "Female", "value": "2" }
            ],
            "required": true,
            "gridSize": "col-md-3",
            "errorMessage": "Gender is required."
        },
        {
            "name": "yoj",
            "label": "Year of Joining",
            "type": "select",
            "options": [
                { "label": "2026", "value": "2020" },
                { "label": "2025", "value": "2020" },
                { "label": "2024", "value": "2020" },
                { "label": "2023", "value": "2020" },
                { "label": "2022", "value": "2020" },
                { "label": "2021", "value": "2020" },
                { "label": "2020", "value": "2020" },
                { "label": "2019", "value": "2019" },
                { "label": "2018", "value": "2018" },
                { "label": "2017", "value": "2018" },
                { "label": "2016", "value": "2018" },
                { "label": "2015", "value": "2018" },
                { "label": "2014", "value": "2018" },
                { "label": "2013", "value": "2018" },
                { "label": "2012", "value": "2018" },
                { "label": "2011", "value": "2018" },
                { "label": "2010", "value": "2018" },
                { "label": "2009", "value": "2018" },
                { "label": "2008", "value": "2018" },
            ],
            "required": true,
            "gridSize": "col-md-3",
            "errorMessage": "Year of joining is required."
        },
        {
            "name": "dirsec",
            "label": "Direct admission into second year?",
            "type": "select",
            "options": [
                { "label": "No", "value": "1" },
                { "label": "Yes", "value": "2" }
            ],
            "required": true,
            "gridSize": "col-md-3",
            "errorMessage": "This field is required."
        },
        {
            "name": "yop",
            "label": "Year of Passing (actual/projected)",
            "type": "select",
            "options": [
                { "label": "2026", "value": "2020" },
                { "label": "2025", "value": "2020" },
                { "label": "2024", "value": "2020" },
                { "label": "2023", "value": "2020" },
                { "label": "2022", "value": "2020" },
                { "label": "2021", "value": "2020" },
                { "label": "2020", "value": "2020" },
                { "label": "2019", "value": "2019" },
                { "label": "2018", "value": "2018" },
                { "label": "2017", "value": "2018" },
                { "label": "2016", "value": "2018" },
                { "label": "2015", "value": "2018" },
                { "label": "2014", "value": "2018" },
                { "label": "2013", "value": "2018" },
                { "label": "2012", "value": "2018" },
                { "label": "2011", "value": "2018" },
                { "label": "2010", "value": "2018" },
                { "label": "2009", "value": "2018" },
                { "label": "2008", "value": "2018" },
                { "label": "Other", "value": "Other" }
            ],
            "required": true,
            "gridSize": "col-md-3",
            "errorMessage": "Year of passing is required."
        },
        {
          "name": "mobileno",
          "label": "Contact Mobile Number",
          "type": "text",
          "placeholder": "Enter mobile number",
          "required": true,
          "gridSize": "col-md-3",
          "errorMessage": "Mobile number is required."
      },
       
        {
            "name": "semester",
            "label": "Semesters completed (for which transcript is sought)",
            "type": "select",
            "options": [
                { "label": "10", "value": "4" },
                { "label": "9", "value": "4" },
                { "label": "8", "value": "4" },
                { "label": "7", "value": "6" },
                { "label": "6", "value": "5" },
                { "label": "5", "value": "4" },
                { "label": "4", "value": "4" },
                { "label": "3", "value": "4" },
                { "label": "2", "value": "4" },
                { "label": "1", "value": "4" }
            ],
            "required": true,
            "gridSize": "col-md-6",
            "errorMessage": "Semester selection is required."
        },
       
        {
            "name": "emailid",
            "label": "Student Email ID for receiving approved doc",
            "type": "email",
            "placeholder": "Enter your email",
            "required": true,
            "gridSize": "col-md-6",
            "errorMessage": "Valid email is required."
        },
        {
            "name": "uploadfile",
            "label": "Upload Transcript (ONLY as per template):",
            "type": "file",
            "accept": ".pdf,.doc,.docx",
            "required": true,
            "gridSize": "col-md-6",
            "errorMessage": "Transcript file is required.",
            "link": {
                "url": "https://files.truecopy.in/qaaks/transcripthelp.html",
                "text": "Upload Transcript"
            }
        },
        {
            "name": "uploadreffile",
            "label": "PDF file with scans of marksheets",
            "type": "file",
            "accept": ".pdf,.doc,.docx",
            "required": true,
            "gridSize": "col-md-6",
            "errorMessage": ""
        },
        {
            "name": "terms",
            "label": "I accept the Terms of Service",
            "type": "checkbox",
            "required": true,
            "gridSize": "col-md-12",
            "errorMessage": "You must agree to the terms.",
            "link": {
                "url": "https://qaaks.truecopy.in/verify/tos.tc",
                "text": "Read Terms & Conditions"
            }
        }
    ];

    res.json({ instructionData, formFields });
});

router.post('/docverification', (req, res) => {
    const { formType } = req.body;

    // Instruction Data
    const instructionData = {
        title: "Important Instructions",
        paragraphs: [
            {
                text: "",
                link: {
                    text: "For templates and instructions click here",
                    url: "https://truecopy.in",
                    target: "_blank"
                },
                suffix: "(Kindly read carefully before you proceed)"
            },
            
        ]
    };

    // Form Fields Data
    const formFields = [
      {
        "name": "dept",
        "label": "Institute / Department",
        "type": "select",
        "options": [
          { "label": "Computer Engineering", "value": "computer_engineering" },
          { "label": "Information Technology", "value": "information_technology" },
          { "label": "Electrical Engineering", "value": "electrical_engineering" },
          { "label": "Electronics Telecommunications", "value": "electronics_telecommunications" },
          { "label": "Electronics Engineering", "value": "electronics_engineering" },
          { "label": "Engineering Physics", "value": "engineering_physics" },
          { "label": "Bio Medical Engineering", "value": "bio_medical_engineering" },
          { "label": "Bio Technology", "value": "bio_technology" },
          { "label": "Mechanical Engineering", "value": "mechanical_engineering" },
          { "label": "Civil Engineering", "value": "civil_engineering" }
        ],
        "required": true,
        "gridSize": "col-md-6",
        "errorMessage": "Department is required."
      },      
      {
        "name": "degree",
        "label": "Course",
        "type": "select",
        "options": [
          { "label": "BE", "value": "BE" },
          { "label": "ME", "value": "ME" },
          { "label": "BTECH", "value": "BTECH" }
        ],
        "required": true,
        "gridSize": "col-md-6",
        "errorMessage": "Course selection is required."
      },
        {
          "name": "firstname",
          "label": "Student/Candidate First Name (as on document)",
          "type": "text",
          "placeholder": "Enter your first name",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": "First name is required."
        },
        {
          "name": "lastname",
          "label": "Student/Candidate Last Name (as on document)",
          "type": "text",
          "placeholder": "Enter your last name",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": "Last name is required."
        },
        {
          "name": "numberE",
          "label": "Student ID (Roll no / Seat no / etc)",
          "type": "text",
          "placeholder": "Enter student number",
          "required": true,
          "gridSize": "col-md-3",
          "errorMessage": "Student number is required."
        },
        {
          "name": "yop",
          "label": "Year of Passing (actual/projected)",
          "type": "select",
          "options": [
            { "label": "2026", "value": "2020" },
            { "label": "2025", "value": "2020" },
            { "label": "2024", "value": "2020" },
            { "label": "2023", "value": "2020" },
            { "label": "2022", "value": "2020" },
            { "label": "2021", "value": "2020" },
            { "label": "2020", "value": "2020" },
            { "label": "2019", "value": "2019" },
            { "label": "2018", "value": "2018" },
            { "label": "2017", "value": "2018" },
            { "label": "2016", "value": "2018" },
            { "label": "2015", "value": "2018" },
            { "label": "2014", "value": "2018" },
            { "label": "2013", "value": "2018" },
            { "label": "2012", "value": "2018" },
            { "label": "2011", "value": "2018" },
            { "label": "2010", "value": "2018" },
            { "label": "2009", "value": "2018" },
            { "label": "2008", "value": "2018" },
            { "label": "Other", "value": "Other" }
          ],
          "required": true,
          "gridSize": "col-md-3",
          "errorMessage": "Year of passing is required."
        },
        
      
        {
          "name": "emailid",
          "label": "Requestor (Your) Email ID for receiving verified doc",
          "type": "email",
          "placeholder": "Enter your email",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": "Valid email is required."
        },
        {
          "name": "uploadfile",
          "label": "Upload Document to be verified (ONLY as per template)",
          "type": "file",
          "accept": ".pdf,.doc,.docx",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": "Transcript file is required.",
          "link": {
            "url": "https://files.truecopy.in/vit/verificationhelp.html",
            "text": "Upload Transcript"
          }
        },
        {
          "name": "uploadreffile",
          "label": "PDF file with scans of marksheets",
          "type": "file",
          "accept": ".pdf,.doc,.docx",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": ""
        },
        {
          "name": "terms",
          "label": "I accept the Terms of Service",
          "type": "checkbox",
          "required": true,
          "gridSize": "col-md-12",
          "errorMessage": "You must agree to the terms.",
          "link": {
            "url": "https://qaaks.truecopy.in/verify/tos.tc",
            "text": "Read Terms & Conditions"
          }
        }
      ];

    res.json({ instructionData, formFields });
});


router.post('/preloadrequest', (req, res) => {
    const { formType } = req.body;

    // Instruction Data
    const instructionData = {
        title: "Important Instructions",
        paragraphs: [
            {
                text: "Kindly read",
                link: {
                    text: " these instructions (click here)",
                    url: "https://truecopy.in",
                    target: "_blank"
                },
                suffix: "carefully before you proceed."
            },
            {
                text: " If you have questions, kindly email",
                link: {
                    text: "support@truecopy.in",
                    url: "mailto:support@truecopy.in"
                },
                suffix: "."
            },
            
        ]
    };

    // Form Fields Data
    const formFields = [
      {
        "name": "dept",
        "label": "Institute / Department",
        "type": "select",
        "options": [
          { "label": "Computer Engineering", "value": "computer_engineering" },
          { "label": "Information Technology", "value": "information_technology" },
          { "label": "Electrical Engineering", "value": "electrical_engineering" },
          { "label": "Electronics Telecommunications", "value": "electronics_telecommunications" },
          { "label": "Electronics Engineering", "value": "electronics_engineering" },
          { "label": "Engineering Physics", "value": "engineering_physics" },
          { "label": "Bio Medical Engineering", "value": "bio_medical_engineering" },
          { "label": "Bio Technology", "value": "bio_technology" },
          { "label": "Mechanical Engineering", "value": "mechanical_engineering" },
          { "label": "Civil Engineering", "value": "civil_engineering" }
        ],
        "required": true,
        "gridSize": "col-md-6",
        "errorMessage": "Department is required."
      },      
      {
        "name": "degree",
        "label": "Course",
        "type": "select",
        "options": [
          { "label": "BE", "value": "BE" },
          { "label": "ME", "value": "ME" },
          { "label": "BTECH", "value": "BTECH" }
        ],
        "required": true,
        "gridSize": "col-md-6",
        "errorMessage": "Course selection is required."
      },
    
        {
          "name": "firstname",
          "label": "Student First Name",
          "type": "text",
          "placeholder": "Enter your first name",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": "First name is required."
        },
        {
          "name": "lastname",
          "label": "Student Last Name",
          "type": "text",
          "placeholder": "Enter your last name",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": "Last name is required."
        },
        {
          "name": "numberE",
          "label": "Student No/Roll No (As on Grade-sheet)",
          "type": "text",
          "placeholder": "Enter student number",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": "Student number is required."
        },
        {
            "name": "dob",
            "label": "Student Date of Birth (Format: DD-MM-YYYY)",
            "type": "date",
            "placeholder": "DD-MM-YYYY",
            "required": true,
            "gridSize": "col-md-3",
            "errorMessage": "Date of Birth is required."
        },
        {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
                { "label": "Male", "value": "1" },
                { "label": "Female", "value": "2" }
            ],
            "required": true,
            "gridSize": "col-md-3",
            "errorMessage": "Gender is required."
        },
        {
            "name": "yoj",
            "label": "Year of Joining",
            "type": "select",
            "options": [
                { "label": "2026", "value": "2020" },
                { "label": "2025", "value": "2020" },
                { "label": "2024", "value": "2020" },
                { "label": "2023", "value": "2020" },
                { "label": "2022", "value": "2020" },
                { "label": "2021", "value": "2020" },
                { "label": "2020", "value": "2020" },
                { "label": "2019", "value": "2019" },
                { "label": "2018", "value": "2018" },
                { "label": "2017", "value": "2018" },
                { "label": "2016", "value": "2018" },
                { "label": "2015", "value": "2018" },
                { "label": "2014", "value": "2018" },
                { "label": "2013", "value": "2018" },
                { "label": "2012", "value": "2018" },
                { "label": "2011", "value": "2018" },
                { "label": "2010", "value": "2018" },
                { "label": "2009", "value": "2018" },
                { "label": "2008", "value": "2018" },
            ],
            "required": true,
            "gridSize": "col-md-3",
            "errorMessage": "Year of joining is required."
        },
        {
          "name": "yop",
          "label": "Year of Passing (actual/projected)",
          "type": "select",
          "options": [
            { "label": "2026", "value": "2020" },
            { "label": "2025", "value": "2020" },
            { "label": "2024", "value": "2020" },
            { "label": "2023", "value": "2020" },
            { "label": "2022", "value": "2020" },
            { "label": "2021", "value": "2020" },
            { "label": "2020", "value": "2020" },
            { "label": "2019", "value": "2019" },
            { "label": "2018", "value": "2018" },
            { "label": "2017", "value": "2018" },
            { "label": "2016", "value": "2018" },
            { "label": "2015", "value": "2018" },
            { "label": "2014", "value": "2018" },
            { "label": "2013", "value": "2018" },
            { "label": "2012", "value": "2018" },
            { "label": "2011", "value": "2018" },
            { "label": "2010", "value": "2018" },
            { "label": "2009", "value": "2018" },
            { "label": "2008", "value": "2018" },
            { "label": "Other", "value": "Other" }
          ],
          "required": true,
          "gridSize": "col-md-3",
          "errorMessage": "Year of passing is required."
        },
        
        {
          "name": "emailid",
          "label": "Student Email ID for receiving approved doc",
          "type": "email",
          "placeholder": "Enter your email",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": "Valid email is required."
        },
        
        {
          "name": "uploadreffile",
          "label": "Attach all the documents in single PDF Scanned copies of all Semester /Trimester mark sheets, Degree / Diploma Certificate and any one ID proof (Aadhar card / Pan card / Passport / College ID card)",
          "type": "file",
          "accept": ".pdf,.doc,.docx",
          "required": true,
          "gridSize": "col-md-6",
          "errorMessage": ""
        },
        {
          "name": "terms",
          "label": "I accept the Terms of Service",
          "type": "checkbox",
          "required": true,
          "gridSize": "col-md-12",
          "errorMessage": "You must agree to the terms.",
          "link": {
            "url": "https://qaaks.truecopy.in/verify/tos.tc",
            "text": "Read Terms & Conditions"
          }
        }
      ];

    res.json({ instructionData, formFields });
});

export default router;





