const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let token = '';
let internshipId = '';
let taskId = '';

const runTests = async () => {
    try {
        console.log('Starting Backend Verification...');

        // 1. Register User
        console.log('\n1. Registering User...');
        try {
            const registerRes = await axios.post(`${API_URL}/auth/signup`, {
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                password: 'password123'
            });
            token = registerRes.data.token;
            console.log('✅ User Registered');
        } catch (err) {
            console.error('❌ Registration Failed:', err.response?.data || err.message);
            return;
        }

        // Configure axios with token
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        // 2. Create Internship
        console.log('\n2. Creating Internship...');
        try {
            const internshipRes = await axios.post(`${API_URL}/internships`, {
                company: 'Test Company',
                role: 'Software Engineer',
                status: 'Applied',
                deadline: new Date().toISOString(),
                interviewDate: new Date().toISOString()
            }, config);
            internshipId = internshipRes.data._id;
            console.log('✅ Internship Created');
        } catch (err) {
            console.error('❌ Create Internship Failed:', err.response?.data || err.message);
        }

        // 3. Get Internships
        console.log('\n3. Getting Internships...');
        try {
            const internshipsRes = await axios.get(`${API_URL}/internships`, config);
            if (internshipsRes.data.length > 0) {
                console.log(`✅ Retrieved ${internshipsRes.data.length} internships`);
            } else {
                console.error('❌ No internships found');
            }
        } catch (err) {
            console.error('❌ Get Internships Failed:', err.response?.data || err.message);
        }

        // 4. Create Task
        console.log('\n4. Creating Task...');
        try {
            const taskRes = await axios.post(`${API_URL}/tasks`, {
                title: 'Prepare for Interview',
                description: 'Read about company',
                dueDate: new Date().toISOString(),
                relatedInternship: internshipId
            }, config);
            taskId = taskRes.data._id;
            console.log('✅ Task Created');
        } catch (err) {
            console.error('❌ Create Task Failed:', err.response?.data || err.message);
        }

        // 5. Get Tasks
        console.log('\n5. Getting Tasks...');
        try {
            const tasksRes = await axios.get(`${API_URL}/tasks`, config);
            if (tasksRes.data.length > 0) {
                console.log(`✅ Retrieved ${tasksRes.data.length} tasks`);
            } else {
                console.error('❌ No tasks found');
            }
        } catch (err) {
            console.error('❌ Get Tasks Failed:', err.response?.data || err.message);
        }

        // 6. Delete Task
        console.log('\n6. Deleting Task...');
        try {
            await axios.delete(`${API_URL}/tasks/${taskId}`, config);
            console.log('✅ Task Deleted');
        } catch (err) {
            console.error('❌ Delete Task Failed:', err.response?.data || err.message);
        }

        // 7. Delete Internship
        console.log('\n7. Deleting Internship...');
        try {
            await axios.delete(`${API_URL}/internships/${internshipId}`, config);
            console.log('✅ Internship Deleted');
        } catch (err) {
            console.error('❌ Delete Internship Failed:', err.response?.data || err.message);
        }

        console.log('\n✅ Verification Complete!');

    } catch (err) {
        console.error('Unexpected Error:', err);
    }
};

runTests();
