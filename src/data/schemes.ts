// Government Schemes Database
// In production, this would be fetched from a real database/API

export interface Scheme {
    id: string;
    name: string;
    nameHi: string;
    category: 'education' | 'health' | 'agriculture' | 'business' | 'housing' | 'pension' | 'women' | 'youth';
    department: string;
    description: string;
    descriptionHi: string;
    eligibility: {
        minAge?: number;
        maxAge?: number;
        gender?: 'male' | 'female' | 'any';
        income?: { max: number };
        category?: string[];
        state?: string[];
    };
    benefits: string[];
    benefitsHi: string[];
    documents: string[];
    documentsHi: string[];
    applicationUrl: string;
    deadline?: string;
    matchScore?: number;
}

export const schemes: Scheme[] = [
    {
        id: '1',
        name: 'PM MUDRA Yojana',
        nameHi: 'पीएम मुद्रा योजना',
        category: 'business',
        department: 'Ministry of Finance',
        description: 'Loans up to ₹10 lakhs for micro-enterprises and small businesses without collateral',
        descriptionHi: 'सूक्ष्म उद्यमों और छोटे व्यवसायों के लिए बिना गिरवी के ₹10 लाख तक के ऋण',
        eligibility: {
            minAge: 18,
            gender: 'any',
            category: ['General', 'SC', 'ST', 'OBC']
        },
        benefits: [
            'Loans from ₹50,000 to ₹10 lakhs',
            'No collateral required',
            'Special interest rates for women',
            '3 categories: Shishu, Kishore, Tarun'
        ],
        benefitsHi: [
            '₹50,000 से ₹10 लाख तक के ऋण',
            'कोई गिरवी आवश्यक नहीं',
            'महिलाओं के लिए विशेष ब्याज दरें',
            '3 श्रेणियां: शिशु, किशोर, तरुण'
        ],
        documents: [
            'Aadhaar Card',
            'PAN Card',
            'Business Plan',
            'Bank Statements (6 months)',
            'Address Proof'
        ],
        documentsHi: [
            'आधार कार्ड',
            'पैन कार्ड',
            'व्यवसाय योजना',
            'बैंक स्टेटमेंट (6 महीने)',
            'पता प्रमाण'
        ],
        applicationUrl: 'https://www.mudra.org.in'
    },
    {
        id: '2',
        name: 'Pradhan Mantri Awas Yojana (Urban)',
        nameHi: 'प्रधानमंत्री आवास योजना (शहरी)',
        category: 'housing',
        department: 'Ministry of Housing and Urban Affairs',
        description: 'Affordable housing for urban poor with subsidy of up to ₹2.67 lakhs',
        descriptionHi: 'शहरी गरीबों के लिए ₹2.67 लाख तक की सब्सिडी के साथ किफायती आवास',
        eligibility: {
            gender: 'any',
            income: { max: 1800000 },
            category: ['EWS', 'LIG', 'MIG']
        },
        benefits: [
            'Interest subsidy up to ₹2.67 lakhs',
            'Loan up to ₹35 lakhs',
            'Special provision for women',
            '20-year loan tenure'
        ],
        benefitsHi: [
            'ब्याज सब्सिडी ₹2.67 लाख तक',
            'ऋण ₹35 लाख तक',
            'महिलाओं के लिए विशेष प्रावधान',
            '20 साल की ऋण अवधि'
        ],
        documents: [
            'Income Certificate',
            'Aadhaar Card',
            'PAN Card',
            'Property Documents',
            'Bank Statements'
        ],
        documentsHi: [
            'आय प्रमाण पत्र',
            'आधार कार्ड',
            'पैन कार्ड',
            'संपत्ति दस्तावेज',
            'बैंक स्टेटमेंट'
        ],
        applicationUrl: 'https://pmaymis.gov.in'
    },
    {
        id: '3',
        name: 'PM Kisan Samman Nidhi',
        nameHi: 'पीएम किसान सम्मान निधि',
        category: 'agriculture',
        department: 'Ministry of Agriculture',
        description: '₹6,000 per year direct benefit transfer to farmer families',
        descriptionHi: 'किसान परिवारों को प्रति वर्ष ₹6,000 प्रत्यक्ष लाभ हस्तांतरण',
        eligibility: {
            gender: 'any',
            category: ['Farmer']
        },
        benefits: [
            '₹6,000 yearly in 3 installments',
            'Direct bank transfer',
            'No application fee',
            'Covers all landholding farmers'
        ],
        benefitsHi: [
            '₹6,000 वार्षिक 3 किस्तों में',
            'सीधे बैंक हस्तांतरण',
            'कोई आवेदन शुल्क नहीं',
            'सभी भूमिधारक किसान शामिल'
        ],
        documents: [
            'Land Records',
            'Aadhaar Card',
            'Bank Account Details',
            'Mobile Number'
        ],
        documentsHi: [
            'भूमि रिकॉर्ड',
            'आधार कार्ड',
            'बैंक खाता विवरण',
            'मोबाइल नंबर'
        ],
        applicationUrl: 'https://pmkisan.gov.in'
    },
    {
        id: '4',
        name: 'Atal Pension Yojana',
        nameHi: 'अटल पेंशन योजना',
        category: 'pension',
        department: 'Ministry of Finance',
        description: 'Guaranteed pension of ₹1,000 to ₹5,000 per month after 60 years',
        descriptionHi: '60 साल के बाद प्रति माह ₹1,000 से ₹5,000 की गारंटीकृत पेंशन',
        eligibility: {
            minAge: 18,
            maxAge: 40,
            gender: 'any',
            category: ['Unorganized Sector']
        },
        benefits: [
            'Guaranteed monthly pension',
            'Government co-contribution',
            'Spouse pension on death',
            'Nominee gets corpus'
        ],
        benefitsHi: [
            'गारंटीड मासिक पेंशन',
            'सरकारी सह-योगदान',
            'मृत्यु पर पति/पत्नी पेंशन',
            'नॉमिनी को कोष मिलता है'
        ],
        documents: [
            'Aadhaar Card',
            'Bank Account',
            'Mobile Number'
        ],
        documentsHi: [
            'आधार कार्ड',
            'बैंक खाता',
            'मोबाइल नंबर'
        ],
        applicationUrl: 'https://npscra.nsdl.co.in/apy'
    },
    {
        id: '5',
        name: 'Sukanya Samriddhi Yojana',
        nameHi: 'सुकन्या समृद्धि योजना',
        category: 'women',
        department: 'Ministry of Finance',
        description: 'High-interest savings scheme for girl child with tax benefits',
        descriptionHi: 'कर लाभ के साथ बालिकाओं के लिए उच्च ब्याज बचत योजना',
        eligibility: {
            minAge: 0,
            maxAge: 10,
            gender: 'female'
        },
        benefits: [
            '8.2% interest rate (current)',
            'Tax exemption under 80C',
            'Maturity at 21 years',
            'Partial withdrawal for education'
        ],
        benefitsHi: [
            '8.2% ब्याज दर (वर्तमान)',
            '80C के तहत कर छूट',
            '21 साल में परिपक्वता',
            'शिक्षा के लिए आंशिक निकासी'
        ],
        documents: [
            'Birth Certificate',
            'Parent\'s Aadhaar',
            'Address Proof',
            'Passport-size Photos'
        ],
        documentsHi: [
            'जन्म प्रमाण पत्र',
            'माता-पिता का आधार',
            'पता प्रमाण',
            'पासपोर्ट आकार फोटो'
        ],
        applicationUrl: 'https://www.indiapost.gov.in/VAS/Pages/SukanyaSamriddhiAccount.aspx'
    },
    {
        id: '6',
        name: 'PM Scholarship Scheme',
        nameHi: 'पीएम छात्रवृत्ति योजना',
        category: 'education',
        department: 'Ministry of Defence',
        description: 'Scholarships for children of ex-servicemen and paramilitary personnel',
        descriptionHi: 'पूर्व सैनिकों और अर्धसैनिक कर्मियों के बच्चों के लिए छात्रवृत्ति',
        eligibility: {
            minAge: 18,
            maxAge: 25,
            gender: 'any',
            category: ['Children of Ex-Servicemen']
        },
        benefits: [
            '₹2,500/month for boys (Professional courses)',
            '₹3,000/month for girls (Professional courses)',
            'Valid for 5 years',
            '5,500 scholarships annually'
        ],
        benefitsHi: [
            'लड़कों के लिए ₹2,500/माह (व्यावसायिक पाठ्यक्रम)',
            'लड़कियों के लिए ₹3,000/माह (व्यावसायिक पाठ्यक्रम)',
            '5 वर्षों के लिए वैध',
            'सालाना 5,500 छात्रवृत्तियां'
        ],
        documents: [
            'Ex-Servicemen Certificate',
            'Academic Marksheets',
            'Aadhaar Card',
            'Bank Account Details'
        ],
        documentsHi: [
            'पूर्व सैनिक प्रमाण पत्र',
            'शैक्षिक अंकपत्र',
            'आधार कार्ड',
            'बैंक खाता विवरण'
        ],
        applicationUrl: 'https://ksb.gov.in'
    },
    {
        id: '7',
        name: 'Ayushman Bharat - PM JAY',
        nameHi: 'आयुष्मान भारत - पीएम जेएवाई',
        category: 'health',
        department: 'Ministry of Health',
        description: 'Free health insurance of ₹5 lakhs per family per year',
        descriptionHi: 'प्रति परिवार प्रति वर्ष ₹5 लाख का निःशुल्क स्वास्थ्य बीमा',
        eligibility: {
            gender: 'any',
            income: { max: 300000 },
            category: ['BPL', 'Priority Households']
        },
        benefits: [
            '₹5 lakh coverage per family',
            'Cashless treatment',
            '1,400+ procedures covered',
            'Pre and post-hospitalization'
        ],
        benefitsHi: [
            'प्रति परिवार ₹5 लाख कवरेज',
            'कैशलेस उपचार',
            '1,400+ प्रक्रियाएं कवर',
            'अस्पताल में भर्ती से पहले और बाद'
        ],
        documents: [
            'Ration Card (if applicable)',
            'Aadhaar Card',
            'Income Certificate',
            'Address Proof'
        ],
        documentsHi: [
            'राशन कार्ड (यदि लागू हो)',
            'आधार कार्ड',
            'आय प्रमाण पत्र',
            'पता प्रमाण'
        ],
        applicationUrl: 'https://pmjay.gov.in'
    },
    {
        id: '8',
        name: 'Stand Up India Scheme',
        nameHi: 'स्टैंड अप इंडिया योजना',
        category: 'business',
        department: 'Ministry of Finance',
        description: 'Bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs',
        descriptionHi: 'SC/ST और महिला उद्यमियों के लिए ₹10 लाख से ₹1 करोड़ के बैंक ऋण',
        eligibility: {
            minAge: 18,
            gender: 'any',
            category: ['SC', 'ST', 'Women']
        },
        benefits: [
            'Loans ₹10L to ₹1Cr',
            'For greenfield enterprises',
            '7-year repayment period',
            'Composite loan for setup + working capital'
        ],
        benefitsHi: [
            'ऋण ₹10L से ₹1Cr तक',
            'नए उद्यमों के लिए',
            '7 साल की चुकौती अवधि',
            'सेटअप + कार्यशील पूंजी के लिए समग्र ऋण'
        ],
        documents: [
            'Caste Certificate (SC/ST)',
            'Business Plan',
            'Aadhaar Card',
            'PAN Card',
            'Bank Statements'
        ],
        documentsHi: [
            'जाति प्रमाण पत्र (SC/ST)',
            'व्यवसाय योजना',
            'आधार कार्ड',
            'पैन कार्ड',
            'बैंक स्टेटमेंट'
        ],
        applicationUrl: 'https://www.standupmitra.in'
    }
];

export const categories = {
    education: { icon: '📚', color: '#2196f3' },
    health: { icon: '🏥', color: '#f44336' },
    agriculture: { icon: '🌾', color: '#4caf50' },
    business: { icon: '💼', color: '#ff9800' },
    housing: { icon: '🏠', color: '#9c27b0' },
    pension: { icon: '👴', color: '#795548' },
    women: { icon: '👩', color: '#e91e63' },
    youth: { icon: '🎯', color: '#00bcd4' }
};
